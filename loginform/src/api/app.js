
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('../api/user');
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

mongoose.connect('mongodb+srv://surajkm243:Iamsurajk2510@cluster1.6lndd.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(express.json());


app.use('/api', require('./routes'));


const port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});