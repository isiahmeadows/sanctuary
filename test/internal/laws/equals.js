'use strict';

var R = require('ramda');

//  equals :: a -> b -> Boolean
module.exports = function equals(x) {
  return function(y) {
    return R.equals(x, y);
  };
};
