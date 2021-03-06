'use strict';

var jsc = require('jsverify');
var R = require('ramda');


var basic = jsc.sum([jsc.integer, jsc.string, jsc.bool, jsc.falsy]);

var useful = jsc.sum([basic, jsc.array(basic), jsc.dict(basic), jsc.fn(basic)]);

exports.idempotent = function(f) {
  return jsc.checkForall(useful, function(x) {
    return R.equals(f(f(x)), f(x));
  });
};

exports.involution = function(f) {
  return jsc.checkForall(useful, function(x) {
    return R.equals(f(f(x)), x);
  });
};
