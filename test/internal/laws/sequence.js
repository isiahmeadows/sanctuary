'use strict';

var R = require('ramda');

module.exports = function sequence(pure) {
  return function(traversable) {
    return R.sequence(pure, traversable);
  };
};
