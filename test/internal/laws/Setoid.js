'use strict';

var forall = require('./forall');


module.exports = forall({

  //  a `equals` a = true
  reflexivity: function(a) {
    var lhs = a.equals(a);
    var rhs = true;
    return [lhs, rhs];
  },

  //  a `equals` b = b `equals` a
  symmetry: function(a, b) {
    var lhs = a.equals(b);
    var rhs = b.equals(a);
    return [lhs, rhs];
  },

  //  a `equals` b & b `equals` c => a `equals` c
  transitivity: function(a, b, c) {
    var lhs = !a.equals(b) || !b.equals(c) || a.equals(c);
    var rhs = true;
    return [lhs, rhs];
  }

});
