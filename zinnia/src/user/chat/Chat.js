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

function Chat(chat_id) {

    const [_id, set_id] = useState(chat_id);
    const [userId, setUserId] = useState(0);
    const [messages, setMessages] = useState([]);
    const get_id = async (newId) => {
         await fetch("http://localhost:8080/private/displayMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': *
            },
            mode: 'cors',
            body: JSON.stringify({
                chatObjectId: newId})
        })
        .then(res => {
            // console.log(res.json());
            return res.json();
        })
        .then(data => {
            console.log(data);
            // const data = JSON.parse(result);
            // console.log(data);
            setMessages(data.chatHistory);
        })
        .catch((e) => console.log(e));
    }

    useEffect(() => {
        setUserId(2);
        // get_id(_id)
        get_id("62471a0997d5113678ca44e8");
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
            setMessages([...messages, newMessage]);
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
                <Messages key={_id} messages={messages}/>
            </div>
        </div>
    );
};
export default Chat;