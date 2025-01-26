const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const waitOn = require("wait-on"); // Wait for React

let mainWindow;

app.whenReady().then(async () => {
    const options = {
        resources: ["http://localhost:3000"],
        timeout: 30000, // Wait for 30 seconds max
    };

    try {
        await waitOn(options); // Wait for React to start

        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: false,
                contextIsolation: true
            }
        });

        mainWindow.setMenu(null);
        mainWindow.loadURL("http://localhost:3000"); // Load React frontend

        mainWindow.on("closed", () => {
            mainWindow = null;
        });
    } catch (err) {
        console.error("❌ Error waiting for React:", err);
    }
});

// Prevent multiple Electron instances when reloaded
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// // IPC Event to send messages via Python
// ipcMain.on("send-message", (event, message) => {
//     const pythonProcess = spawn("python", ["radio.py", message]);

//     pythonProcess.stdout.on("data", (data) => {
//         event.reply("message-sent", data.toString());
//     });

//     pythonProcess.stderr.on("data", (data) => {
//         console.error(`Python Error: ${data}`);
//     });
// });

// // IPC Event to receive messages from Python
// ipcMain.on("receive-message", (event) => {
//     const pythonProcess = spawn("python", ["radio.py"]);

//     pythonProcess.stdout.on("data", (data) => {
//         event.reply("new-message", data.toString());
//     });

//     pythonProcess.stderr.on("data", (data) => {
//         console.error(`Python Error: ${data}`);
//     });
// });
