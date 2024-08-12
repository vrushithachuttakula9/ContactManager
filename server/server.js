//server.js
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const auth = require('./src/middleware/auth.js');
const logger = require('./src/utils/logger.js');
const path = require('path');
const errorHandler = require('./src/middleware/errorHandler.js');
const fs = require('fs');

const app = express();

connectDB();

app.use(cors());  

app.use(express.json());
app.use(logger);

const uploads = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploads)) {
  fs.mkdirSync(uploads, { recursive: true });
  console.log('Uploads directory created at runtime.');
} else {
  console.log('Uploads directory already exists.');
}

app.use('/uploads', express.static(uploads));
app.use('/contacts', require('./src/routes/contactRoutes'));
app.use('/user', require('./src/routes/userRoutes'));


app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
