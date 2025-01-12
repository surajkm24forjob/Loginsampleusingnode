require('dotenv').config({path:'./config.env'});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('../api/user');
const cors = require('cors')




app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

mongoose.connect(process.env.apiMONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(express.json());


app.use('/api', require('./routes'));


const port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});