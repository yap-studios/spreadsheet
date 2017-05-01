import {
  ARABIC,
  CHAR,
  CODE,
  CONCATENATE,
  SPLIT,
  CONVERT
} from "../../src/Formulas/Text";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  assertArrayEquals,
  catchAndAssertEquals,
  test
} from "../utils/Asserts";


test("SPLIT", function(){
  assertArrayEquals(SPLIT("1,2,3", ","), ['1', '2', '3']);
  assertArrayEquals(SPLIT("little kitty cat", "i"), ['l', 'ttle k', 'tty cat']);
  assertArrayEquals(SPLIT("father sister berzerker", "er", true), ['fath', ' sist', ' b', 'z', 'k']);
  assertArrayEquals(SPLIT("father sister berzerker", "er", [true]), ['fath', ' sist', ' b', 'z', 'k']);
  assertArrayEquals(SPLIT("father  sister   berzerker", "er", true), ['fath', '  sist', '   b', 'z', 'k']);
  assertArrayEquals(SPLIT(["father sister berzerker"], ["er"], true), ['fath', ' sist', ' b', 'z', 'k']);
  catchAndAssertEquals(function() {
    SPLIT([], "er");
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    SPLIT("er", "er", true, 10);
  }, ERRORS.NA_ERROR);
});


test("CHAR", function(){
  assertEquals(CHAR(97), "a");
  assertEquals(CHAR("97"), "a");
  assertEquals(CHAR([97, "m"]), "a");
  assertEquals(CHAR([[97], "m"]), "a");
  catchAndAssertEquals(function() {
    CHAR([[], [97], "m"]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    CHAR(false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHAR(10000000);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHAR(0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHAR();
  }, ERRORS.NA_ERROR);
});


test("CODE", function(){
  assertEquals(CODE('a'), 97);
  assertEquals(CODE('aa'), 97);
  assertEquals(CODE('aM'), 97);
  assertEquals(CODE('#'), 35);
  assertEquals(CODE(false), 70);
  assertEquals(CODE(true), 84);
  catchAndAssertEquals(function() {
    CODE();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CODE("a", "m");
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CODE("");
  }, ERRORS.VALUE_ERROR);
  assertEquals(CODE(['a']), 97);
  assertEquals(CODE([['a'], 'p']), 97);
});


test("CONCATENATE", function(){
  assertEquals(CONCATENATE("hey", " ", "there"), "hey there");
  assertEquals(CONCATENATE(["hey", " ", "there"]), "hey there");
  assertEquals(CONCATENATE("hey"), "hey");
  assertEquals(CONCATENATE("hey", 2), "hey2");
  assertEquals(CONCATENATE("hey", false), "heyFALSE");
  assertEquals(CONCATENATE([22, 14, "m", false]), "2214mFALSE");
  assertEquals(CONCATENATE([22, 14, ["m", false]]), "2214mFALSE");
  catchAndAssertEquals(function() {
    CONCATENATE();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CONCATENATE("10", 4, false, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    CONCATENATE([]);
  }, ERRORS.REF_ERROR);
});


// TODO: More tests for CONVERT.
test("CONVERT", function(){
  assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);
  assertEquals(CONVERT(5.1, "mm", "km"), 0.0000050999999999999995);
  assertEquals(CONVERT(5.1, "g", "kg"), 0.0050999999999999995);
  assertEquals(CONVERT(35.7, "in^2", "m^2"), 0.023032212);
});


test("ARABIC", function(){
  assertEquals(ARABIC("XIV"), 14);
  assertEquals(ARABIC("M"), 1000);
  assertEquals(ARABIC("-IV"), -4);
  catchAndAssertEquals(function() {
    ARABIC("b");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ARABIC(false);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ARABIC(10);
  }, ERRORS.VALUE_ERROR);
});