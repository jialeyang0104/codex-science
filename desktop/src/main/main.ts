import { app, BrowserWindow, ipcMain, safeStorage } from "electron";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";

type ProviderKind = "openai" | "deepseek" | "custom";

interface StoredProfile {
  id: string;
  name: string;
  provider: ProviderKind;
  baseUrl: string;
  chatPath: string;
  model: string;
  encryptedKey: string;
  encrypted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PublicProfile {
  id: string;
  name: string;
  provider: ProviderKind;
  baseUrl: string;
  chatPath: string;
  model: string;
  createdAt: string;
  updatedAt: string;
}

interface SaveProfileInput {
  id?: string;
  name: string;
  provider: ProviderKind;
  baseUrl: string;
  chatPath?: string;
  model: string;
  apiKey?: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatInput {
  profileId: string;
  workflowId: string;
  workflowName: string;
  messages: ChatMessage[];
  extraBody?: Record<string, unknown>;
}

const storePath = () => path.join(app.getPath("userData"), "profiles.json");

function readStore(): { profiles: StoredProfile[] } {
  try {
    const raw = fs.readFileSync(storePath(), "utf8");
    const parsed = JSON.parse(raw);
    return {
      profiles: Array.isArray(parsed.profiles) ? parsed.profiles : []
    };
  } catch {
    return { profiles: [] };
  }
}

function writeStore(nextStore: { profiles: StoredProfile[] }) {
  fs.mkdirSync(path.dirname(storePath()), { recursive: true });
  fs.writeFileSync(storePath(), JSON.stringify(nextStore, null, 2), "utf8");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 1100,
    minHeight: 720,
    title: "Codex Science",
    backgroundColor: "#f8fafc",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    void win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    void win.loadFile(path.join(__dirname, "../../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function publicProfile(profile: StoredProfile): PublicProfile {
  const { encryptedKey: _encryptedKey, encrypted: _encrypted, ...rest } = profile;
  return rest;
}

function normalizeBaseUrl(url: string) {
  return url.trim().replace(/\/+$/, "");
}

function normalizeChatPath(pathValue = "/chat/completions") {
  const trimmed = pathValue.trim();
  if (!trimmed) {
    return "/chat/completions";
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function encryptApiKey(apiKey: string) {
  if (safeStorage.isEncryptionAvailable()) {
    return {
      encryptedKey: safeStorage.encryptString(apiKey).toString("base64"),
      encrypted: true
    };
  }

  return {
    encryptedKey: Buffer.from(apiKey, "utf8").toString("base64"),
    encrypted: false
  };
}

function decryptApiKey(profile: StoredProfile) {
  const buf = Buffer.from(profile.encryptedKey, "base64");
  if (profile.encrypted && safeStorage.isEncryptionAvailable()) {
    return safeStorage.decryptString(buf);
  }
  return buf.toString("utf8");
}

function endpointFor(profile: StoredProfile) {
  return `${normalizeBaseUrl(profile.baseUrl)}${normalizeChatPath(profile.chatPath)}`;
}

function getProfiles() {
  return readStore().profiles;
}

function getProfileOrThrow(id: string) {
  const profile = getProfiles().find((item) => item.id === id);
  if (!profile) {
    throw new Error("Provider profile not found.");
  }
  return profile;
}

function safeError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown error";
}

ipcMain.handle("profiles:list", () => getProfiles().map(publicProfile));

ipcMain.handle("profiles:save", (_event, input: SaveProfileInput) => {
  const now = new Date().toISOString();
  const profiles = getProfiles();
  const existing = input.id ? profiles.find((item) => item.id === input.id) : undefined;

  if (!input.name.trim()) {
    throw new Error("Profile name is required.");
  }
  if (!input.baseUrl.trim()) {
    throw new Error("Base URL is required.");
  }
  if (!input.model.trim()) {
    throw new Error("Model is required.");
  }
  if (!existing && !input.apiKey?.trim()) {
    throw new Error("API key is required for a new profile.");
  }

  const keyMaterial = input.apiKey?.trim()
    ? encryptApiKey(input.apiKey.trim())
    : {
        encryptedKey: existing?.encryptedKey ?? "",
        encrypted: existing?.encrypted ?? safeStorage.isEncryptionAvailable()
      };

  const nextProfile: StoredProfile = {
    id: existing?.id ?? crypto.randomUUID(),
    name: input.name.trim(),
    provider: input.provider,
    baseUrl: normalizeBaseUrl(input.baseUrl),
    chatPath: normalizeChatPath(input.chatPath),
    model: input.model.trim(),
    encryptedKey: keyMaterial.encryptedKey,
    encrypted: keyMaterial.encrypted,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now
  };

  const nextProfiles = existing
    ? profiles.map((item) => (item.id === existing.id ? nextProfile : item))
    : [nextProfile, ...profiles];

  writeStore({ profiles: nextProfiles });
  return publicProfile(nextProfile);
});

ipcMain.handle("profiles:delete", (_event, id: string) => {
  writeStore({ profiles: getProfiles().filter((item) => item.id !== id) });
  return true;
});

ipcMain.handle("providers:test", async (_event, profileId: string) => {
  const profile = getProfileOrThrow(profileId);
  const result = await callChat(profile, [
    {
      role: "system",
      content: "Reply with exactly one word: connected"
    },
    {
      role: "user",
      content: "connection test"
    }
  ]);
  return result.content;
});

ipcMain.handle("chat:send", async (_event, input: ChatInput) => {
  const profile = getProfileOrThrow(input.profileId);
  const systemPrompt = buildSystemPrompt(input.workflowName);
  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...input.messages.filter((message) => message.role !== "system")
  ];
  return callChat(profile, messages, input.extraBody);
});

function buildSystemPrompt(workflowName: string) {
  return [
    "You are Codex Science Desktop, an AI-assisted scientific research workbench.",
    `Current workflow: ${workflowName}.`,
    "Use a local-first, evidence-first approach. Separate evidence, inference, and recommendation.",
    "For literature and clinical claims, ask for or cite primary sources and flag uncertainty.",
    "For data work, propose reproducible commands, scripts, tables, and validation checks.",
    "For biomodel or remote-compute work, state environment, credential, model-weight, and data-movement assumptions.",
    "Do not invent citations, trial records, file contents, or computed results."
  ].join("\n");
}

async function callChat(
  profile: StoredProfile,
  messages: ChatMessage[],
  extraBody: Record<string, unknown> = {}
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90000);

  try {
    const apiKey = decryptApiKey(profile);
    const response = await fetch(endpointFor(profile), {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: profile.model,
        messages,
        stream: false,
        ...extraBody
      })
    });

    const rawText = await response.text();
    let json: any = null;
    try {
      json = rawText ? JSON.parse(rawText) : null;
    } catch {
      json = null;
    }

    if (!response.ok) {
      const detail = json?.error?.message ?? json?.message ?? rawText;
      throw new Error(`Provider request failed (${response.status}): ${detail}`);
    }

    const content = json?.choices?.[0]?.message?.content;
    const reasoning = json?.choices?.[0]?.message?.reasoning_content;
    return {
      content: typeof content === "string" ? content : JSON.stringify(json, null, 2),
      reasoning: typeof reasoning === "string" ? reasoning : "",
      usage: json?.usage ?? null,
      model: json?.model ?? profile.model
    };
  } catch (error) {
    throw new Error(safeError(error));
  } finally {
    clearTimeout(timeout);
  }
}
