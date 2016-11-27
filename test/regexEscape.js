'use strict';

var jsc = require('jsverify');

var S = require('..');

var eq = require('./internal/eq');
var throws = require('./internal/throws');


test('regexEscape', function() {

  eq(typeof S.regexEscape, 'function');
  eq(S.regexEscape.length, 1);

  throws(function() { S.regexEscape(/(?:)/); },
         TypeError,
         'Invalid value\n' +
         '\n' +
         'regexEscape :: String -> String\n' +
         '               ^^^^^^\n' +
         '                 1\n' +
         '\n' +
         '1)  /(?:)/ :: RegExp, NonGlobalRegExp\n' +
         '\n' +
         'The value at position 1 is not a member of ‘String’.\n');

  eq(S.regexEscape('-=*{XYZ}*=-'), '\\-=\\*\\{XYZ\\}\\*=\\-');

  jsc.assert(jsc.forall(jsc.string, function(s) {
    return S.test(S.regex('', S.regexEscape(s)), s);
  }), {tests: 1000});

  jsc.assert(jsc.forall(jsc.string, function(s) {
    return S.test(S.regex('', '^' + S.regexEscape(s) + '$'), s);
  }), {tests: 1000});

});
