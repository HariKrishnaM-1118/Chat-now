import React, { useState } from "react";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <Chat username={user.username} serverURL={user.serverURL} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </>
  );
}

export default App;
