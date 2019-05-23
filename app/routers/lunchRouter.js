var express = require('express');
var bodyParser = require('body-parser');
var Lunch = require('../models/lunch');

const lunchRouter = express.Router();

lunchRouter.use(bodyParser.json());

lunchRouter.route('/')
.get((req, res, next) => {
    Lunch.find({})
    .then((lunches) => {
        console.log('Gathered all lunches');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lunches);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Lunch.create(req.body)
    .then((lunch) => {
        console.log('Created: ' + lunch);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lunch);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Lunch.remove({})
    .then((lunch) => {
        console.log('All Lunches Deleted');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        res.json(lunch);
    }, (err) => next(err))
    .catch((err) => next(err));
});

lunchRouter.route('/:id')
.get((req, res, next) => {
    Lunch.findById(req.params.id)
    .then((lunch) => {
        console.log('Gathered lunch with id: ' + req.params.id);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lunch);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    Lunch.findByIdAndUpdate(req.params.id, req.body, { new : true})
    .then((lunch) => {
        console.log('Updated lunch ' + req.params.id + ' to ' + lunch);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(lunch);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Lunch.findByIdAndDelete(req.params.id)
    .then((lunch) => {
        console.log('Lunch ' + req.params.id + ' deleted...');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        res.json(lunch);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = lunchRouter;