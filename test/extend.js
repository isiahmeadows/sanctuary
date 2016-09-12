'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('extend', function() {

  eq(typeof S.extend, 'function');
  eq(S.extend.length, 2);
  eq(S.extend.toString(), 'extend :: Extend w => (w a -> a) -> w a -> w a');

});
