// External Modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const config = require('./app/config')
const mongoose = require('mongoose');

const app = express();

// Routers
const lunchRouter = require('./app/routers/lunchRouter'); 

// Models
const Lunches = require('./app/models/lunch');

// Connect to mongoDB
mongoose.connect(config.DB)
.then(() => {
    console.log('Connected to the server');
})
.catch((err) => console.log(err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));

app.use('/lunch', lunchRouter);

app.listen(config.PORT);