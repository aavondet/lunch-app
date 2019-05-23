var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req, res, next) => {
    User.find({})
    .then((users) => {
        console.log('<ADMIN> Gathered all users');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    User.create(req.body)
    .then((user) => {
        console.log('Created user: ' + user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    User.remove({})
    .then((users) => {
        console.log('<ADMIN> All users Deleted');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
});

userRouter.route('/:id')
.get((req, res, next) => {
    User.findById(req.params.id)
    .then((user) => {
        console.log('Gathered user with id: ' + req.params.id);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new : true})
    .then((user) => {
        console.log('Updated user ' + req.params.id + ' to ' + user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
        console.log('User ' + req.params.id + ' is now gone');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); 
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = userRouter;