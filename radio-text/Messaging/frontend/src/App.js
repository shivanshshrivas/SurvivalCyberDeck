import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} onSelectChat={setSelectedChat} />
            <ChatWindow selectedChat={selectedChat} />
        </div>
    );
}

export default App;
