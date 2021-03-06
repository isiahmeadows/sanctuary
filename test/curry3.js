'use strict';

var S = require('..');

var eq = require('./internal/eq');


test('curry3', function() {

  eq(typeof S.curry3, 'function');
  eq(S.curry3.length, 4);

  var curried = S.curry3(function(x, y, z) { return x + y + z; });
  eq(curried(1, 2, 3), 6);
  eq(curried(1, 2)(3), 6);
  eq(curried(1)(2, 3), 6);
  eq(curried(1)(2)(3), 6);

});
