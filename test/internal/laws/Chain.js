'use strict';

var compose = require('./compose');
var flatMap = require('./flatMap');
var forall = require('./forall');


module.exports = forall({

  //  m >>= f >>= g = m >>= (f >=> g)
  associativity: function(m, f, g) {
    var lhs = flatMap(g)(flatMap(f)(m));
    var rhs = compose(flatMap(g))(flatMap(f))(m);
    return [lhs, rhs];
  }

});
