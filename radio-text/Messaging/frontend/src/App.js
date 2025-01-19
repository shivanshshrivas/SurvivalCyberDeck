import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
            <ChatWindow selectedChat={null} />
        </div>
    );
}

export default App;
