'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('filterM', function() {

  eq(typeof S.filterM, 'function');
  eq(S.filterM.length, 2);
  eq(S.filterM.toString(), 'filterM :: (Monad m, Monoid m) => (a -> Boolean) -> m a -> m a');

});
