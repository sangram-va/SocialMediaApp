const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const followRoutes=require('./routes/followRoutes')

dotenv.config();
const app = express();

const cors = require('cors');
app.use(cors()); 

app.use(express.json());

connectDB();

// Routes
app.use('/api/users', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/follow', followRoutes);


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
