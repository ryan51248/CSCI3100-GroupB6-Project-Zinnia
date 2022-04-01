import React from 'react';
import "./SidebarChat.css";

function SidebarChat({roomname, latestMessage}) {
    return(
        <div className="sidebarChat">
            {/* Avatar */}
            <div className="sidebarChat-info">
                <h2>Room name</h2>
                <p>Last Message</p>
            </div>  
        </div>
    )
}

export default SidebarChat; 