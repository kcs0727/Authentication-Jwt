const mongoose= require('mongoose');

require('dotenv').config();
const url= process.env.MONGO_CONN;

mongoose.connect(url);

