'use strict';

var R = require('ramda');

module.exports = function concat(x) {
  return function(y) {
    return R.concat(x, y);
  };
};
