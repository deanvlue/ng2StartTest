'use strict';

var url = require('url');

var Card = require('./CardService');

module.exports.delMovie = function delMovie (req, res, next) {
  Card.delMovie(req.swagger.params, res, next);
};

module.exports.getAll = function getAll (req, res, next) {
  Card.getAll(req.swagger.params, res, next);
};

module.exports.getOne = function getOne (req, res, next) {
  Card.getOne(req.swagger.params, res, next);
};

module.exports.save = function save (req, res, next) {
  Card.save(req.swagger.params, res, next);
};

module.exports.update = function update (req, res, next) {
  Card.update(req.swagger.params, res, next);
};
