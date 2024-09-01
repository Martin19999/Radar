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

var whitelist = [process.env.REACT_APP_FRONTEND_URL, 'http://localhost:3000']
var corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
  methods: "GET,POST,OPTIONS,DELETE,PUT",
  allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(function(req, res, next) {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send(200); // Send OK status for OPTIONS requests
  } else {
    next();
  }
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


