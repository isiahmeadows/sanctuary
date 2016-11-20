'use strict';

var R = require('ramda');

module.exports = function flatMap(f) {
  return function(chain) {
    return R.chain(f, chain);
  };
};
