import React, { useEffect } from "react";
import "./ChatWindow.css";

const chatMessages = {
    "Global": [
        { id: 1, sender: "Ansuman Sharma", text: "Hi there, this is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci   ", timestamp: "18-01-2025 16:44" },
        { id: 2, sender: "Leo Cabezas", text: "Yes, I can see it. Good job Shivansh on the module!", timestamp: "18-01-2025 16:45" },
        { id: 3, sender: "Shivansh", text: "I'm goated like that! s is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci  ", timestamp: "18-01-2025 16:46", self: true },
        {id: 4, sender: "Ansuman Sharma", text: "Nigeria!", timestamp: "18-01-2025 16:47" },
        { id: 5, sender: "Ansuman Sharma", text: "Hi there, this is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci   ", timestamp: "18-01-2025 16:44" },
        { id: 6, sender: "Leo Cabezas", text: "Yes, I can see it. Good job Shivansh on the module!", timestamp: "18-01-2025 16:45" },
        { id: 7, sender: "Shivansh", text: "I'm goated like that! s is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci  ", timestamp: "18-01-2025 16:46", self: true },
        {id: 8, sender: "Ansuman Sharma", text: "Nigeria!", timestamp: "18-01-2025 16:47" },
        { id: 9, sender: "Ansuman Sharma", text: "Hi there, this is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci   ", timestamp: "18-01-2025 16:44" },
        { id: 10, sender: "Leo Cabezas", text: "Yes, I can see it. Good job Shivansh on the module!", timestamp: "18-01-2025 16:45" },
        { id: 11, sender: "Shivansh", text: "I'm goated like that! s is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci  ", timestamp: "18-01-2025 16:46", self: true },
        {id: 12, sender: "Ansuman Sharma", text: "Nigeria!", timestamp: "18-01-2025 16:47" },
        { id: 13, sender: "Ansuman Sharma", text: "Hi there, this is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci   ", timestamp: "18-01-2025 16:44" },
        { id: 14, sender: "Leo Cabezas", text: "Yes, I can see it. Good job Shivansh on the module!", timestamp: "18-01-2025 16:45" },
        { id: 15, sender: "Shivansh", text: "I'm goated like that! s is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci  ", timestamp: "18-01-2025 16:46", self: true },
        {id: 16, sender: "Ansuman Sharma", text: "Nigeria!", timestamp: "18-01-2025 16:47" },
        { id: 17, sender: "Ansuman Sharma", text: "Hi there, this is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci   ", timestamp: "18-01-2025 16:44" },
        { id: 18, sender: "Leo Cabezas", text: "Yes, I can see it. Good job Shivansh on the module!", timestamp: "18-01-2025 16:45" },
        { id: 19, sender: "Shivansh", text: "I'm goated like that! s is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci  ", timestamp: "18-01-2025 16:46", self: true },
        {id: 20, sender: "Ansuman Sharma", text: "Nigeria!", timestamp: "18-01-2025 16:47" },
        { id: 21, sender: "Ansuman Sharma", text: "Hi there, this is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci   ", timestamp: "18-01-2025 16:44" },
        { id: 22, sender: "Leo Cabezas", text: "Yes, I can see it. Good job Shivansh on the module!", timestamp: "18-01-2025 16:45" },
        { id: 23, sender: "Shivansh", text: "I'm goated like that! s is a test if my radio module is working, can anyone see it? cewijdu    cviuwebciu  ebiu hcuhewuhcewiuhciuewhuichewiuhciuew hu huiv hewiuhc iuewhc iuehwuc ewguhewiucgeqwiucgigewivgqweicugiewlug iucewgil ugcliewugcliuqgweulicvgqlkug weuci  ", timestamp: "18-01-2025 16:46", self: true },
        {id: 24, sender: "Ansuman Sharma", text: "Nigeria!", timestamp: "18-01-2025 16:47" },
    ],
    "Ansuman Sharma": [
        { id: 1, sender: "Ansuman Sharma", text: "Hey, how's it going?", timestamp: "18-01-2025 14:30" },
        { id: 2, sender: "Shivansh", text: "Doing great, what about you?", timestamp: "18-01-2025 14:31", self: true }
    ],
    "Leo Cabezas": [
        { id: 1, sender: "Leo Cabezas", text: "Let's meet up tomorrow!", timestamp: "18-01-2025 10:00" },
        { id: 2, sender: "Shivansh", text: "Sure thing, what time?", timestamp: "18-01-2025 10:05", self: true }
    ]
};

function ChatWindow({ selectedChat }) {

    useEffect(() => {
        const chatContent = document.querySelector('.chat-content .messages');
        if (chatContent) {
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    }, [selectedChat]);

    return (
        <div className="chat-window">
            {selectedChat ? (
                <div className="chat-content">
                    <div className="chat-header">
                        <h2>{selectedChat.name}</h2>
                    </div>
                    <div className="messages">
                        {chatMessages[selectedChat.name] ? chatMessages[selectedChat.name].map(msg => (
                            <div key={msg.id} className={`message ${msg.self ? "self" : ""}`}>
                                <p className="sender">{msg.sender} <span className="timestamp">{msg.timestamp}</span></p>
                                <p className="text">{msg.text}</p>
                            </div>
                        )) : (
                            <p>No messages yet.</p>
                        )}
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type a message..." />
                        <button>➤</button>
                    </div>
                </div>
            ) : (
                <div className="no-chat">
                    <h2>No chat selected</h2>
                    <p>Select a chat and start messaging!</p>
                </div>
            )}
        </div>
    );
}

export default ChatWindow;
