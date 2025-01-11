import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './Routes/User.route.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import messageRoute from './Routes/message.route.js';
import { app, server } from './SocketIO/server.js';

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// MongoDB connection
try {
  mongoose.connect(URI);
  console.log('Connected to MongoDB');
} catch (error) {
  console.log(error);
}

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Routes for user and message
app.use('/api/user', UserRoute);
app.use('/api/message', messageRoute);

// Code for production deployment
if (process.env.NODE_ENV === 'production') {
  const dirPath = path.resolve();

  // Serving the static files from 'Frontend/dist' directory
  app.use(express.static(path.join(dirPath, 'Frontend', 'dist')));

  // Fallback for all other routes to serve index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirPath, 'Frontend', 'dist', 'index.html'));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
