'use strict';

var concat = require('./concat');
var forall = require('./forall');


module.exports = forall({

  //  (empty m) `concat` m = m
  leftIdentity: function(m) {
    var lhs = concat(m.empty())(m);
    var rhs = m;
    return [lhs, rhs];
  },

  //  m `concat` (empty m) = m
  rightIdentity: function(m) {
    var lhs = concat(m)(m.empty());
    var rhs = m;
    return [lhs, rhs];
  }

});
