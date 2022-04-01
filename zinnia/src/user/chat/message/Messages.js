import React, { useState } from "react";
import "./Messages.css";

function Messages(){
    // const user = currentUser.userId;
    // const username = currentUser.username;
    // const chatId = currentUser.chatObjectId;
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/private/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: "2",
                // userId: user,
                chatObjectId: "623cbea7f8e153effa4bcac0",
                // chatObjectId: chatId,
                content: input,}),
            mode: 'cors',
        });
        setInput("");
    }

    return (
        <div className="messages">
            <div className="messages-header">
                {/* image */}
                <div className="messages-headerInfo">
                    <h3>Room Name</h3>
                    <p>Last Seen</p>
                </div>
            </div>
            <div className="messages-body">
                {/* {messages.map((message) => (
                    <p className="message">
                        <span className="message-name">
                            Name
                        </span>
                            {message.message}
                        <span className="message-timestamp">
                            {new Date().toUTCString()}
                        </span>
                    </p>
                ))} */}
               

                <p className="message recieved">
                    <span className="message-name">Name</span>
                    Message
                    <span className="message-timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>
            <div className="messages-footer">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send message</button>
                </form>
            </div>
        </div>
    )
}

export default Messages;