'use strict';

var concat = require('./concat');
var forall = require('./forall');


module.exports = forall({

  //  (a `concat` b) `concat` c = a `concat` (b `concat` c)
  associativity: function(a, b, c) {
    var lhs = concat(concat(a)(b))(c);
    var rhs = concat(a)(concat(b)(c));
    return [lhs, rhs];
  }

});
