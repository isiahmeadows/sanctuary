'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('ap', function() {

  eq(typeof S.ap, 'function');
  eq(S.ap.length, 2);
  eq(S.ap.toString(), 'ap :: Apply f => f (a -> b) -> f a -> f b');

});
