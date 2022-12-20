import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import socketIo from 'socket.io-client';

const Chat = () => {
  useEffect(() => {
    const socket = socketIo('http://localhost:3001');

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });

    socket.emit('join', 'room1');
    socket.emit('sendMessage', 'room1', 'Hello, world!');

    return () => {
      socket.emit('leave', 'room1');
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Render the chat UI here */}
      <Typography>hii</Typography>
    </div>
  );
};

export default Chat;
