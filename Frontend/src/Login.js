import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [serverPort, setServerPort] = useState("5000");
  const [room, setRoom] = useState("general");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Please enter your name.");
    const serverURL = `http://localhost:${serverPort}`;
    onLogin({ username, serverURL, room });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>💬 Join ChatNow</h2>
        <form onSubmit={handleSubmit}>
          <label>
            👤 Username
            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            🌐 Server Port
            <input
              type="number"
              placeholder="5000"
              value={serverPort}
              onChange={(e) => setServerPort(e.target.value)}
            />
          </label>
          <label>
            🏷️ Room
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option value="general">General</option>
              <option value="tech">Tech</option>
              <option value="fun">Fun</option>
              <option value="private">Private</option>
            </select>
          </label>
          <button type="submit">Enter Chat 🚀</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
