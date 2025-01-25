import React from "react";
import "./Sidebar.css";
import { FaComments, FaPlus, FaUsers, FaUser, FaMoon, FaCog } from "react-icons/fa";

const chatList = [
    { id: 1, name: "Global", icon: <FaUsers /> },
    { id: 2, name: "Ansuman Sharma", icon: <FaUser /> },
    { id: 3, name: "Leo Cabezas", icon: <FaUser /> }
];

function Sidebar({ isOpen, toggle, onSelectChat }) {
    return (
        <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
            {/* Top Icons */}
            <div className="sidebar-top">
                <FaComments className="icon" onClick={toggle} />
                {isOpen ? 
                <>
                    <FaCog className="icon" />
                    <FaMoon className="icon" />
                </> 
                : 
                <div>
                    <FaCog className="icon" />
                    <FaMoon className="icon" />
                </div>}
            </div>

            {/* Chat Options */}
            {isOpen && (
                <ul className="menu">
                    <hr className="separator"/>
                    <li><FaPlus className="icon"/> New Chat</li>
                    <hr className="separator"/>
                    {chatList.map(chat => (
                        <li key={chat.id} onClick={() => onSelectChat(chat)}>
                            {chat.icon} {chat.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Sidebar;
