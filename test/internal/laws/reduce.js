'use strict';

var R = require('ramda');

module.exports = function reduce(f) {
  return function(x) {
    return function(foldable) {
      return R.reduce(f, x, foldable);
    };
  };
};
