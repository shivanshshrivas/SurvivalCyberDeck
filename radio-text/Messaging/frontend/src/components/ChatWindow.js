import React from "react";
import "./ChatWindow.css";

function ChatWindow({ selectedChat }) {
    return (
        <div className="chat-window">
            {selectedChat ? (
                <div className="chat-content">
                    <h2>{selectedChat.name}</h2>
                    <p>Start chatting with {selectedChat.name}...</p>
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
