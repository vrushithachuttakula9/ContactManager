const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const auth = require('./src/middleware/auth.js');
const logger = require('./src/utils/logger.js');
const errorHandler = require('./src/middleware/errorHandler.js');

const app = express();

// Connect Database
connectDB();

// app.use(cors());  

app.use(cors({
  origin: 'https://6666e356660c8229092ba451--yourcontactapp.netlify.app' // Allow requests from 'http://example.com// Respond with a 204 status code for preflight requests
}));

// Init Middleware
app.use(express.json());
app.use(logger);


// Define Routes
app.use('/contacts', require('./src/routes/contactRoutes'));
app.use('/user', require('./src/routes/userRoutes'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || config.get('port') || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
