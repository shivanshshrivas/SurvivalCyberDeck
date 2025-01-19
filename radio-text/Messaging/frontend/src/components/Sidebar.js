import React from "react";
import "./Sidebar.css";
import { FaComments, FaPlus, FaUsers, FaUser, FaMoon, FaCog } from "react-icons/fa";

function Sidebar({ isOpen, toggle }) {
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
                    <li><FaUsers className="icon"/> Global</li>
                    <li><FaUser className="icon"/> Shivansh</li>
                </ul>
            )}
        </div>
    );
}

export default Sidebar;
