import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import Searchbar from './searchbar/Searchbar';

function Sidebar() {

    // const [friendList, setFriendList] = useState([]);

    return(
        <div className="sidebar">
            <div className="chats">
                <Searchbar placeholder="Search or start new chat"/>
                {/* {friendList.map((friend, latestMessage) => (
                    <SidebarChat  />
                ))} */}
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}
export default Sidebar;