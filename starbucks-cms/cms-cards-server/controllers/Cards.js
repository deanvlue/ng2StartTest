'use strict';

var url = require('url');

var Cards = require('./CardsService');

module.exports.getByBin = function getByBin (req, res, next) {
  Cards.getByBin(req.swagger.params, res, next);
};
