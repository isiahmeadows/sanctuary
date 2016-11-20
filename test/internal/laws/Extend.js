'use strict';

var compose = require('./compose');
var forall = require('./forall');


//  extend :: Extend w => (w a -> b) -> w a -> w b
var extend = function(f) {
  return function(w) {
    return w.extend(f);
  };
};


module.exports = forall({

  //  extend f . extend g = extend (f . extend g)
  associativity: function(w, f, g) {
    var lhs = compose(extend(f))(extend(g))(w);
    var rhs = extend(compose(f)(extend(g)))(w);
    return [lhs, rhs];
  }

});
