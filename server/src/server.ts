import userUpdateRoutes from './routes/userUpdateRoutes';
import searchRoutes from './routes/searchRoutes';
import showUserInfoRoutes from './routes/showUserInfoRoutes';
import makePostsRoutes from './routes/makePostsRoutes';
import makeCommentsRoutes from './routes/makeCommentsRoutes';
import updateRelationRoutes from './routes/updateRelationRoutes';
import showRelationRoutes from './routes/showRelationRoutes';

import express from 'express';
import path from 'path';
const cors = require('cors');

const app = express();

app.use(function(req, res, next) {
  const origin = req.header('Origin');
  res.setHeader("Access-Control-Allow-Origin", origin ?? '*');
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  
});

var corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  methods: "GET,POST,OPTIONS,DELETE,PUT",
}

app.use(cors(corsOptions));
app.options("*", (req, res) => {
  const origin = req.header('Origin');
  res.setHeader("Access-Control-Allow-Origin", origin ?? '*');
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendStatus(200);
});

app.use(express.json());

// Serve static files from the public directory in the app folder
app.use(express.static(path.join(__dirname, '../app/public')));

// Use routes
app.use('/api/users', userUpdateRoutes);
app.use('/api', searchRoutes);
app.use('/api', showUserInfoRoutes);
app.use('/api', makePostsRoutes);
app.use('/api', makeCommentsRoutes);
app.use('/api', updateRelationRoutes);
app.use('/api', showRelationRoutes);


const PORT = process.env.PORT || 3001;

// Delay starting the server to handle DNS resolution delay
setTimeout(() => {
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}, 1000);  // Delay for 1 second


