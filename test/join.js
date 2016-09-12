'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('join', function() {

  eq(typeof S.join, 'function');
  eq(S.join.length, 1);
  eq(S.join.toString(), 'join :: Chain m => m (m a) -> m a');

  eq(S.join(S.Just(S.Just(1))), S.Just(1));
  eq(S.join(S.Just(S.Just(S.Just(1)))), S.Just(S.Just(1)));

});
