'use strict';

var flatMap = require('./flatMap');
var forall = require('./forall');


module.exports = forall({

  //  M.of x >>= f = f x
  leftIdentity: function(M, f, x) {
    var lhs = flatMap(f)(M.of(x));
    var rhs = f(x);
    return [lhs, rhs];
  },

  //  m >>= M.of = m
  rightIdentity: function(M, m) {
    var lhs = flatMap(M.of)(m);
    var rhs = m;
    return [lhs, rhs];
  }

});
