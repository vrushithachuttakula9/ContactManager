//server.js
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const auth = require('./src/middleware/auth.js');
const logger = require('./src/utils/logger.js');
const path = require('path');
const errorHandler = require('./src/middleware/errorHandler.js');

const app = express();

connectDB();

app.use(cors());  

app.use(express.json());
app.use(logger);


// Define Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/contacts', require('./src/routes/contactRoutes'));
app.use('/user', require('./src/routes/userRoutes'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
