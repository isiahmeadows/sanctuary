'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('empty', function() {

  eq(typeof S.empty, 'function');
  eq(S.empty.length, 1);
  eq(S.empty.toString(), 'empty :: Monoid a => TypeRep a -> a');

});
