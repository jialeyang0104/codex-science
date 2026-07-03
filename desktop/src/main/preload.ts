import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("codexScience", {
  listProfiles: () => ipcRenderer.invoke("profiles:list"),
  saveProfile: (profile: unknown) => ipcRenderer.invoke("profiles:save", profile),
  deleteProfile: (id: string) => ipcRenderer.invoke("profiles:delete", id),
  testProvider: (id: string) => ipcRenderer.invoke("providers:test", id),
  sendChat: (input: unknown) => ipcRenderer.invoke("chat:send", input)
});
