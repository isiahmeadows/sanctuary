'use strict';

var Identity = require('../Identity');
var ap = require('./ap');
var equals = require('./equals');
var forall = require('./forall');
var map = require('./map');
var sequence = require('./sequence');


//  Compose :: (Apply f, Apply g) => (TypeRep f, TypeRep g) -> f (g a) -> Compose f g a
var Compose = function(F, G) {
  var ComposeFG = function ComposeFG(value) {
    if (!(this instanceof ComposeFG)) return new ComposeFG(value);
    this.value = value;
    this.F = F;
    this.G = G;
  };
  ComposeFG.of = function(x) {
    return ComposeFG(F.of(G.of(x)));
  };
  ComposeFG.prototype['@@type'] = 'sanctuary/Compose';
  ComposeFG.prototype.equals = function(x) {
    return x != null && x['@@type'] === ComposeFG.prototype['@@type'] &&
           x.F === this.F && x.G === this.G && equals(x.value)(this.value);
  };
  ComposeFG.prototype.map = function(f) {
    return ComposeFG(map(map(f))(this.value));
  };
  ComposeFG.prototype.ap = function(other) {
    return ComposeFG(map(map(ap)(this.value))(other.value));
  };
  return ComposeFG;
};


module.exports = forall({

  //  t (u `sequence` F.of) = u `map` t `sequence` G.of
  naturality: function(t, u, F, G) {
    var lhs = t(sequence(F.of)(u));
    var rhs = sequence(G.of)(map(t)(u));
    return [lhs, rhs];
  },

  //  u `map` Id.of `sequence` Id.of = Id.of u
  identity: function(u) {
    var lhs = sequence(Identity.of)(map(Identity.of)(u));
    var rhs = Identity.of(u);
    return [lhs, rhs];
  },

  //  u `map` Compose `sequence` Compose.of = Compose (u `sequence` F.of `map` (\x -> x `sequence` G.of))
  composition: function(u, F, G) {
    var C = Compose(F, G);
    var lhs = sequence(C.of)(map(C)(u));
    var rhs = C(map(sequence(G.of))(sequence(F.of)(u)));
    return [lhs, rhs];
  }

});
