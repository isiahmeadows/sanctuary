'use strict';

var throws = require('assert').throws;

var S = require('..');

var eq = require('./internal/eq');
var errorEq = require('./internal/errorEq');
var factorial = require('./internal/factorial');


test('encaseEither', function() {

  eq(typeof S.encaseEither, 'function');
  eq(S.encaseEither.length, 3);

  throws(function() { S.encaseEither(null); },
         errorEq(TypeError,
                 'Invalid value\n' +
                 '\n' +
                 'encaseEither :: Function -> Function -> a -> Either l r\n' +
                 '                ^^^^^^^^\n' +
                 '                   1\n' +
                 '\n' +
                 '1)  null :: Null\n' +
                 '\n' +
                 'The value at position 1 is not a member of ‘Function’.\n'));

  throws(function() { S.encaseEither(S.I, null); },
         errorEq(TypeError,
                 'Invalid value\n' +
                 '\n' +
                 'encaseEither :: Function -> Function -> a -> Either l r\n' +
                 '                            ^^^^^^^^\n' +
                 '                               1\n' +
                 '\n' +
                 '1)  null :: Null\n' +
                 '\n' +
                 'The value at position 1 is not a member of ‘Function’.\n'));

  eq(S.encaseEither(S.I, factorial, 5), S.Right(120));
  eq(S.encaseEither(S.I, factorial, -1), S.Left(new Error('Cannot determine factorial of negative number')));
  eq(S.encaseEither(S.prop('message'), factorial, -1), S.Left('Cannot determine factorial of negative number'));

});
