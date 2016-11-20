'use strict';

var $ = require('./$');
var ap = require('./ap');
var forall = require('./forall');
var id = require('./id');


module.exports = forall({

  //  pure id <*> v = v
  identity: function(pure, v) {
    var lhs = ap(pure(id))(v);
    var rhs = v;
    return [lhs, rhs];
  },

  //  pure f <*> pure x = pure (f x)
  homomorphism: function(pure, f, x) {
    var lhs = ap(pure(f))(pure(x));
    var rhs = pure(f(x));
    return [lhs, rhs];
  },

  //  u <*> pure y = pure ($ y) <*> u
  interchange: function(pure, u, y) {
    var lhs = ap(u)(pure(y));
    var rhs = ap(pure($(y)))(u);
    return [lhs, rhs];
  }

});
