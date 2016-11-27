'use strict';

var S = require('..');

var eq = require('./internal/eq');
var throws = require('./internal/throws');


test('trim', function() {

  eq(typeof S.trim, 'function');
  eq(S.trim.length, 1);

  throws(function() { S.trim(/XXX/); },
         TypeError,
         'Invalid value\n' +
         '\n' +
         'trim :: String -> String\n' +
         '        ^^^^^^\n' +
         '          1\n' +
         '\n' +
         '1)  /XXX/ :: RegExp, NonGlobalRegExp\n' +
         '\n' +
         'The value at position 1 is not a member of ‘String’.\n');

  eq(S.trim(''), '');
  eq(S.trim(' '), '');
  eq(S.trim('x'), 'x');
  eq(S.trim(' x'), 'x');
  eq(S.trim('x '), 'x');
  eq(S.trim(' x '), 'x');
  eq(S.trim('\n\r\t x \n\r\t x \n\r\t'), 'x \n\r\t x');

});
