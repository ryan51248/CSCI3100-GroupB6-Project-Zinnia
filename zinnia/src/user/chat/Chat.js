/* 
This js is the chatroom service
expected function:
1. Group Chat
    create group chat,invite member, delete group, quit group,
    message, accept/reject invitation
2. Individual Chat
    message, start private chat

*/

import React, { useEffect, useState } from "react";
import "./Chat.css" 
import Sidebar from "./sidebar/Sidebar"
import Messages from "./message/Messages";
import Pusher from 'pusher-js';

function Chat() {

    const [_id, set_id] = useState("")
    const [userId, setUserId] = useState(0);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setUserId(2);
        set_id("623cbea7f8e153effa4bcac0");
        fetch(`http://localhost:8080/chat/private/displayMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                chatObjectId: _id}),
            mode: 'cors',
        })
        .then(res => {
            console.log(res);
            setMessages(res);
        })
    }, []);

    useEffect(() => {

    })

    useEffect(() => {
        const pusher = new Pusher('9bfa9c67db40709d3f03', 
            {
                cluster: 'ap1'
            }
        );

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessage) => {
            alert(JSON.stringify(newMessage));
            setMessages([...messages, newMessage])
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [messages]);

    // console.log(messages);

    return(
        <div className="chat">
            <div className="chat-body">
                <Sidebar />
                <Messages messages={messages}/>
            </div>
        </div>
    );
};
export default Chat;