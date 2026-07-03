import {
  Bot,
  Check,
  ChevronRight,
  Copy,
  KeyRound,
  Loader2,
  Plus,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { providerPresets, ResearchWorkflow, workflows } from "./data/workflows";

type DraftProfile = SaveProfileInput & { provider: ProviderKind };

const fallbackApi: CodexScienceApi = {
  async listProfiles() {
    return [];
  },
  async saveProfile() {
    throw new Error("Desktop bridge unavailable. Run the packaged Electron app to save providers.");
  },
  async deleteProfile() {
    return true;
  },
  async testProvider() {
    throw new Error("Desktop bridge unavailable.");
  },
  async sendChat() {
    return {
      content:
        "Desktop bridge unavailable. The renderer is running in browser preview mode; packaged builds use Electron IPC for provider calls."
    };
  }
};

function api() {
  return window.codexScience ?? fallbackApi;
}

const initialDraft: DraftProfile = {
  provider: "openai",
  name: providerPresets.openai.name,
  baseUrl: providerPresets.openai.baseUrl,
  chatPath: providerPresets.openai.chatPath,
  model: providerPresets.openai.model,
  apiKey: ""
};

export default function App() {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState("");
  const [activeWorkflowId, setActiveWorkflowId] = useState("evidence");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Evidence workspace ready."
    }
  ]);
  const [composer, setComposer] = useState("");
  const [draft, setDraft] = useState<DraftProfile>(initialDraft);
  const [providerPanelOpen, setProviderPanelOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeWorkflow = useMemo(
    () => workflows.find((item) => item.id === activeWorkflowId) ?? workflows[0],
    [activeWorkflowId]
  );
  const selectedProfile = profiles.find((profile) => profile.id === selectedProfileId);

  useEffect(() => {
    void refreshProfiles();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  async function refreshProfiles() {
    const nextProfiles = await api().listProfiles();
    setProfiles(nextProfiles);
    if (!selectedProfileId && nextProfiles[0]) {
      setSelectedProfileId(nextProfiles[0].id);
    }
  }

  function applyPreset(provider: ProviderKind) {
    const preset = providerPresets[provider];
    setDraft({
      provider,
      name: preset.name,
      baseUrl: preset.baseUrl,
      chatPath: preset.chatPath,
      model: preset.model,
      apiKey: ""
    });
  }

  function selectWorkflow(workflow: ResearchWorkflow) {
    setActiveWorkflowId(workflow.id);
    setComposer((current) => current || workflow.prompt);
  }

  async function saveProvider(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const saved = await api().saveProfile(draft);
      await refreshProfiles();
      setSelectedProfileId(saved.id);
      setStatus(`${saved.name} saved.`);
      setProviderPanelOpen(false);
      setDraft({ ...draft, id: saved.id, apiKey: "" });
    } catch (err) {
      setError(readError(err));
    } finally {
      setBusy(false);
    }
  }

  async function deleteProfile(id: string) {
    setBusy(true);
    setError("");
    try {
      await api().deleteProfile(id);
      const nextProfiles = await api().listProfiles();
      setProfiles(nextProfiles);
      setSelectedProfileId(nextProfiles[0]?.id ?? "");
    } catch (err) {
      setError(readError(err));
    } finally {
      setBusy(false);
    }
  }

  async function testProvider() {
    if (!selectedProfileId) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const result = await api().testProvider(selectedProfileId);
      setStatus(`Provider replied: ${result}`);
    } catch (err) {
      setError(readError(err));
    } finally {
      setBusy(false);
    }
  }

  async function sendMessage(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!composer.trim() || busy) return;
    if (!selectedProfileId) {
      setError("Add an AI provider before sending.");
      setProviderPanelOpen(true);
      return;
    }

    const nextUserMessage: ChatMessage = { role: "user", content: composer.trim() };
    const nextMessages = [...messages, nextUserMessage].filter(
      (message) => !(message.role === "assistant" && message.content === "Evidence workspace ready.")
    );

    setMessages(nextMessages);
    setComposer("");
    setBusy(true);
    setError("");
    setStatus("");

    try {
      const result = await api().sendChat({
        profileId: selectedProfileId,
        workflowId: activeWorkflow.id,
        workflowName: activeWorkflow.label,
        messages: nextMessages
      });
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: formatResult(result)
        }
      ]);
    } catch (err) {
      setError(readError(err));
    } finally {
      setBusy(false);
    }
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(text.slice(0, 18));
    window.setTimeout(() => setCopied(""), 1400);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">
            <Sparkles size={19} strokeWidth={2.2} />
          </div>
          <div>
            <h1>Codex Science</h1>
            <p>AI research workbench</p>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="section-label">Workflows</div>
          <div className="workflow-list">
            {workflows.map((workflow) => {
              const selected = workflow.id === activeWorkflow.id;
              return (
                <button
                  key={workflow.id}
                  className={`workflow-button ${selected ? "active" : ""}`}
                  onClick={() => selectWorkflow(workflow)}
                  style={{ "--accent": workflow.accent } as React.CSSProperties}
                >
                  <workflow.Icon size={17} />
                  <span>
                    <strong>{workflow.label}</strong>
                    <small>{workflow.caption}</small>
                  </span>
                  {selected && <ChevronRight size={16} />}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className="main-grid">
        <header className="topbar">
          <div>
            <span className="eyebrow">Active workflow</span>
            <h2>{activeWorkflow.label}</h2>
          </div>
          <div className="topbar-actions">
            <select
              aria-label="AI provider"
              value={selectedProfileId}
              onChange={(event) => setSelectedProfileId(event.target.value)}
            >
              <option value="">No provider</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name} · {profile.model || "model"}
                </option>
              ))}
            </select>
            <button className="icon-button" aria-label="Test provider" onClick={testProvider} disabled={!selectedProfileId || busy}>
              {busy ? <Loader2 className="spin" size={18} /> : <ShieldCheck size={18} />}
            </button>
            <button className="primary-button" onClick={() => setProviderPanelOpen(true)}>
              <Plus size={17} />
              Provider
            </button>
          </div>
        </header>

        <section className="chat-panel" aria-label="Research chat">
          <div className="workflow-summary" style={{ "--accent": activeWorkflow.accent } as React.CSSProperties}>
            <div className="summary-icon">
              <activeWorkflow.Icon size={22} />
            </div>
            <div>
              <h3>{activeWorkflow.label}</h3>
              <p>{activeWorkflow.caption}</p>
            </div>
            <div className="check-row">
              {activeWorkflow.checks.map((check) => (
                <span key={check}>
                  <Check size={13} />
                  {check}
                </span>
              ))}
            </div>
          </div>

          <div className="message-list">
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`message ${message.role}`}>
                <div className="message-avatar">
                  {message.role === "assistant" ? <Bot size={17} /> : <span>Y</span>}
                </div>
                <div className="message-body">
                  <div className="message-head">
                    <strong>{message.role === "assistant" ? "Codex Science" : "You"}</strong>
                    <button aria-label="Copy message" onClick={() => copyText(message.content)}>
                      <Copy size={14} />
                    </button>
                  </div>
                  <pre>{message.content}</pre>
                </div>
              </article>
            ))}
            {busy && (
              <article className="message assistant pending">
                <div className="message-avatar">
                  <Loader2 className="spin" size={17} />
                </div>
                <div className="message-body">
                  <div className="skeleton-line wide" />
                  <div className="skeleton-line" />
                </div>
              </article>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="composer" onSubmit={sendMessage}>
            <textarea
              value={composer}
              onChange={(event) => setComposer(event.target.value)}
              placeholder={activeWorkflow.prompt}
              rows={4}
            />
            <div className="composer-footer">
              <button type="button" className="ghost-button" onClick={() => setComposer(activeWorkflow.prompt)}>
                Use template
              </button>
              <button className="send-button" disabled={busy || !composer.trim()}>
                {busy ? <Loader2 className="spin" size={17} /> : <Send size={17} />}
                Send
              </button>
            </div>
          </form>
        </section>

        <aside className="inspector">
          <section className="panel">
            <div className="panel-title">
              <Settings size={17} />
              Provider
            </div>
            {selectedProfile ? (
              <div className="profile-card">
                <strong>{selectedProfile.name}</strong>
                <span>{selectedProfile.provider}</span>
                <code>{selectedProfile.model || "model unset"}</code>
                <small>{selectedProfile.baseUrl}{selectedProfile.chatPath}</small>
                <button className="danger-button" onClick={() => deleteProfile(selectedProfile.id)} disabled={busy}>
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>
            ) : (
              <button className="empty-provider" onClick={() => setProviderPanelOpen(true)}>
                <KeyRound size={18} />
                Add provider
              </button>
            )}
          </section>

          <section className="panel">
            <div className="panel-title">
              <activeWorkflow.Icon size={17} />
              Checks
            </div>
            <ul className="check-list">
              {activeWorkflow.checks.map((check) => (
                <li key={check}>
                  <span />
                  {check}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <div className="panel-title">
              <ShieldCheck size={17} />
              Guardrails
            </div>
            <div className="guardrail-list">
              <p>Evidence before synthesis</p>
              <p>Local data before external services</p>
              <p>Explicit compute and credential assumptions</p>
              <p>No fabricated citations or results</p>
            </div>
          </section>

          {(status || error || copied) && (
            <section className={`notice ${error ? "error" : ""}`}>
              {error || status || "Copied"}
            </section>
          )}
        </aside>
      </main>

      {providerPanelOpen && (
        <div className="modal-backdrop" role="presentation">
          <form className="provider-modal" onSubmit={saveProvider}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">AI provider</span>
                <h2>Account</h2>
              </div>
              <button type="button" className="icon-button" aria-label="Close" onClick={() => setProviderPanelOpen(false)}>
                ×
              </button>
            </div>

            <div className="segmented">
              {(["openai", "deepseek", "custom"] as ProviderKind[]).map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className={draft.provider === provider ? "selected" : ""}
                  onClick={() => applyPreset(provider)}
                >
                  {providerPresets[provider].name}
                </button>
              ))}
            </div>

            <label>
              Name
              <input
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                required
              />
            </label>
            <label>
              Base URL
              <input
                value={draft.baseUrl}
                onChange={(event) => setDraft({ ...draft, baseUrl: event.target.value })}
                placeholder="https://api.openai.com/v1"
                required
              />
            </label>
            <label>
              Chat path
              <input
                value={draft.chatPath}
                onChange={(event) => setDraft({ ...draft, chatPath: event.target.value })}
                placeholder="/chat/completions"
                required
              />
            </label>
            <label>
              Model
              <input
                value={draft.model}
                onChange={(event) => setDraft({ ...draft, model: event.target.value })}
                placeholder={draft.provider === "deepseek" ? "deepseek-v4-pro" : "model id"}
                required
              />
            </label>
            <label>
              API key
              <input
                type="password"
                value={draft.apiKey}
                onChange={(event) => setDraft({ ...draft, apiKey: event.target.value })}
                placeholder={draft.id ? "Leave blank to keep saved key" : "sk-..."}
              />
            </label>

            <div className="modal-actions">
              <button type="button" className="ghost-button" onClick={() => setProviderPanelOpen(false)}>
                Cancel
              </button>
              <button className="primary-button" disabled={busy}>
                {busy ? <Loader2 className="spin" size={17} /> : <KeyRound size={17} />}
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function readError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function formatResult(result: ChatResult) {
  const parts = [];
  if (result.reasoning) {
    parts.push(`Reasoning\n${result.reasoning}`);
  }
  parts.push(result.content);
  if (result.usage?.total_tokens) {
    parts.push(`\nTokens: ${result.usage.total_tokens}${result.model ? ` · ${result.model}` : ""}`);
  }
  return parts.join("\n\n");
}
