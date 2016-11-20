'use strict';

var jsc = require('jsverify');
var R = require('ramda');

var S = require('../..');

var Identity = require('../internal/Identity');
var laws = require('../internal/laws');
var throws = require('../internal/throws');


//  IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
var IdentityArb = function(arb) {
  return arb.smap(Identity, function(i) { return i.value; });
};

//  MaybeArb :: Arbitrary a -> Arbitrary (Maybe a)
var MaybeArb = function(arb) {
  return jsc.oneof(JustArb(arb), jsc.constant(S.Nothing));
};

//  JustArb :: Arbitrary a -> Arbitrary (Maybe a)
var JustArb = function(arb) {
  return arb.smap(S.Just, function(m) { return m.value; }, R.toString);
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

suite('Maybe', function() {

  test('throws if called', function() {
    throws(function() { S.Maybe(); }, Error, 'Cannot instantiate Maybe');
  });

  suite('Setoid laws', function() {

    laws.Setoid.reflexivity(
      MaybeArb(jsc.falsy)
    );

    laws.Setoid.symmetry(
      MaybeArb(jsc.bool),
      MaybeArb(jsc.bool)
    );

    laws.Setoid.transitivity(
      MaybeArb(jsc.bool),
      MaybeArb(jsc.bool),
      MaybeArb(jsc.bool)
    );

  });

  suite('Semigroup laws', function() {

    laws.Semigroup.associativity(
      MaybeArb(jsc.string),
      MaybeArb(jsc.string),
      MaybeArb(jsc.string)
    );

  });

  suite('Monoid laws', function() {

    laws.Monoid.leftIdentity(
      MaybeArb(jsc.string)
    );

    laws.Monoid.rightIdentity(
      MaybeArb(jsc.string)
    );

  });

  suite('Functor laws', function() {

    laws.Functor.identity(
      MaybeArb(jsc.number)
    );

    laws.Functor.composition(
      MaybeArb(jsc.number),
      jsc.constant(Math.sqrt),
      jsc.constant(Math.abs)
    );

  });

  suite('Apply laws', function() {

    laws.Apply.composition(
      MaybeArb(jsc.constant(Math.sqrt)),
      MaybeArb(jsc.constant(Math.abs)),
      MaybeArb(jsc.number)
    );

  });

  suite('Applicative laws', function() {

    laws.Applicative.identity(
      jsc.constant(S.Maybe.of),
      MaybeArb(jsc.number)
    );

    laws.Applicative.homomorphism(
      jsc.constant(S.Maybe.of),
      jsc.constant(Math.abs),
      jsc.number
    );

    laws.Applicative.interchange(
      jsc.constant(S.Maybe.of),
      MaybeArb(jsc.constant(Math.abs)),
      jsc.number
    );

  });

  suite('Chain laws', function() {

    laws.Chain.associativity(
      MaybeArb(jsc.array(jsc.asciistring)),
      jsc.constant(S.head),
      jsc.constant(S.parseInt(36))
    );

  });

  suite('Monad laws', function() {

    laws.Monad.leftIdentity(
      jsc.constant(S.Maybe),
      jsc.constant(S.head),
      jsc.string
    );

    laws.Monad.rightIdentity(
      jsc.constant(S.Maybe),
      MaybeArb(jsc.number)
    );

  });

  suite('Foldable laws', function() {

    laws.Foldable.associativity(
      jsc.constant(function(x, y) { return x + y; }),
      jsc.number,
      MaybeArb(jsc.number)
    );

  });

  suite('Traversable laws', function() {

    laws.Traversable.naturality(
      jsc.constant(S.eitherToMaybe),
      MaybeArb(EitherArb(jsc.string, jsc.number)),
      jsc.constant(S.Either),
      jsc.constant(S.Maybe)
    );

    laws.Traversable.identity(
      MaybeArb(jsc.number)
    );

    laws.Traversable.composition(
      MaybeArb(IdentityArb(MaybeArb(jsc.number))),
      jsc.constant(Identity),
      jsc.constant(S.Maybe)
    );

  });

  suite('Extend laws', function() {

    laws.Extend.associativity(
      MaybeArb(jsc.integer),
      jsc.constant(function(maybe) { return maybe.value + 1; }),
      jsc.constant(function(maybe) { return maybe.value * maybe.value; })
    );

  });

});
