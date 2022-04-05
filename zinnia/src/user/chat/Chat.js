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

function Chat({user_id}) {

    // const chatId = chat_id;
    const [chatId, setChatId] = useState("624c4ce3ec2df708252fbc7b");
    // const userId = user_id;
    const userId = 2;
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);

    // Obtaining messages
    const getMessages = async (chat_id) => {
        await fetch("http://localhost:8080/private/displayMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                chatObjectId: chat_id})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(data);
            // console.log(data.chatHistory);
            setMessages(data.chatHistory);
        })
        .catch((e) => console.log(e));
    }

    //Obtaining chats
    const getChats = async (user_id) => {
        await fetch(`http://localhost:8080/private/${user_id}/viewAllChat`)
        .then(res => {
            return res.json();
        })
        .then(chats => {
            setChats(chats);
            return chats;
        })
        .then(chats => {
            setChatId(chats[0]._id);
            return chats[0]._id;
        })
        // .then((chat_id) => {
            
        // })
    }

    //componentDidMount
    useEffect(() => {
        getChats(userId);    
        getMessages(chatId);
    }, []);

    // Pusher for updating messages
    useEffect(() => {
        const messagePusher = new Pusher('9bfa9c67db40709d3f03', 
            {
                cluster: 'ap1'
            }
        );

        const messageChannel = messagePusher.subscribe('messages');
        messageChannel.bind('insertedMessages', (newMessage) => {
            console.log(newMessage);
            setMessages([...messages, newMessage]);
        });

        return () => {
            messageChannel.unbind_all();
            messageChannel.unsubscribe();
        }
    }, [messages]);

    //Pusher for updating chats
    // useEffect(() => {
    //     const chatPusher = new Pusher('9bfa9c67db40709d3f03', 
    //         {
    //             cluster: 'ap1'
    //         }
    //     );

    //     const chatChannel = chatPusher.subscribe('chats');
    //     chatChannel.bind('insertedChats', (newChat) => {
    //         setMessages([...chats, newChat]);
    //     });

    //     return () => {
    //         chatChannel.unbind_all();
    //         chatChannel.unsubscribe();
    //     }
    // }, [chats]);

    return(
        <div className="chat">
            <div className="chat-body">
                <Sidebar user_id={userId} chats={chats}/>
                <Messages key={chatId} messages={messages} user_id={userId} chat_id={chatId}/>
            </div>
        </div>
    );
};
export default Chat;