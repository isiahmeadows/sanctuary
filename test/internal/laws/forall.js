'use strict';

var jsc = require('jsverify');
var R = require('ramda');

//  forall :: StrMap Function -> StrMap Function
module.exports = function forall(laws) {
  return Object.keys(laws).reduce(function(result, name) {
    result[name] = function() {
      var args = Array.prototype.slice.call(arguments);
      var pred = function() {
        var pair = laws[name].apply(null, arguments);
        var lhs = pair[0];
        var rhs = pair[1];
        return R.equals(lhs, rhs);
      };
      test(name, function() {
        jsc.assert(jsc.forall.apply(jsc, args.concat([pred])));
      });
    };
    return result;
  }, {});
};
