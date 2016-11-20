'use strict';

var jsc = require('jsverify');
var R = require('ramda');

var S = require('../..');

var Identity = require('../internal/Identity');
var laws = require('../internal/laws');
var squareRoot = require('../internal/squareRoot');
var throws = require('../internal/throws');


//  IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
var IdentityArb = function(arb) {
  return arb.smap(Identity, function(i) { return i.value; });
};

//  identityToMaybe :: Identity a -> Maybe a
var identityToMaybe = function(i) {
  return S.Just(i.value);
};

//  EitherArb :: Arbitrary a -> Arbitrary b -> Arbitrary (Either a b)
var EitherArb = function(lArb, rArb) {
  return jsc.oneof(LeftArb(lArb), RightArb(rArb));
};

//  LeftArb :: Arbitrary a -> Arbitrary (Either a b)
var LeftArb = function(arb) {
  return arb.smap(S.Left, function(e) { return e.value; }, R.toString);
};

//  RightArb :: Arbitrary a -> Arbitrary (Either b a)
var RightArb = function(arb) {
  return arb.smap(S.Right, function(e) { return e.value; }, R.toString);
};

suite('Either', function() {

  test('throws if called', function() {
    throws(function() { S.Either(); }, Error, 'Cannot instantiate Either');
  });

  suite('Setoid laws', function() {

    laws.Setoid.reflexivity(
      EitherArb(jsc.string, jsc.falsy)
    );

    laws.Setoid.symmetry(
      EitherArb(jsc.bool, jsc.bool),
      EitherArb(jsc.bool, jsc.bool)
    );

    laws.Setoid.transitivity(
      EitherArb(jsc.bool, jsc.bool),
      EitherArb(jsc.bool, jsc.bool),
      EitherArb(jsc.bool, jsc.bool)
    );

  });

  suite('Semigroup laws', function() {

    laws.Semigroup.associativity(
      EitherArb(jsc.string, jsc.string),
      EitherArb(jsc.string, jsc.string),
      EitherArb(jsc.string, jsc.string)
    );

  });

  suite('Functor laws', function() {

    laws.Functor.identity(
      EitherArb(jsc.string, jsc.number)
    );

    laws.Functor.composition(
      EitherArb(jsc.string, jsc.number),
      jsc.constant(Math.sqrt),
      jsc.constant(Math.abs)
    );

  });

  suite('Apply laws', function() {

    laws.Apply.composition(
      EitherArb(jsc.string, jsc.constant(Math.sqrt)),
      EitherArb(jsc.string, jsc.constant(Math.abs)),
      EitherArb(jsc.string, jsc.number)
    );

  });

  suite('Applicative laws', function() {

    laws.Applicative.identity(
      jsc.constant(S.Either.of),
      EitherArb(jsc.string, jsc.number)
    );

    laws.Applicative.homomorphism(
      jsc.constant(S.Either.of),
      jsc.constant(Math.abs),
      jsc.number
    );

    laws.Applicative.interchange(
      jsc.constant(S.Either.of),
      EitherArb(jsc.string, jsc.constant(Math.abs)),
      jsc.number
    );

  });

  suite('Chain laws', function() {

    laws.Chain.associativity(
      EitherArb(jsc.string, jsc.array(jsc.number)),
      jsc.constant(function(xs) { return xs.length > 0 ? S.Right(xs[0]) : S.Left('Empty list'); }),
      jsc.constant(squareRoot)
    );

  });

  suite('Monad laws', function() {

    laws.Monad.leftIdentity(
      jsc.constant(S.Either),
      jsc.constant(squareRoot),
      jsc.number
    );

    laws.Monad.rightIdentity(
      jsc.constant(S.Either),
      EitherArb(jsc.string, jsc.number)
    );

  });

  suite('Foldable laws', function() {

    laws.Foldable.associativity(
      jsc.constant(function(x, y) { return x + y; }),
      jsc.number,
      EitherArb(jsc.string, jsc.number)
    );

  });

  suite('Traversable laws', function() {

    laws.Traversable.naturality(
      jsc.constant(identityToMaybe),
      EitherArb(jsc.string, IdentityArb(jsc.number)),
      jsc.constant(Identity),
      jsc.constant(S.Maybe)
    );

    laws.Traversable.identity(
      EitherArb(jsc.string, jsc.number)
    );

    laws.Traversable.composition(
      EitherArb(jsc.string, IdentityArb(EitherArb(jsc.string, jsc.number))),
      jsc.constant(Identity),
      jsc.constant(S.Either)
    );

  });

  suite('Extend laws', function() {

    laws.Extend.associativity(
      EitherArb(jsc.string, jsc.integer),
      jsc.constant(function(either) { return either.value + 1; }),
      jsc.constant(function(either) { return either.value * either.value; })
    );

  });

});
