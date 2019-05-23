var express = require('express');
var bodyParser = require('body-parser');
var lunch = require('../models/lunch');

const lunchRouter = express.Router();

lunchRouter.use(bodyParser.json());

lunchRouter.route('/lunch')
.all((req, res, next) => {
    
})
.get((req, res, next) => {
    
})
.post((req, res, next) => {
    
})
.delete((req, res, next) => {
    
})
.catch((err) => console.log(err))