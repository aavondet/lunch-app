// External Modules
var express = require('express');
// var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var mongoStore = require('connect-mongo')(express);
const config = require('./app/config')
const mongoose = require('mongoose');

const app = express();

// Routers
const lunchRouter = require('./app/routers/lunchRouter'); 
const userRouter = require('./app/routers/userRouter');

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

// // Session Setup
// app.use(express.cookieParser());
// app.use(session({
//     secret : '3.1415926535',
//     store : new mongoStore({
//         db : 'session',
//         host : 'localhost',
//         clear_interval : 60 * 60
//     }),
//     cookie : {
//         httpOnly : false,
//         maxAge : new Date(Date.now() + 60 * 60 * 1000)
//     }
// }));

// Use Routers
app.use('/lunch', lunchRouter);
app.use('/user', userRouter);

app.listen(config.PORT);