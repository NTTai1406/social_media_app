const express = require('express');
const app = express();
const indexRoute = require('./routes/index.route');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

//init dbs
const connectDB = require('./config/mongo.db');
connectDB.connect();

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init routes
app.use('/api/v1', indexRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});