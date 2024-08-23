import express from 'express';
import path from 'path';
const cors = require('cors');

import userUpdateRoutes from './routes/userUpdateRoutes';
import searchRoutes from './routes/searchRoutes';
import showUserInfoRoutes from './routes/showUserInfoRoutes';
import makePostRoutes from './routes/makePostsRoutes';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'  // Allow only this origin to access
}));

// Serve static files from the public directory in the app folder
app.use(express.static(path.join(__dirname, '../app/public')));

// Use routes
app.use('/api/users', userUpdateRoutes);
app.use('/api', searchRoutes);
app.use('/api', showUserInfoRoutes);
app.use('/api', makePostRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
