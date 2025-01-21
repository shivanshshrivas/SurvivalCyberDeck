const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    sendMessage: (message) => ipcRenderer.send("send-message", message),
    receiveMessage: (callback) => ipcRenderer.on("new-message", (_event, message) => callback(message)),
});
