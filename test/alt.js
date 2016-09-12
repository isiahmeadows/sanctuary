'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('alt', function() {

  eq(typeof S.alt, 'function');
  eq(S.alt.length, 2);
  eq(S.alt.toString(), 'alt :: Alt f => f a -> f a -> f a');

});
