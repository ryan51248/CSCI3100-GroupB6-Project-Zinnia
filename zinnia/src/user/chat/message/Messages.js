import React, { useState } from 'react';
import {DateTime} from 'luxon';
import "./Messages.css";

function Messages({messages, user_id, chat_id}){

    const chatId = chat_id;
    const userId = user_id;
    const [input, setInput] = useState("");

    // Send messages
    const sendMessage = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8080/private/sendMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // speaker: {_id: },
                userId: userId,
                chatObjectId: chatId,
                text: input}),
            mode: 'cors',
        });
        setInput("");
    }

    return (
        <div className="messages">
            <div className="messages-header">
                {/* image */}
                <div className="messages-headerInfo">
                    <h3></h3>
                    <p>Last Seen</p>
                </div>
            </div>
            <div className="messages-body">
                {messages.map((message) => (
                    <p className={`message ${(message.speaker.userId == userId) && "received"}`}>
                        <span className="message-name">
                            {message.speaker.username}
                        </span>
                            {message.text}
                        <span className="message-timestamp">
                            {DateTime.fromISO(message.time).toLocaleString(DateTime.DATETIME_MED)}
                        </span>
                    </p>
                ))} 
            </div>
            <div className="messages-footer">
                <form onSubmit={sendMessage}>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button type="submit">Send message</button>
                </form>
            </div>
        </div>
    )
}

export default Messages;