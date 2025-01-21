const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),  // Use preload for secure IPC
            nodeIntegration: false,  // Prevent direct node access for security
            contextIsolation: true   // Isolate context for better security
        }
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL("http://localhost:3000"); // Load the React frontend
});

// IPC Event to send messages via Python
ipcMain.on("send-message", (event, message) => {
    const pythonProcess = spawn("python", ["radio.py", message]);

    pythonProcess.stdout.on("data", (data) => {
        event.reply("message-sent", data.toString());
    });
});

// IPC Event to receive messages from Python
ipcMain.on("receive-message", (event) => {
    const pythonProcess = spawn("python", ["radio.py"]);

    pythonProcess.stdout.on("data", (data) => {
        event.reply("new-message", data.toString());
    });
});
