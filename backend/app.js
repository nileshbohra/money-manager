require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const cors = require('cors');
const router = require('./routes/routes');

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5173',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api', router);

app.listen(PORT, async () => {
  console.log(`Server started running on port: ${PORT}`);
});
