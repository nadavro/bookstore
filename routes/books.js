var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/book.js');

/* GET all books */
router.get('/', function(req, res, next) {
    Book.find(function (err, books) {
    if (err) return next(err);
    res.json(books);
  });
});

/* GET single book by id */
router.get('/:id', function(req, res, next) {
    Book.findById(req.params.id, function (err, book) {
    if (err) return next(err);
    res.json(book);
  });
});

/* CREATE book */
router.post('/', function(req, res, next) {
    Book.create(req.body, function (err, book) {
    if (err) return next(err);
    res.json(book);
  });
});

/* UPDATE book */
router.put('/:id', function(req, res, next) {
    Book.findByIdAndUpdate(req.params.id, req.body, function (err, book) {
    if (err) return next(err);
    res.json(book);
  });
});

/* DELETE book */
router.delete('/:id', function(req, res, next) {
    Book.findByIdAndRemove(req.params.id, req.body, function (err, book) {
    if (err) return next(err);
    res.json(book);
  });
});

module.exports = router;