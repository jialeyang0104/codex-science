/// <reference types="vite/client" />

type ProviderKind = "openai" | "deepseek" | "custom";

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

interface ChatResult {
  content: string;
  reasoning?: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  } | null;
  model?: string;
}

interface CodexScienceApi {
  listProfiles: () => Promise<PublicProfile[]>;
  saveProfile: (profile: SaveProfileInput) => Promise<PublicProfile>;
  deleteProfile: (id: string) => Promise<boolean>;
  testProvider: (id: string) => Promise<string>;
  sendChat: (input: {
    profileId: string;
    workflowId: string;
    workflowName: string;
    messages: ChatMessage[];
    extraBody?: Record<string, unknown>;
  }) => Promise<ChatResult>;
}

interface Window {
  codexScience?: CodexScienceApi;
}
