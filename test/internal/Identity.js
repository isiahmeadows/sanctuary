'use strict';

var R = require('ramda');


//  Identity :: a -> Identity a
var Identity = function Identity(value) {
  if (!(this instanceof Identity)) return new Identity(value);
  this.value = value;
};

Identity.of = Identity;

Identity.prototype['@@type'] = 'sanctuary/Identity';

Identity.prototype.equals = function(x) {
  return x != null && x['@@type'] === Identity.prototype['@@type'] &&
         R.equals(x.value, this.value);
};

Identity.prototype.map = function(f) {
  return Identity(f(this.value));
};

Identity.prototype.ap = function(other) {
  return Identity(this.value(other.value));
};

Identity.prototype.inspect =
Identity.prototype.toString = function() {
  return 'Identity(' + R.toString(this.value) + ')';
};

module.exports = Identity;
