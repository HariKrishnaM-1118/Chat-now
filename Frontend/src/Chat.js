import React, { useState, useEffect } from "react";
import socket from "./socket";
import "./Chat.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, { msg, type: "received" }]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("sendMessage", message);
    setChat((prev) => [...prev, { msg: message, type: "sent" }]);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>ChatNow</h2>
      <div className="messages">
        {chat.map((item, index) => (
          <div
            key={index}
            className={`msg ${item.type === "sent" ? "sent" : "received"}`}
          >
            {item.msg}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
