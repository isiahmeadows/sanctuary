'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('of', function() {

  eq(typeof S.of, 'function');
  eq(S.of.length, 2);
  eq(S.of.toString(), 'of :: Applicative f => TypeRep f -> a -> f a');

});
