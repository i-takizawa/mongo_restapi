const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

// Connect to database
mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to the database!'));
  
// Listen on port
const appPort = config.appPort;
app.listen(appPort, () => console.log(`Server started on port ${appPort}!`));
