'use strict';

var ap = require('./ap');
var compose = require('./compose');
var forall = require('./forall');
var map = require('./map');


module.exports = forall({

  //  (.) <$> u <*> v <*> w = u <*> (v <*> w)
  composition: function(u, v, w) {
    var lhs = ap(ap(map(compose)(u))(v))(w);
    var rhs = ap(u)(ap(v)(w));
    return [lhs, rhs];
  }

});
