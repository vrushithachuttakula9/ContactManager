const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const auth = require('./src/middleware/auth.js');
const logger = require('./src/utils/logger.js');
const errorHandler = require('./src/middleware/errorHandler.js');

const app = express();

// Connect Database
connectDB();

app.use(cors());  

// Init Middleware
app.use(express.json());
app.use(logger);


// Define Routes
app.use('/contacts', require('./src/routes/contactRoutes'));
app.use('/user', require('./src/routes/userRoutes'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
