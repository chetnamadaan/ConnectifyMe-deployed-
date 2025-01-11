import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './Routes/User.route.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import messageRoute from "./Routes/message.route.js"
import {app, server} from "./SocketIO/server.js";

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

// Routes for user
app.use('/api/user', UserRoute);
app.use('/api/message', messageRoute);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
