const express = require('express');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/auth');
require('dotenv').config();

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
