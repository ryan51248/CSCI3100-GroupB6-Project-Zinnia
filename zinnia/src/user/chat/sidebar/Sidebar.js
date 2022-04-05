import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import Searchbar from './searchbar/Searchbar';

function Sidebar({user_id, chats}) {

    const userId = user_id;
    const Chats = chats;
    console.log(Chats);
    if (Chats) {
        
    }

    return(
        <div className="sidebar">
            <div className="chats">
                <Searchbar placeholder="Search or start new chat" user_id={userId} />
                {(Chats) && Chats.map((chat) => (
                    <SidebarChat />
                ))}
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}
export default Sidebar;