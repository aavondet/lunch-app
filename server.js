// External Modules
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
// var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var mongoStore = require('connect-mongo')(express);
const localConfig = require('./app/config');
const config = require('./app/config');
const mongoose = require('mongoose');

const app = express();
// favicon
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

// Routers
const lunchRouter = require('./app/routers/lunchRouter'); 
const userRouter = require('./app/routers/userRouter');

// Models
const Lunches = require('./app/models/lunch');

// PORT
const PORT = process.env.PORT || 8080;

// Connect to mongoDB
// If using local server: localConfig.DB
// If using MongoDB Atlas: 
// mongodb+srv://<username>:<password>@cluster0-c14lf.gcp.mongodb.net/test?retryWrites=true
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' 
    + process.env.DB_PASS + '@cluster0-c14lf.gcp.mongodb.net/test?retryWrites=true')
.then(() => {
    console.log('Connected to Server');
})
.catch((err) => console.log(err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Set public as static
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

app.get('/', (req, res, next) => {
    res.sendFile('./public/index.html');
});

app.listen(PORT);
console.log(PORT, process.env.HOST);