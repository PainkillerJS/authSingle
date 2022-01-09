const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const PORT = process.env.PORT;
const CONNECT_CODE = process.env.CONNECT_CODE;

const startServer = async () => {
  try {
    await mongoose.connect(CONNECT_CODE);
    app.listen(PORT, () => console.log('Start server...'));
  } catch (err) {
    console.log(err.message);
  }
};

startServer();
