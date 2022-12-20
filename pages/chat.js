import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import socketIo from "socket.io-client";

const Chat = () => {
  useEffect(() => {
    const socket = socketIo("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    socket.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    socket.emit("join", "room1");
    socket.emit("sendMessage", "room1", "Hello, world!");

    return () => {
      socket.emit("leave", "room1");
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ marginBottom: "250px" }}>
      <div>
        <title>Socket.IO chat</title>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n      body { margin-bottom: 200px; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }\n\n      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }\n      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }\n      #input:focus { outline: none; }\n      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }\n\n      #messages { list-style-type: none; margin: 0; padding: 0; }\n      #messages > li { padding: 0.5rem 1rem; }\n      #messages > li:nth-child(odd) { background: #efefef; }\n    ',
          }}
        />
        <ul id="messages" />
        <form id="form" action>
          <input id="input" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
