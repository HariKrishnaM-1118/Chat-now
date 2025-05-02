import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { BsSun, BsMoon } from "react-icons/bs";
import "./Chat.css";

function Chat({ username, serverURL, room }) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);
    newSocket.emit("joinRoom", { room });

    newSocket.on("receiveMessage", ({ user, msg }) => {
      setChat((prev) => [...prev, { user, msg, type: "received" }]);
    });

    return () => newSocket.disconnect();
  }, [serverURL, room]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("sendMessage", { user: username, msg: message, room });
    setChat((prev) => [...prev, { user: "You", msg: message, type: "sent" }]);
    setMessage("");
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className={`chat-wrapper ${darkTheme ? "dark" : ""}`}>
      <div className="chat-header">
        <span>{room ? room.toUpperCase() : "Chat Room"} | Hello, {username || "Guest"}
</span>
        <button
          className="theme-toggle"
          onClick={() => setDarkTheme(!darkTheme)}
        >
          {darkTheme ? <BsSun /> : <BsMoon />}
        </button>
      </div>

      <div className="chat-box">
        {chat.map((c, i) => (
          <div key={i} className={`chat-message ${c.type}`}>
            <div className="chat-bubble">
              <strong>{c.user}</strong>
              <div>{c.msg}</div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send ➤</button>
      </div>
    </div>
  );
}

export default Chat;
