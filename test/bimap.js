'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('bimap', function() {

  eq(typeof S.bimap, 'function');
  eq(S.bimap.length, 3);
  eq(S.bimap.toString(), 'bimap :: Bifunctor p => (a -> b) -> (c -> d) -> p a c -> p b d');

});
