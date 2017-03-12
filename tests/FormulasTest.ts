import { ABS, ACCRINT, ACOS, ACOSH, ACOTH, AND, ARABIC, ASIN, ASINH, ATAN, ATAN2, ATANH, AVEDEV, AVERAGE,
    AVERAGEA, AVERAGEIF, BIN2DEC, BIN2HEX, BIN2OCT, CEILING,
    CHAR, CODE, COMBIN, CONCATENATE, CONVERT, PEARSON,
    CORREL, COS, PI, COSH, COT, COTH, COUNT, COUNTA, COUNTIF, COUNTIFS, COUNTUNIQUE,
    CUMIPMT, CUMPRINC, DATE, DATEVALUE, DAY, DAYS, DAYS360,
    DB, DDB, DEC2BIN, DEC2HEX, DEC2OCT, DEGREES, DELTA, DEVSQ, DOLLAR, DOLLARDE, DOLLARFR, EDATE,
    EFFECT, EOMONTH, ERF, ERFC, EVEN, EXACT, EXPONDIST, FINV, FALSE, FLOOR, __COMPLEX, FISHER, FISHERINV, IF,
    INT, ISEVEN, ISODD, LN, LOG, LOG10, MAX, MAXA, MEDIAN, MIN, MINA, MOD, NOT, TRUE, ODD, OR,
    POWER, ROUND, ROUNDDOWN, ROUNDUP, SIN, SINH, SPLIT, SQRT, SQRTPI, SUM, SUMIF, SUMPRODUCT, RADIANS,
    SUMSQ, SUMX2MY2, SUMX2PY2, TAN, TANH, TRUNC, XOR, YEARFRAC } from "../src/RawFormulas/RawFormulas"
import * as ERRORS from "../src/Errors"
import {assertEquals, assertEqualsDates, assertArrayEquals} from "./utils/Asserts"

function catchAndAssertEquals(toExecute, expected) {
  var toThrow = null;
  try {
    toExecute();
    toThrow = true;
  } catch (actualError) {
    if (actualError.message != expected) {
      console.log(expected, "not equal to", actualError.message);
    }
  }
  if (toThrow) {
    throw new Error("expected error: " + expected);
  }
}

// Test ABS
assertEquals(ABS(-10), 10);
assertEquals(ABS(-10.111), 10.111);
assertEquals(ABS(0), 0);
assertEquals(ABS(false), 0);
assertEquals(ABS("-44"), 44);
catchAndAssertEquals(function() {
  ABS();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ABS("str");
}, ERRORS.VALUE_ERROR);


// Test ACCRINT
// TODO: This formula doesn't work properly under some circumstances.
// assertEquals(ACCRINT(DATE(2011, 1, 1), DATE(2011, 2, 1), DATE(2014, 7, 1), 0.1, 1000, 1, 0), 350);


// Test ACOS
assertEquals(ACOS(0), 1.5707963267948966);
assertEquals(ACOS(-1), 3.141592653589793);
assertEquals(ACOS(1), 0);
assertEquals(ACOS("-1"), 3.141592653589793);
assertEquals(ACOS(false), 1.5707963267948966);
catchAndAssertEquals(function() {
  ACOS("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ACOS(2);
}, ERRORS.NUM_ERROR);


// Test ACOSH
assertEquals(ACOSH(22), 3.783672704329451);
assertEquals(ACOSH(1), 0);
assertEquals(ACOSH("11"), 3.0889699048446033);
catchAndAssertEquals(function() {
  ACOSH(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ACOSH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ACOSH(false);
}, ERRORS.NUM_ERROR);


// Test ACOTH
assertEquals(ACOTH(22), 0.04548588910286339);
assertEquals(ACOTH(-1.1), -1.522261218861711);
assertEquals(ACOTH("-22"), -0.04548588910286338);
catchAndAssertEquals(function() {
  ACOTH(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ACOTH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ACOTH(false);
}, ERRORS.NUM_ERROR);


// Test AND
assertEquals(AND(10, 10), true);
assertEquals(AND(10, 0), false);
assertEquals(AND(10, false), false);
assertEquals(AND(0, 0), false);
catchAndAssertEquals(function() {
  AND(1, "");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  AND();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AND(1, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AND(0, [1, 1]), false);
assertEquals(AND(1, [1, 1]), true);
catchAndAssertEquals(function() {
  AND(1, [1, "str"]);
}, ERRORS.VALUE_ERROR);


// Test ARABIC
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


// Test ASIN
assertEquals(ASIN(0), 0);
assertEquals(ASIN(1), 1.5707963267948966);
assertEquals(ASIN("1"), 1.5707963267948966);
assertEquals(ASIN(false), 0);
catchAndAssertEquals(function() {
  ASIN(2);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ASIN("str");
}, ERRORS.VALUE_ERROR);


// Test ASINH
assertEquals(ASINH(1), 0.8813735870195429);
assertEquals(ASINH(0), 0);
assertEquals(ASINH("1"), 0.8813735870195429);
assertEquals(ASINH(false), 0);
assertEquals(ASINH(true), 0.8813735870195429);
catchAndAssertEquals(function() {
  ASINH("str");
}, ERRORS.VALUE_ERROR);


// Test ATAN
assertEquals(ATAN(1), 0.7853981633974483);
assertEquals(ATAN(0), 0);
assertEquals(ATAN("1"), 0.7853981633974483);
assertEquals(ATAN(false), 0);
assertEquals(ATAN(true), 0.7853981633974483);
catchAndAssertEquals(function() {
  ASINH("str");
}, ERRORS.VALUE_ERROR);

// Test ATAN2
assertEquals(ATAN2(4, 3), 0.6435011087932844);
assertEquals(ATAN2(-1, -1), -2.356194490192345);
catchAndAssertEquals(function() {
  ATAN2(0, 0);
}, ERRORS.DIV_ZERO_ERROR);
assertEquals(ATAN2(1, 0), 0);
assertEquals(ATAN2(0, 1), 1.5707963267948966);
assertEquals(ATAN2(-1, "-1"), -2.356194490192345);
assertEquals(ATAN2(true, false), 0);
assertEquals(ATAN2(true, true), 0.7853981633974483);
catchAndAssertEquals(function() {
  ATAN2("str", false);
}, ERRORS.VALUE_ERROR);


// Test ATANH
assertEquals(ATANH(0.51), 0.5627297693521489);
assertEquals(ATANH(0.44), 0.47223080442042564);
assertEquals(ATANH(0), 0);
assertEquals(ATANH("0.1"), 0.10033534773107562);
assertEquals(ATANH(false), 0);
catchAndAssertEquals(function() {
  ATANH(true);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ATANH("str");
}, ERRORS.VALUE_ERROR);


// Test AVEDEV
assertEquals(AVEDEV(1, 2, 4, 55), 19.75);
assertEquals(AVEDEV(1, 2, 4, "55"), 19.75);
assertEquals(AVEDEV([1, 2, 4, "55"]), 1.1111111111111112);
assertEquals(AVEDEV([1, 2, 4, "55"], [10, 10, "str"]), 3.6799999999999997);
assertEquals(AVEDEV([1, 2, 4, "55"], [10, 10]), 3.6799999999999997);
assertEquals(AVEDEV(1, 2, 4, "55", [10, [10]]), 13.777777777777777);
assertEquals(AVEDEV(1, 2, 4, "55", 10, 10), 13.77777777777778);
assertEquals(AVEDEV(1, 2, 4, 55, false), 17.040000000000003);
assertEquals(AVEDEV(1, 2, 4, 55, 0), 17.040000000000003);
assertEquals(AVEDEV(1, 2, 4, 55, true), 16.959999999999997);
assertEquals(AVEDEV(1, 2, 4, 55, 1), 16.959999999999997);
assertEquals(AVEDEV([1, 2, 4, 55, 0]), 17.040000000000003);
assertEquals(AVEDEV([1, 2, 4, 55], 0), 17.040000000000003);
catchAndAssertEquals(function() {
  AVEDEV();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVEDEV(10, 10, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  AVEDEV(10, 10, []);
}, ERRORS.REF_ERROR);


// Test AVERAGE
assertEquals(AVERAGE(1, 2, 4, 55), 15.5);
assertEquals(AVERAGE(1, 2, 4, "55"), 15.5);
assertEquals(AVERAGE(1, 2, 4, 55, false), 12.4);
assertEquals(AVERAGE(1, 2, 4, 55, true), 12.6);
assertEquals(AVERAGE(1, 2, 4, 55, 0), 12.4);
assertEquals(AVERAGE(1, 2, 4, 55, 1), 12.6);
catchAndAssertEquals(function() {
  AVERAGE(1, 2, 4, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AVERAGE([1, 2, 4, 55, "str"]), 15.5);
assertEquals(AVERAGE([1, 2, 4, 55, "22"]), 15.5);
assertEquals(AVERAGE([0]), 0);
catchAndAssertEquals(function() {
  AVERAGE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVERAGE([]);
}, ERRORS.REF_ERROR);


// Test AVERAGEA
assertEquals(AVERAGEA(1, 2, 4, 55), 15.5);
assertEquals(AVERAGEA(1, 2, 4, "55"), 15.5);
assertEquals(AVERAGEA(1, 2, 4, 55, false), 12.4);
assertEquals(AVERAGEA(1, 2, 4, 55, true), 12.6);
assertEquals(AVERAGEA(1, 2, 4, 55, 0), 12.4);
assertEquals(AVERAGEA(1, 2, 4, 55, 1), 12.6);
catchAndAssertEquals(function() {
  AVERAGEA(1, 2, 4, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AVERAGEA([1, 2, 4, 55, "str"]), 12.4);
assertEquals(AVERAGEA([1, 2, 4, 55, "22"]), 12.4);
assertEquals(AVERAGEA([1, 2, 4, 55, 0]), 12.4);
assertEquals(AVERAGEA([0]), 0);
catchAndAssertEquals(function() {
  AVERAGEA();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVERAGEA([]);
}, ERRORS.REF_ERROR);


// Test AVERAGEIF
assertEquals(AVERAGEIF([1, 5, 10], '>2'), 7.5);
assertEquals(AVERAGEIF([1, 5, 10], ">4"), 7.5);
assertEquals(AVERAGEIF([1, 2, 2, 2, 2, 2, 2, 2], ">1"), 2);
assertEquals(AVERAGEIF([1, 5, 10], 5), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], 5), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], 10), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">5"), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=5"), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=10"), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=     10  "), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">0"), 5.166666666666667);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">=5"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<10"), 4.2);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5, 44], "<=10"), 5.166666666666667);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">4.99"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<4.99"), 1);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "=     1.0.0  ");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "=>5");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "==5");
}, ERRORS.DIV_ZERO_ERROR);


// Test BIN2DEC
assertEquals(BIN2DEC("1010101010"), -342);
assertEquals(BIN2DEC("10"), 2);
assertEquals(BIN2DEC(["10", "str"]), 2);
catchAndAssertEquals(function() {
  BIN2DEC(false);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  BIN2DEC("str");
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  BIN2DEC();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  BIN2DEC("10", "10");
}, ERRORS.NA_ERROR);


// Test BIN2HEX
assertEquals(BIN2HEX("1010101010"), "FFFFFFFEAA");
assertEquals(BIN2HEX("10"), "2");
assertEquals(BIN2HEX("10101010"), "AA");
assertEquals(BIN2HEX("10101010", 4), "00AA");
assertEquals(BIN2HEX(["10101010"], [4]), "00AA");
catchAndAssertEquals(function() {
  BIN2HEX("10101010", 22);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  BIN2HEX(false);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  BIN2HEX("10101010", 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  BIN2DEC("str");
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  BIN2DEC();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  BIN2DEC("10", 4, 4);
}, ERRORS.NA_ERROR);


// Test BIN2OCT
assertEquals(BIN2OCT("1010101010"), "7777777252");
assertEquals(BIN2OCT("10"), "2");
assertEquals(BIN2OCT("100"), "4");
assertEquals(BIN2OCT("10101010"), "252");
assertEquals(BIN2OCT("10101010", 4), "252");
assertEquals(BIN2OCT(["10101010"], [4]), "252");
catchAndAssertEquals(function() {
  BIN2OCT("10101010", 22);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  BIN2OCT(false);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  BIN2OCT("10101010", 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  BIN2OCT("str");
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  BIN2OCT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  BIN2OCT("10", 4, 4);
}, ERRORS.NA_ERROR);


// Test CEILING
assertEquals(CEILING(10.1), 11);
assertEquals(CEILING("10.1"), 11);
assertEquals(CEILING(10.11111111, 0.1), 10.2);
assertEquals(CEILING(10.22222222, 0.1), 10.3);
assertEquals(CEILING(10.33333333, 0.2), 10.4);
assertEquals(CEILING(10.33333333, 0.1), 10.4);
assertEquals(CEILING([10.33333333], 0.1), 10.4);
assertEquals(CEILING(10.22222222, 5), 15);
assertEquals(CEILING(10.22222222, 8), 16);
assertEquals(CEILING(10.22222222, true), 11);
catchAndAssertEquals(function() {
  CEILING(10, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CEILING(10, 1, 2);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CEILING();
}, ERRORS.NA_ERROR);

// Test CHAR
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


// Test CODE
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


// Test COMBIN
assertEquals(COMBIN(4, 2), 6);
assertEquals(COMBIN(4.999, 2.888), 6);
assertEquals(COMBIN([4, "str"], [2]), 6);
assertEquals(COMBIN(0, 0), 1);
catchAndAssertEquals(function() {
  COMBIN(2, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COMBIN(2, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  COMBIN(2, 4);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  COMBIN(0, 1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  COMBIN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COMBIN(4);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COMBIN(4, 2, 66);
}, ERRORS.NA_ERROR);



// Test CONCATENATE
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

assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);


// Test CORREL
assertEquals(CORREL([9, 5],[10, 4]), 1);
assertEquals(CORREL([10, 5, 16],[9, 3, 22]), 0.9876779373054069);
catchAndAssertEquals(function() {
  CORREL(5, 5);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, true], [5, true]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, "10"], [5, "10"]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9], [5]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, 5]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, 5],[10]);
}, ERRORS.NA_ERROR);


// Test PEARSON (same as CORREL)
assertEquals(PEARSON([9, 5],[10, 4]), 1);


// Test COS
assertEquals(COS(PI()), -1);
assertEquals(COS(1), 0.5403023058681398);
assertEquals(COS(false), 1);
assertEquals(COS(true), 0.5403023058681398);
assertEquals(COS(""), 1);
assertEquals(COS("0"), 1);
catchAndAssertEquals(function() {
  COS("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COS();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COS(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(COS([0, "str"]), 1);


// Test COSH
assertEquals(COSH(PI()), 11.591953275521522);
assertEquals(COSH(1), 1.5430806348152437);
assertEquals(COSH(false), 1);
assertEquals(COSH(0), 1);
assertEquals(COSH(true), 1.5430806348152437);
assertEquals(COSH(""), 1);
catchAndAssertEquals(function() {
  COSH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COSH();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COSH(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(COSH([0, "str"]), 1);


// Test COT
assertEquals(COT(30), -0.15611995216165922);
assertEquals(COT(1), 0.6420926159343306);
assertEquals(COT(true), 0.6420926159343306);
assertEquals(COT([1, "str"]), 0.6420926159343306);
catchAndAssertEquals(function() {
  COT(false);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COT(0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COT("");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COT("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COT(1, 1);
}, ERRORS.NA_ERROR);


// Test COTH
assertEquals(COTH(30), 1);
assertEquals(COTH(1), 1.3130352854993315);
assertEquals(COTH(true), 1.3130352854993315);
assertEquals(COTH([1, "str"]), 1.3130352854993315);
assertEquals(COTH(-1), -1.3130352854993315);
catchAndAssertEquals(function() {
  COTH(false);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COTH(0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COTH("");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COTH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COTH();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COTH(1, 1);
}, ERRORS.NA_ERROR);


// Test COUNT
assertEquals(COUNT([1, 5, 10, 0]), 4);
assertEquals(COUNT(1, 5, 10, 0), 4);
assertEquals(COUNT(1, 5, 10, "0"), 4);
assertEquals(COUNT(1, 5, 10, ["0", "str"]), 4);
assertEquals(COUNT(1, 5, 10, false), 4);
assertEquals(COUNT(1, 5, 10, true), 4);
assertEquals(COUNT([]), 0);
assertEquals(COUNT(["str"]), 0);
catchAndAssertEquals(function() {
  COUNT();
}, ERRORS.NA_ERROR);


// Test COUNTA
assertEquals(COUNTA(1, 2, 3), 3);
assertEquals(COUNTA(0, 1, 2, 3), 4);
assertEquals(COUNTA(0, 1, 2, 3, [], []), 6);
assertEquals(COUNTA(0, 1, 2, 3, [], ""), 6);
assertEquals(COUNTA(1, 2, "3"), 3);
assertEquals(COUNTA(1, 2, "3", ["str"]), 4);
assertEquals(COUNTA(1, 2, false), 3);
assertEquals(COUNTA(1, 2, true), 3);
assertEquals(COUNTA([]), 1);
catchAndAssertEquals(function() {
  COUNTA();
}, ERRORS.NA_ERROR);


// Test COUNTIF
assertEquals(COUNTIF([1, 5, 10], ">4"), 2);
assertEquals(COUNTIF([1, 2, 2, 2, 2, 2, 2, 2], ">1"), 7);
assertEquals(COUNTIF([1, 5, 10], 5), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], 5), 4);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], 10), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">5"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=5"), 4);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=10"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=     10  "), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">0"), 6);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">=5"), 5);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "<10"), 5);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5, 44], "<=10"), 6);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">4.99"), 5);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "<4.99"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=     1.0.0  "), 0);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=>5"), 0);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "==5"), 0);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "boom"], "*o*"), 3);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "mom"), 2);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "?o?"), 3);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "???"), 5);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "????"), 0);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "?"), 0);
catchAndAssertEquals(function() {
  COUNTIF([0, 1, 0, 1]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COUNTIF();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COUNTIF([], "=1", []);
}, ERRORS.NA_ERROR);


// Test COUNTIFS
// All COUNTIF tests should also work on COUNTIFS
assertEquals(COUNTIFS([1, 5, 10], ">4"), 2);
assertEquals(COUNTIFS([1, 2, 2, 2, 2, 2, 2, 2], ">1"), 7);
assertEquals(COUNTIFS([1, 5, 10], 5), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], 5), 4);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], 10), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">5"), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=5"), 4);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=10"), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=     10  "), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">0"), 6);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">=5"), 5);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "<10"), 5);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5, 44], "<=10"), 6);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">4.99"), 5);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "<4.99"), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=     1.0.0  "), 0);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=>5"), 0);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "==5"), 0);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "boom"], "*o*"), 3);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "mom"), 2);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "?o?"), 3);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "???"), 5);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "????"), 0);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "?"), 0);
// Now actually test COUNTIFS
assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1"), 2);
assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1"), 2);
assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1", [0, 0, 1, 1], "=1"), 2);
assertEquals(COUNTIFS([1, 5, 10, 20, 40], ">4", [0, 0, 1, 1, 1], "=1", [0, 0, 0, 0, 0], "=1"), 0);
assertEquals(COUNTIFS([1, 2, 3, 4], ">3", [true, true, false, true], true), 1);
catchAndAssertEquals(function() {
  COUNTIFS([1, 5, 10, 20], ">4", [0, 0], "=1");
}, ERRORS.VALUE_ERROR);


// Test COUNTUNIQUE
assertEquals(COUNTUNIQUE([1, 1, 10]), 2);
assertEquals(COUNTUNIQUE(["1", 1, 10]), 3);
assertEquals(COUNTUNIQUE(["1", 1, 10, ""]), 4);
assertEquals(COUNTUNIQUE(["1", 1, 10, "", ""]), 4);
assertEquals(COUNTUNIQUE(["1", 1, 10, "", " "]), 5);
assertEquals(COUNTUNIQUE(["1", 1, 10, []]), 4);
assertEquals(COUNTUNIQUE(["", " ", [""], []]), 2);
assertEquals(COUNTUNIQUE([[""], []]), 1);
catchAndAssertEquals(function() {
  COUNTUNIQUE();
}, ERRORS.NA_ERROR);


// Test CUMIPMT
assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, 0), -54.39423242396348);
assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, false), -54.39423242396348);
assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, true), -37.851993235681675);
assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, 1), -37.851993235681675);
assertEquals(CUMIPMT(0.12, 12, 100, 2, 6, 1), -45.74583201714228);
assertEquals(CUMIPMT(0.12, 12, 100, 2, 6, true), -45.74583201714228);
assertEquals(CUMIPMT([0.12], ["12"], [100, "str"], "1", 5, 0), -54.39423242396348);
catchAndAssertEquals(function() {
  CUMIPMT(0.12, 12, 100, 1, 5, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  CUMIPMT(0.12, 12, 100, 0, 5, false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CUMIPMT(0.12, 12, 100, 3, 1, false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CUMIPMT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CUMIPMT(0.12, 12, 100, 1, 5, true, 55);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CUMIPMT(0.12, 12, 100, 1, 5);
}, ERRORS.NA_ERROR);


// Test CUMPRINC
assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, false), -26.324171373034403);
assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, 0), -26.324171373034403);
assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, true), -34.21801015449499);
assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, -11), -34.21801015449499);
catchAndAssertEquals(function() {
  CUMPRINC(0.12, 12, 100, 1, 5, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  CUMPRINC(0.12, 12, 100, 0, 5, false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CUMPRINC(0.12, 12, 100, 3, 1, false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CUMPRINC();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CUMPRINC(0.12, 12, 100, 1, 5, true, 55);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CUMPRINC(0.12, 12, 100, 1, 5);
}, ERRORS.NA_ERROR);


// Test DATE
assertEquals(DATE(1900, 1, 1).toNumber(), 2);
assertEquals(DATE(1900, 1, 2).toNumber(), 3);
assertEquals(DATE(1900, 1, 4).toNumber(), 5);
catchAndAssertEquals(function() {
  DATE(1900, 0, 4);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DATE(1900, 0, 5);
}, ERRORS.NUM_ERROR);
assertEquals(DATE(1992, 6, 24).toNumber(), 33779);
assertEquals(DATE(2017, 2, 26).toNumber(), 42792);
// Leap day stuff
assertEquals(DATE(2004, 2, 28).toNumber(), 38045);
assertEquals(DATE(2004, 2, 29).toNumber(), 38046);
assertEquals(DATE(2004, 3, 1).toNumber(), 38047);
// Overflow values
assertEquals(DATE(1992, 6, 44).toNumber(), 33799);
assertEquals(DATE(2, 33, 44).toNumber(), 1749);
assertEquals(DATE(1777, 33, 44).toNumber(), 650055);
assertEquals(DATE(1976, 2, -10).toNumber(), 27780);
assertEquals(DATE(-1900, 1, 1).toNumber(), 2);



// Test DATEVALUE
// MM/DD/YYYY
assertEquals(DATEVALUE("6/24/92"), 33779);
assertEquals(DATEVALUE("6/24/1992"), 33779);
assertEquals(DATEVALUE("06/24/1992"), 33779);
assertEquals(DATEVALUE("1/01/1999"), 36161);
assertEquals(DATEVALUE("1/01/99"), 36161);
assertEquals(DATEVALUE("1/01/2222"), 117610);
assertEquals(DATEVALUE("9/02/1902"), 976);
assertEquals(DATEVALUE("9/2/1902"), 976);
assertEquals(DATEVALUE("11/3/4243"), 856071);
assertEquals(DATEVALUE("  04/19/1992  "), 33713);
assertEquals(DATEVALUE("5/20/1992"), 33744);
assertEquals(DATEVALUE("6/21/1992"), 33776);
assertEquals(DATEVALUE("9/29/1992"), 33876);
assertEquals(DATEVALUE("1/24/1992"), 33627);
assertEquals(DATEVALUE("12/21/1992"), 33959);
assertEquals(DATEVALUE("01/31/1992"), 33634);
assertEquals(DATEVALUE("1/13/1992"), 33616);
assertEquals(DATEVALUE("2/29/2004"), 38046);
assertEquals(DATEVALUE("2/28/2004"), 38045);
assertEquals(DATEVALUE("2/28/004"), 38045);
assertEquals(DATEVALUE("2/28/04"), 38045);
assertEquals(DATEVALUE("2/28/4"), 38045);
assertEquals(DATEVALUE("1/13/1999"), 36173);
assertEquals(DATEVALUE("01/13/1999"), 36173);
assertEquals(DATEVALUE("01/13/0999"), -329069);
assertEquals(DATEVALUE("01/13/1200"), -255656);
assertEquals(DATEVALUE("01/13/0029"), 47131);
assertEquals(DATEVALUE("01/13/0030"), 10971);
assertEquals(DATEVALUE("01/13/0044"), 16084);
assertEquals(DATEVALUE("01/13/0050"), 18276);
assertEquals(DATEVALUE("01/13/0097"), 35443);
assertEquals(DATEVALUE("01/13/0099"), 36173);
assertEquals(DATEVALUE("01/13/0000"), 36538);
assertEquals(DATEVALUE("01/13/0101"), -657057);
assertEquals(DATEVALUE("01/13/0100"), -657422);
assertEquals(DATEVALUE("12/31/100"), -657070);
assertEquals(DATEVALUE("11/10/122"), -649086);
assertEquals(DATEVALUE("1/22/2222"), 117631);
assertEquals(DATEVALUE("1/22/222"), -612854);
// YYYY/MM/DD
assertEquals(DATEVALUE("1992/6/24"), 33779);
assertEquals(DATEVALUE("1992/06/24"), 33779);
assertEquals(DATEVALUE("1999/1/01"), 36161);
assertEquals(DATEVALUE("2222/1/01"), 117610);
assertEquals(DATEVALUE("1902/9/02"), 976);
assertEquals(DATEVALUE("1902/9/2"), 976);
assertEquals(DATEVALUE("4243/11/3"), 856071);
assertEquals(DATEVALUE("  1992/04/19  "), 33713);
assertEquals(DATEVALUE("1992/5/20"), 33744);
assertEquals(DATEVALUE("1992/6/21"), 33776);
assertEquals(DATEVALUE("1992/9/29"), 33876);
assertEquals(DATEVALUE("1992/1/24"), 33627);
assertEquals(DATEVALUE("1992/12/21"), 33959);
assertEquals(DATEVALUE("1992/01/31"), 33634);
assertEquals(DATEVALUE("1992/1/13"), 33616);
assertEquals(DATEVALUE("2004/2/29"), 38046);
assertEquals(DATEVALUE("2004/2/28"), 38045);
assertEquals(DATEVALUE("1999/1/13"), 36173);
assertEquals(DATEVALUE("1999/01/13"), 36173);
assertEquals(DATEVALUE("0999/01/13"), -329069);
assertEquals(DATEVALUE("1200/01/13"), -255656);
assertEquals(DATEVALUE("0029/01/13"), 47131);
assertEquals(DATEVALUE("0030/01/13"), 10971);
assertEquals(DATEVALUE("0044/01/13"), 16084);
assertEquals(DATEVALUE("0050/01/13"), 18276);
assertEquals(DATEVALUE("0097/01/13"), 35443);
assertEquals(DATEVALUE("0099/01/13"), 36173);
assertEquals(DATEVALUE("0000/01/13"), 36538);
assertEquals(DATEVALUE("0101/01/13"), -657057);
assertEquals(DATEVALUE("0100/01/13"), -657422);
assertEquals(DATEVALUE("100/12/31"), -657070);
assertEquals(DATEVALUE("122/11/10"), -649086);
assertEquals(DATEVALUE("2222/1/22"), 117631);
assertEquals(DATEVALUE("222/1/22"), -612854);
catchAndAssertEquals(function() {
  DATEVALUE("2005/2/29");// Leap day on non-leap year.
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DATEVALUE("2005/1/44");// Out of range day for any month
}, ERRORS.VALUE_ERROR);
// YYYY/MM/DD HH(am|pm)
assertEquals(DATEVALUE("1992/6/24 00am"), 33779);
assertEquals(DATEVALUE("1992/06/24 01am "), 33779);
assertEquals(DATEVALUE("1999/1/01 02pm"), 36161);
assertEquals(DATEVALUE("2222/1/01 03pm"), 117610);
assertEquals(DATEVALUE("1902/9/02 12pm"), 976);
assertEquals(DATEVALUE("1902/9/2 12pm"), 976);
assertEquals(DATEVALUE("4243/11/3 12pm   "), 856071);
assertEquals(DATEVALUE("  1992/04/19   12pm   "), 33713);
assertEquals(DATEVALUE("1992/5/20 01am"), 33744);
assertEquals(DATEVALUE("1992/6/21  3pm"), 33776);
assertEquals(DATEVALUE("1992/9/29 3pm"), 33876);
assertEquals(DATEVALUE("1992/1/24 3pm"), 33627);
assertEquals(DATEVALUE("1992/12/21 3pm"), 33959);
assertEquals(DATEVALUE("1992/01/31 3pm"), 33634);
assertEquals(DATEVALUE("1992/1/13 3pm"), 33616);
assertEquals(DATEVALUE("2004/2/29 3pm"), 38046);
assertEquals(DATEVALUE("2004/2/28  3pm "), 38045);
assertEquals(DATEVALUE("1999/1/13 3pm"), 36173);
assertEquals(DATEVALUE("1999/01/13 3pm"), 36173);
assertEquals(DATEVALUE("0999/01/13 3pm"), -329069);
assertEquals(DATEVALUE("1200/01/13 3pm"), -255656);
assertEquals(DATEVALUE("0029/01/13 3pm"), 47131);
assertEquals(DATEVALUE("0030/01/13 3pm"), 10971);
assertEquals(DATEVALUE("0044/01/13 3pm"), 16084);
assertEquals(DATEVALUE("0050/01/13 3pm"), 18276);
assertEquals(DATEVALUE("0097/01/13 00pm"), 35443);
assertEquals(DATEVALUE("0099/01/13 3pm"), 36173);
assertEquals(DATEVALUE("0000/01/13 3pm"), 36538);
assertEquals(DATEVALUE("0101/01/13 3pm"), -657057);
assertEquals(DATEVALUE("0100/01/13 3pm"), -657422);
assertEquals(DATEVALUE("100/12/31 3pm"), -657070);
assertEquals(DATEVALUE("122/11/10 3pm"), -649086);
assertEquals(DATEVALUE("2222/1/22 3pm"), 117631);
assertEquals(DATEVALUE("222/1/22 3pm"), -612854);
catchAndAssertEquals(function() {
  DATEVALUE("2005/2/29 000pm");// Too many digits
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DATEVALUE("2001/2/2 13pm");// Hour out of range
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DATEVALUE("2005/2/29 11am");// Leap day on non-leap year.
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DATEVALUE("2005/1/44 11am");// Out of range day for any month
}, ERRORS.VALUE_ERROR);
// YYYY/MM/DD HH:mm
assertEquals(DATEVALUE("1992/6/24 00:00"), 33779);
assertEquals(DATEVALUE("1992/6/24 0:00"), 33779);
assertEquals(DATEVALUE("1992/6/24 10:10"), 33779);
assertEquals(DATEVALUE("1992/6/24 16:22"), 33779);
assertEquals(DATEVALUE("1992/6/24 25:10"), 33780);
assertEquals(DATEVALUE("1992/6/24 23:60"), 33780);
assertEquals(DATEVALUE("1992/6/24 24:00"), 33780);
assertEquals(DATEVALUE("1992/6/24 23:59"), 33779);
assertEquals(DATEVALUE("1999/1/13 10:11111111"), 43889);
assertEquals(DATEVALUE("1999/1/13 25000:22"), 37214);
assertEquals(DATEVALUE("1999/1/13 25000:    22"), 37214);
// YYYY/MM/DD HH:mm(am|pm)
assertEquals(DATEVALUE("1992/6/24 00:00am"), 33779);
assertEquals(DATEVALUE("1992/06/24 01:44am "), 33779);
assertEquals(DATEVALUE("1999/1/01 02:59pm"), 36161);
assertEquals(DATEVALUE("2222/1/01 03:33pm"), 117610);
assertEquals(DATEVALUE("1902/9/02 12:33pm"), 976);
assertEquals(DATEVALUE("1902/9/2 12:33pm"), 976);
assertEquals(DATEVALUE("4243/11/3 12:33pm   "), 856071);
assertEquals(DATEVALUE("  1992/04/19   12:33pm   "), 33713);
assertEquals(DATEVALUE("1992/5/20 01:33am"), 33744);
assertEquals(DATEVALUE("1992/6/21  3:33pm"), 33776);
assertEquals(DATEVALUE("1992/9/29 3:33pm"), 33876);
assertEquals(DATEVALUE("1992/1/24 3:33pm"), 33627);
assertEquals(DATEVALUE("1992/12/21 3:33pm"), 33959);
assertEquals(DATEVALUE("1992/01/31 3:33pm"), 33634);
assertEquals(DATEVALUE("1992/1/13 3:33pm"), 33616);
assertEquals(DATEVALUE("2004/2/29 3:33pm"), 38046);
assertEquals(DATEVALUE("2004/2/28  3:33pm "), 38045);
assertEquals(DATEVALUE("1999/1/13 3:33pm"), 36173);
assertEquals(DATEVALUE("1999/01/13 3:33pm"), 36173);
assertEquals(DATEVALUE("0999/01/13 3:33pm"), -329069);
assertEquals(DATEVALUE("1200/01/13 3:33pm"), -255656);
assertEquals(DATEVALUE("0029/01/13 3:33pm"), 47131);
assertEquals(DATEVALUE("0030/01/13 3:33pm"), 10971);
assertEquals(DATEVALUE("0044/01/13 3:33pm"), 16084);
assertEquals(DATEVALUE("0050/01/13 3:33pm"), 18276);
assertEquals(DATEVALUE("0097/01/13 00:33pm"), 35443);
assertEquals(DATEVALUE("0099/01/13 3:33pm"), 36173);
assertEquals(DATEVALUE("0000/01/13 3:33pm"), 36538);
assertEquals(DATEVALUE("0101/01/13 3:33pm"), -657057);
assertEquals(DATEVALUE("0100/01/13 3:33pm"), -657422);
assertEquals(DATEVALUE("100/12/31 3:33pm"), -657070);
assertEquals(DATEVALUE("122/11/10 3:33pm"), -649086);
assertEquals(DATEVALUE("2222/1/22 3:33pm"), 117631);
assertEquals(DATEVALUE("222/1/22 3:33pm"), -612854);
assertEquals(DATEVALUE("1992/1/13 6:22222222am"), 49048); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:720pm"), 33617); // overload minutes
assertEquals(DATEVALUE("1992/1/13 00:720pm"), 33617); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:719pm"), 33616); // overload minutes
assertEquals(DATEVALUE("1992/1/13 00:720am"), 33616); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:66669pm"), 33662); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:66669am"), 33662); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:66249pm"), 33662); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:66249am"), 33662); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:666669am"), 34078); // overload minutes
assertEquals(DATEVALUE("1992/1/13 12:666669pm"), 34079); // overload minutes





// Test DB
assertEquals(DB(100, 50, 10, 2, 12), 6.2482428240683285);
assertEquals(DB("100", "50", "10", "2", "12"), 6.2482428240683285);
assertEquals(DB(100, 50, 10, 2, 12.9999999), 6.2482428240683285);
catchAndAssertEquals(function() {
  DB(100, 50, 10, 2, 13);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DB(100, 50, 10, 12, 2);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DB(100, -50, 10, 2, 12);
}, ERRORS.NUM_ERROR);


// Test DDB
assertEquals(DDB(100, 50, 10, 2, 2.25), 17.4375);
assertEquals(DDB(100, [50], 10, 2, "2.25"), 17.4375);
catchAndAssertEquals(function() {
  DDB(100, 50, 10, 12, 2.25);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DDB(100, -50, 10, 2, 12);
}, ERRORS.NUM_ERROR);


// Test DEC2BIN
assertEquals(DEC2BIN([100]), "1100100");
assertEquals(DEC2BIN(100), "1100100");
assertEquals(DEC2BIN(22), "10110");
assertEquals(DEC2BIN(22.11), "10110");
assertEquals(DEC2BIN(22.77), "10110");
assertEquals(DEC2BIN("22.77"), "10110");
assertEquals(DEC2BIN(100, 8), "01100100");
assertEquals(DEC2BIN([100], [8]), "01100100");
assertEquals(DEC2BIN(100, 7), "1100100");
assertEquals(DEC2BIN(100, 10), "0001100100");
assertEquals(DEC2BIN(-100), "1110011100");
assertEquals(DEC2BIN("-22.77"), "1111101010");
assertEquals(DEC2BIN(-22.11), "1111101010");
assertEquals(DEC2BIN(-22), "1111101010");
assertEquals(DEC2BIN(false), "0");
assertEquals(DEC2BIN(true), "1");
catchAndAssertEquals(function() {
  DEC2BIN(100, 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2BIN(513, 10);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2BIN(100, 100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEC2BIN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEC2BIN("str");
}, ERRORS.VALUE_ERROR);

// Test DEC2HEX
assertEquals(DEC2HEX([100]), "64");
assertEquals(DEC2HEX(100), "64");
assertEquals(DEC2HEX(22), "16");
assertEquals(DEC2HEX(22.11), "16");
assertEquals(DEC2HEX(22.77), "16");
assertEquals(DEC2HEX("22.77"), "16");
assertEquals(DEC2HEX(100, 8), "00000064");
assertEquals(DEC2HEX([100], [8]), "00000064");
assertEquals(DEC2HEX(100, 7), "0000064");
assertEquals(DEC2HEX(100, 10), "0000000064");
assertEquals(DEC2HEX(-100), "FFFFFFFF9C");
assertEquals(DEC2HEX("-22.77"), "FFFFFFFFEA");
assertEquals(DEC2HEX(-22.11), "FFFFFFFFEA");
assertEquals(DEC2HEX(-22), "FFFFFFFFEA");
assertEquals(DEC2HEX(false), "0");
assertEquals(DEC2HEX(true), "1");
catchAndAssertEquals(function() {
  DEC2HEX(100, 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2HEX(549755813889, 10);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2HEX(54975581, -10);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2HEX(100, 100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEC2HEX();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEC2HEX("str");
}, ERRORS.VALUE_ERROR);


// Test DEC2OCT
assertEquals(DEC2OCT([100]), "144");
assertEquals(DEC2OCT(100), "144");
assertEquals(DEC2OCT(22), "26");
assertEquals(DEC2OCT(22.11), "26");
assertEquals(DEC2OCT(22.77), "26");
assertEquals(DEC2OCT("22.77"), "26");
assertEquals(DEC2OCT(100, 8), "00000144");
assertEquals(DEC2OCT([100], [8]), "00000144");
assertEquals(DEC2OCT(100, 7), "0000144");
assertEquals(DEC2OCT(100, 10), "0000000144");
assertEquals(DEC2OCT(-100), "7777777634");
assertEquals(DEC2OCT("-22.77"), "7777777752");
assertEquals(DEC2OCT(-22.11), "7777777752");
assertEquals(DEC2OCT(-22), "7777777752");
assertEquals(DEC2OCT(false), "0");
assertEquals(DEC2OCT(true), "1");
catchAndAssertEquals(function() {
  DEC2OCT(100, 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2OCT(536870913, 10);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2OCT(536870910, -10);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DEC2OCT(100, 100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEC2OCT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEC2OCT("str");
}, ERRORS.VALUE_ERROR);


// Test DEGREES
assertEquals(DEGREES(PI()), 180);
assertEquals(DEGREES([PI(), "str"]), 180);
assertEquals(DEGREES(false), 0);
assertEquals(DEGREES(true), 57.29577951308232);
assertEquals(DEGREES(1), 57.29577951308232);
assertEquals(DEGREES(12), 687.5493541569879);
catchAndAssertEquals(function() {
  DEGREES("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DEGREES();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEGREES(10, 10);
}, ERRORS.NA_ERROR);


// Test DELTA
assertEquals(DELTA(2, 2), 1);
assertEquals(DELTA(2, 1), 0);
assertEquals(DELTA(2), 0);
assertEquals(DELTA("", ""), 1);
assertEquals(DELTA(false), 1);
assertEquals(DELTA(true), 0);
assertEquals(DELTA(2.2, 2.1), 0);
assertEquals(DELTA(1, true), 1);
assertEquals(DELTA(0, false), 1);
assertEquals(DELTA(true, true), 1);
catchAndAssertEquals(function() {
  DELTA("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DELTA("n", "n");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DELTA();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DELTA(1, 2, 3);
}, ERRORS.NA_ERROR);


// Test DEVSQ
assertEquals(DEVSQ(1, 2), 0.5);
assertEquals(DEVSQ([1, 2]), 0.5);
assertEquals(DEVSQ([1, [2]]), 0.5);
assertEquals(DEVSQ(1), 0);
assertEquals(DEVSQ(false), 0);
assertEquals(DEVSQ(true), 0);
assertEquals(DEVSQ(1, 2, 3, 4), 5);
assertEquals(DEVSQ([1, 2, 3, 4]), 5);
catchAndAssertEquals(function() {
  DEVSQ(1, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DEVSQ();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEVSQ([1, 2, [], 3]);
}, ERRORS.REF_ERROR);


// Test DOLLAR
assertEquals(DOLLAR(1.2351, 4), 1.2351);
assertEquals(DOLLAR(1.2351, 2), 1.23);
assertEquals(DOLLAR("$3.141592653589793", "2"), 3.14);
assertEquals(DOLLAR("-$3.141592653589793", "2"), -3.14);
assertEquals(DOLLAR("$-3.141592653589793", "2"), -3.14);
assertEquals(DOLLAR(PI(), 1), 3.1);
assertEquals(DOLLAR(PI(), 0), 3);
assertEquals(DOLLAR(PI(), false), 3);
assertEquals(DOLLAR(PI(), -1), 0);
assertEquals(DOLLAR(31.41592653589793, -1), 30);
assertEquals(DOLLAR([31.41592653589793], [-1]), 30);
assertEquals(DOLLAR(31111.41592653589793, -4), 30000);
assertEquals(DOLLAR(31111.41592653589793, -2), 31100);
catchAndAssertEquals(function() {
  DOLLAR();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DOLLAR(3.1, 1, 1);
}, ERRORS.NA_ERROR);


// Test  DOLLARDE
assertEquals(DOLLARDE(0, 32), 0);
assertEquals(DOLLARDE(100.1, 32), 100.3125);
assertEquals(DOLLARDE(100.1, 32.9999), 100.3125);
assertEquals(DOLLARDE("100.1", [32, "str"]), 100.3125);
catchAndAssertEquals(function() {
  DOLLARDE(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  DOLLARDE(100, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DOLLARDE(100, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  DOLLARDE(100, 0.99);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  DOLLARDE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DOLLARDE(3.1);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DOLLARDE(3.1, 32, 22);
}, ERRORS.NA_ERROR);


// Test DOLLARFR
assertEquals(DOLLARFR(100.1, 32), 100.032);
assertEquals(DOLLARFR(100.1, 32), 100.032);
assertEquals(DOLLARFR(100.1, 32.9999), 100.032);
assertEquals(DOLLARFR("100.1", [32, "str"]), 100.032);
catchAndAssertEquals(function() {
  DOLLARFR(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  DOLLARFR(100, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DOLLARFR(100, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  DOLLARFR(100, 0.99);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  DOLLARFR();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DOLLARFR(3.1);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DOLLARFR(3.1, 32, 22);
}, ERRORS.NA_ERROR);


assertEquals(AND(10), true);



// TODO: Turned off while working on DATE().
// assertEqualsDates(EDATE(DATE(1992, 6, 24), 1), new Date('7/24/1992'));


// Test EFFECT
assertEquals(EFFECT(0.99, 12), 1.5890167507927795);
assertEquals(EFFECT(0.99, 12.111), 1.5890167507927795);
assertEquals(EFFECT(0.99, 12.999), 1.5890167507927795);
assertEquals(EFFECT("100000", 12.999), 1.123182670038387e+47);
assertEquals(EFFECT([100000], [12.999]), 1.123182670038387e+47);
catchAndAssertEquals(function() {
  EFFECT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EFFECT(0.99);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EFFECT(-0.99, 12);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  EFFECT(0.99, 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  EFFECT(0.99, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  EFFECT(0.99, []);
}, ERRORS.REF_ERROR);

// assertEqualsDates(EOMONTH(DATE(1992, 6, 24), 1), new Date('7/31/1992'));


// Test ERF
assertEquals(ERF(2), 0.9953222650189527);
assertEquals(ERF("2"), 0.9953222650189527);
assertEquals(ERF(0), 1.1102230246251565e-16);
assertEquals(ERF(1), 0.8427007929497149);
assertEquals(ERF(true), 0.8427007929497149);
assertEquals(ERF(false), 1.1102230246251565e-16);
catchAndAssertEquals(function() {
  ERF();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ERF([]);
}, ERRORS.REF_ERROR);
assertEquals(ERF(1, 2), 0.15262147206923782);
assertEquals(ERF(2, 1), -0.15262147206923782);


// Test ERFC
assertEquals(ERFC(2), 0.004677734981047288);
assertEquals(ERFC("2"), 0.004677734981047288);
assertEquals(ERFC(0), 1);
assertEquals(ERFC(1), 0.1572992070502851);
assertEquals(ERFC(-1), 1.842700792949715);
assertEquals(ERFC(-10), 2);
catchAndAssertEquals(function() {
  ERFC();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ERFC([]);
}, ERRORS.REF_ERROR);



// Test EVEN
assertEquals(EVEN(3), 4);
assertEquals(EVEN(4), 4);
assertEquals(EVEN(5), 6);
assertEquals(EVEN("4"), 4);
assertEquals(EVEN(false), 0);
assertEquals(EVEN(true), 2);
assertEquals(EVEN([11, 22]), 12);
assertEquals(EVEN([10, 22, "str"]), 10);
catchAndAssertEquals(function() {
  EVEN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EVEN(1, 2, 3);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EVEN("str");
}, ERRORS.VALUE_ERROR);

// Test EXACT
assertEquals(EXACT("m", "M"), false);
assertEquals(EXACT("m", "m"), true);
assertEquals(EXACT("m", false), false);
assertEquals(EXACT(false, false), true);
assertEquals(EXACT(10, 10), true);
assertEquals(EXACT(10, "10"), true);
assertEquals(EXACT(10, "str"), false);
assertEquals(EXACT([10], [10]), true);
assertEquals(EXACT(["str"], [10, 22]), false);
catchAndAssertEquals(function() {
  EXACT([], []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  EXACT([]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT("m");
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT(10, 10, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT(false);
}, ERRORS.NA_ERROR);


// Test EXPONDIST
assertEquals(EXPONDIST(4, 0.5, false), 0.06766764161830635);
assertEquals(EXPONDIST(4, 0.5, 0), 0.06766764161830635);
assertEquals(EXPONDIST(4, 0.5, true), 0.8646647167633873);
assertEquals(EXPONDIST(4, 0.5, 1), 0.8646647167633873);
assertEquals(EXPONDIST(4, 0.5, -1), 0.8646647167633873);
assertEquals(EXPONDIST([4, "str"], ["0.5"], [false]), 0.06766764161830635);
catchAndAssertEquals(function() {
  EXPONDIST("str", 0.5, "1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5, "1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5, true, 1);
}, ERRORS.NA_ERROR);


// Test FALSE
assertEquals(FALSE(), false);


// Test F.DIST
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, false), 0.0003451054686025578);
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, true), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, 1), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, "7", [6], 1), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, "7", [6], 10), 0.9980694465675269);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](15.35, 7, 6, "10");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](-15.35, 7, 6, 1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](15.35, 7, 6);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"]();
}, ERRORS.NA_ERROR);


// Test FINV
assertEquals(FINV(0.42, 2, 3), 1.174597274485816);


// Test FISHER
assertEquals(FISHER(0.962), 1.972066740199461);
assertEquals(FISHER([0.962]), 1.972066740199461);
assertEquals(FISHER("0.962"), 1.972066740199461);
assertEquals(FISHER(0), 0);
assertEquals(FISHER(false), 0);
assertEquals(FISHER(0.92), 1.589026915173973);
catchAndAssertEquals(function() {
  FISHER("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  FISHER(1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  FISHER(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  FISHER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FISHER(0.55, 0.1);
}, ERRORS.NA_ERROR);


// Test FISHERINV
assertEquals(FISHERINV(0.962), 0.7451676440945232);
assertEquals(FISHERINV(0.962), 0.7451676440945232);
assertEquals(FISHERINV([0.962]), 0.7451676440945232);
assertEquals(FISHERINV("0.962"), 0.7451676440945232);
assertEquals(FISHERINV(0), 0);
assertEquals(FISHERINV(false), 0);
assertEquals(FISHERINV(true), 0.761594155955765);
assertEquals(FISHERINV(0.92), 0.7258974148490807);
catchAndAssertEquals(function() {
  FISHER("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  FISHER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FISHER(0.55, 0.1);
}, ERRORS.NA_ERROR);


// Test FLOOR
assertEquals(FLOOR(10.1), 10);
assertEquals(FLOOR("10.1"), 10);
assertEquals(FLOOR(10.11111111, 0.1), 10.1);
assertEquals(FLOOR(10.22222222, 0.1), 10.2);
assertEquals(FLOOR(10.33333333, 0.2), 10.2);
assertEquals(FLOOR(10.33333333, 0.1), 10.3);
assertEquals(FLOOR([10.33333333], 0.1), 10.3);
assertEquals(FLOOR(10.22222222, 5), 10);
assertEquals(FLOOR(10.22222222, 8), 8);
assertEquals(FLOOR(10.22222222, true), 10);
catchAndAssertEquals(function() {
  FLOOR(10, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  FLOOR(10, 1, 2);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FLOOR();
}, ERRORS.NA_ERROR);


// Test IF
assertEquals(IF(true, "hit", "miss"), "hit");
assertEquals(IF(false, "hit", "miss"), "miss");
assertEquals(IF("", "hit", "miss"), "miss");
assertEquals(IF("", "hit", "miss"), "miss");
assertEquals(IF([true], "hit", "miss"), "hit");
assertEquals(IF([false], "hit", "miss"), "miss");
assertEquals(IF([""], "hit", "miss"), "miss");
assertEquals(IF([""], "hit", "miss"), "miss");
catchAndAssertEquals(function() {
  IF("str", 1, 2);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  IF([], 1, 2);
}, ERRORS.REF_ERROR);


// Test INT
assertEquals(INT(99.33), 99);
assertEquals(INT(99.99), 99);
assertEquals(INT(true), 1);
assertEquals(INT(false), 0);
assertEquals(INT(""), 0);
assertEquals(INT([1.1, "str"]), 1);
catchAndAssertEquals(function() {
  INT(100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  INT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  INT("str");
}, ERRORS.VALUE_ERROR);


// Test ISEVEN
assertEquals(ISEVEN(4), true);
assertEquals(ISEVEN(3), false);
assertEquals(ISEVEN(4.1), true);
assertEquals(ISEVEN(false), true);
assertEquals(ISEVEN(true), false);
assertEquals(ISEVEN([4]), true);
catchAndAssertEquals(function() {
  ISEVEN(100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISEVEN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISEVEN("");
}, ERRORS.VALUE_ERROR);


// Test ISODD
assertEquals(ISODD(4), false);
assertEquals(ISODD(3), true);
assertEquals(ISODD(4.1), false);
assertEquals(ISODD(false), false);
assertEquals(ISODD(true), true);
assertEquals(ISODD([4]), false);
catchAndAssertEquals(function() {
  ISODD(100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISODD();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISODD("");
}, ERRORS.VALUE_ERROR);


// Test LN
assertEquals(LN(100), 4.605170185988092);
assertEquals(LN("100"), 4.605170185988092);
assertEquals(LN(1), 0);
assertEquals(LN(true), 0);
catchAndAssertEquals(function() {
  LN(false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LN("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  LN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  LN(10, 10);
}, ERRORS.NA_ERROR);


// Test LOG
assertEquals(LOG(256, 2), 8);
assertEquals(LOG(100), 2);
assertEquals(LOG(100), 2);
assertEquals(LOG(256, 10), 2.408239965311849);
assertEquals(LOG(256), 2.408239965311849);
assertEquals(LOG("100"), 2);
assertEquals(LOG(1, 2), 0);
catchAndAssertEquals(function() {
  LOG("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  LOG(256, 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG(256, 1);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  LOG(256, false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG(256, true);
}, ERRORS.DIV_ZERO_ERROR);


// Test LOG10
assertEquals(LOG10(100), 2);
assertEquals(LOG10("100"), 2);
assertEquals(LOG10(1), 0);
assertEquals(LOG10(10.1), 1.0043213737826424);
catchAndAssertEquals(function() {
  LOG10(false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG10("");
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG10("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  LOG10();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  LOG10(10, 10);
}, ERRORS.NA_ERROR);


// Test MAX
assertEquals(MAX(100, 22), 100);
assertEquals(MAX(100, "22"), 100);
assertEquals(MAX(-100, false), 0);
assertEquals(MAX(-100, true), 1);
assertEquals(MAX(100, [101, 2]), 101);
assertEquals(MAX(100, [101, 2, "10000"]), 101);
assertEquals(MAX(100, ["10000"]), 100);
catchAndAssertEquals(function() {
  MAX(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MAX([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MAX();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MAX(100, "str");
}, ERRORS.VALUE_ERROR);

// Test MAXA
assertEquals(MAXA(100, 22, 44), 100);


// Tes MEDIAN
assertEquals(MEDIAN(100, 22, 54), 54);
assertEquals(MEDIAN(100, 22, "54"), 54);
assertEquals(MEDIAN(100, 22), 61);
assertEquals(MEDIAN(2), 2);
assertEquals(MEDIAN(false), 0);
assertEquals(MEDIAN(1, 1, 2, 6, 6, 9, 5), 5);
assertEquals(MEDIAN(6, 6, 1, 1, 2, 9), 4);
assertEquals(MEDIAN(1, 1, 2, [5, 6, 6, 9]), 5);
catchAndAssertEquals(function() {
  MEDIAN(1, 1, 2, 5, "mmm", 6, 6, 9);
}, ERRORS.VALUE_ERROR);
assertEquals(MEDIAN(1, 1, 2, [5, "mmm", 6, 6, 9]), 5);
assertEquals(MEDIAN(1, 1, 2, ["mm"]), 1);
assertEquals(MEDIAN(100, 22, 1, 14), 18);
assertEquals(MEDIAN(100, 22, 1, 1), 11.5);
assertEquals(MEDIAN(100, 22, 1), 22);
assertEquals(MEDIAN(100, 22, [54]), 54);
assertEquals(MEDIAN(100, 22, ["str"]), 61);
catchAndAssertEquals(function() {
  MEDIAN(10, 22, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  MEDIAN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MEDIAN(["str"]);
}, ERRORS.NUM_ERROR);


// Test MIN
assertEquals(MIN(100, 22, 44), 22);
assertEquals(MIN(100, "22"), 22);
assertEquals(MIN(100, false), 0);
assertEquals(MIN(100, true), 1);
assertEquals(MIN(100, [101, 2]), 2);
assertEquals(MIN(100, [101, 2, "-10"]), 2);
assertEquals(MIN(100, ["-10"]), 100);
catchAndAssertEquals(function() {
  MIN(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MIN([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MIN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MIN(100, "str");
}, ERRORS.VALUE_ERROR);


// Test MINA
assertEquals(MINA(100, 22, 44), 22);


// Test MOD
assertEquals(MOD(10, 3), 1);
catchAndAssertEquals(function() {
  MOD(10, 3, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MOD([10, 3]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MOD(0, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  MOD(10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MOD(10, false);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  MOD(10, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  MOD(10, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(MOD(10, "3"), 1);
assertEquals(MOD(10.1, 3), 1.0999999999999996);
assertEquals(MOD(10, 3.1), 0.6999999999999997);


// Test NOT
assertEquals(NOT(TRUE()), false);
assertEquals(NOT(""), true);
catchAndAssertEquals(function() {
  NOT(" ");
}, ERRORS.VALUE_ERROR);
assertEquals(NOT(100), false);
assertEquals(NOT(0), true);
assertEquals(NOT(-1), false);
assertEquals(NOT(1), false);
catchAndAssertEquals(function() {
  NOT("0");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  NOT([]);
}, ERRORS.REF_ERROR);
assertEquals(NOT([10]), false);
assertEquals(NOT([0, 0]), true);
assertEquals(NOT([0, false]), true);
assertEquals(NOT([false, 0]), true);
assertEquals(NOT([10, "str"]), false);
catchAndAssertEquals(function() {
  NOT("str");
}, ERRORS.VALUE_ERROR);
assertEquals(NOT([""]), true);
assertEquals(NOT([0]), true);
assertEquals(NOT([1]), false);
assertEquals(NOT([0, 1]), true);
catchAndAssertEquals(function() {
  NOT("1.2");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  NOT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  NOT(false, false);
}, ERRORS.NA_ERROR);


// Test ODD
assertEquals(ODD(2), 3);
assertEquals(ODD(4), 5);
assertEquals(ODD(5), 5);
assertEquals(ODD("4"), 5);
assertEquals(ODD(false), 1);
assertEquals(ODD(true), 1);
assertEquals(ODD([10, 22]), 11);
assertEquals(ODD([10, 22, "str"]), 11);
catchAndAssertEquals(function() {
  ODD();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ODD(1, 2, 3);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ODD("str");
}, ERRORS.VALUE_ERROR);


// Test OR
assertEquals(OR(true, false), true);
assertEquals(OR(false, false), false);
assertEquals(OR(1, 0), true);
assertEquals(OR([1, 0]), true);
assertEquals(OR(false, 0, -10), true);
assertEquals(OR([false, 0, -10]), true);
assertEquals(OR([false, 0, [-10]]), true);
catchAndAssertEquals(function() {
  OR([false, 0, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  OR(false, "d");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  OR(false, "10");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  OR(false, "1.1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  OR();
}, ERRORS.NA_ERROR);


assertEquals(PI(), 3.141592653589793);


// Test POWER
assertEquals(POWER(4, 10), 1048576);
assertEquals(POWER(4, false), 1);
assertEquals(POWER(4, true), 4);
assertEquals(POWER([4], [10]), 1048576);
assertEquals(POWER([4], [10, "str"]), 1048576);
catchAndAssertEquals(function() {
  POWER(4, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  POWER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  POWER(4);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  POWER(4, 10, 22);
}, ERRORS.NA_ERROR);


// Test RADIANS
assertEquals(RADIANS(180), 3.141592653589793);
assertEquals(RADIANS(false), 0);
assertEquals(RADIANS(true), 0.017453292519943295);
catchAndAssertEquals(function() {
  RADIANS("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  RADIANS();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  RADIANS(4, 10);
}, ERRORS.NA_ERROR);


// Test ROUND
assertEquals(ROUND(99.44, 1), 99.4);
assertEquals(ROUND(99.44, 0), 99);
assertEquals(ROUND(99.4444444444444, 9), 99.444444444);
assertEquals(ROUND(99.44), 99);
assertEquals(ROUND("99.44"), 99);
assertEquals(ROUND([99.44, 22.222], [1, 4]), 99.4);
catchAndAssertEquals(function() {
  ROUND();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUND(99.44, 1, 44);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUND(99.999, "str");
}, ERRORS.VALUE_ERROR);


// Test ROUNDDOWN
assertEquals(ROUNDDOWN(99.46, 1), 99.4);
assertEquals(ROUNDDOWN(99.99, 1), 99.9);
assertEquals(ROUNDDOWN(99.5555555555555, 9), 99.555555555);
assertEquals(ROUNDDOWN(99.99), 99);
assertEquals(ROUNDDOWN("99.99"), 99);
assertEquals(ROUNDDOWN([99.46666, 22.222], [1, 4]), 99.4);
catchAndAssertEquals(function() {
  ROUNDDOWN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDDOWN(99.44, 1, 44);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDDOWN(99.999, "str");
}, ERRORS.VALUE_ERROR);


// Test ROUNDUP
assertEquals(ROUNDUP(99.46, 1), 99.5);
assertEquals(ROUNDUP(99.99, 1), 100);
assertEquals(ROUNDUP(99.5555555555555, 9), 99.555555556);
assertEquals(ROUNDUP(99.99), 100);
assertEquals(ROUNDUP("99.99"), 100);
assertEquals(ROUNDUP([99.46666, 22.222], [1, 4]), 99.5);
catchAndAssertEquals(function() {
  ROUNDUP();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDUP(99.44, 1, 44);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDUP(99.999, "str");
}, ERRORS.VALUE_ERROR);


// Test SIN
assertEquals(SIN(0), 0);
assertEquals(SIN(1), 0.8414709848078965);
assertEquals(SIN(PI() / 2), 1);
assertEquals(SIN(PI()), 0);
assertEquals(SIN(true), 0.8414709848078965);
assertEquals(SIN(false), 0);
assertEquals(SIN("0"), 0);
assertEquals(SIN(""), 0);
catchAndAssertEquals(function() {
  SIN("str");
}, ERRORS.VALUE_ERROR);
assertEquals(SIN([1]), 0.8414709848078965);
assertEquals(SIN([[1]]), 0.8414709848078965);
assertEquals(SIN([1, "str"]), 0.8414709848078965);


// Test SINH
assertEquals(SINH(PI()), 11.548739357257748);
assertEquals(SINH(1), 1.1752011936438014);
assertEquals(SINH(false), 0);
assertEquals(SINH(true), 1.1752011936438014);
assertEquals(SINH(""), 0);
assertEquals(SINH("0"), 0);
catchAndAssertEquals(function() {
  SINH("str");
}, ERRORS.VALUE_ERROR);
assertEquals(SINH([10]), 11013.232874703393);
assertEquals(SINH([[10]]), 11013.232874703393);
catchAndAssertEquals(function() {
  SIN([[]]);
}, ERRORS.REF_ERROR);
assertEquals(SINH([[10, "str"]]), 11013.232874703393);


// Test SPLIT
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


// Test SQRT
assertEquals(SQRT(9), 3);
assertEquals(SQRT("9"), 3);
assertEquals(SQRT(4), 2);
assertEquals(SQRT(false), 0);
assertEquals(SQRT(true), 1);
assertEquals(SQRT(""), 0);
catchAndAssertEquals(function() {
  SQRT("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SQRT(-9);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SQRT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SQRT(4, 4);
}, ERRORS.NA_ERROR);


// Test SQRTPI
assertEquals(SQRTPI(9), 5.317361552716548);
assertEquals(SQRTPI("9"), 5.317361552716548);
assertEquals(SQRTPI([9]), 5.317361552716548);
assertEquals(SQRTPI(0), 0);
assertEquals(SQRTPI(1), 1.7724538509055159);
assertEquals(SQRTPI(""), 0);
catchAndAssertEquals(function() {
  SQRTPI("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SQRTPI(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  SQRTPI();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SQRTPI(4, 4);
}, ERRORS.NA_ERROR);


// Test SUM
assertEquals(SUM(10), 10);
assertEquals(SUM(10, 10), 20);
assertEquals(SUM(10, [5, 5]), 20);
assertEquals(SUM("10", [5, 5]), 20);
assertEquals(SUM(false, [10, 10]), 20);
assertEquals(SUM(true, [10, 10]), 21);
catchAndAssertEquals(function() {
  SUM([10, 10], "");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SUM([10, 10], "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SUM();
}, ERRORS.NA_ERROR);


// Test SUMIF
assertEquals(SUMIF([1, 5, 10], 5), 5);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], 5), 20);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], 10), 10);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">5"), 10);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=5"), 20);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=1"), 1);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=     1  "), 1);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">0"), 31);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">=5"), 30);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "<10"), 21);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5, 44], "<=10"), 31);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">4.99"), 30);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "<4.99"), 1);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=     1.0.0  "), 0);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=>5"), 0);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "==5"), 0);
assertEquals(SUMIF(["m", "m", 3, 11, true], "m"), 0);
assertEquals(SUMIF(["m", "p", "m"], "m", [1, 1, 1]), 2);
assertEquals(SUMIF(["p", "p", "p"], "m", [1, 1, 1]), 0);
assertEquals(SUMIF(["p", "p", "p"], "", [1, 1, 1]), 0);
assertEquals(SUMIF(["p", "p", "p"], "*", [1, 1, 1]), 3);
assertEquals(SUMIF(["mom", "pop", "pap"], "*o*", [1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "pap"], "*a*", [1, 1, 1]), 1);
assertEquals(SUMIF(["mom", "pop", "pap"], "p*p", [1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "pap"], "p*p", [1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "pap"], "p*p", [1, 1,]), 1);
assertEquals(SUMIF(["pop", "pap"], "p*p", [1, 2, 4]), 3);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "boom"], "*o*", [1, 1, 1, 1, 1]), 3);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "mom", [1, 1, 1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "?o?", [1, 1, 1, 1, 1]), 3);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "???", [1, 1, 1, 1, 1]), 5);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "????", [1, 1, 1, 1, 1]), 0);
assertEquals(SUMIF([0, 1, 0, 1], "=1", [1, 2, 4, 8]), 10);
catchAndAssertEquals(function() {
  SUMIF([0, 1, 0, 1]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMIF();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMIF([], "=1", [], true);
}, ERRORS.NA_ERROR);


// Test SUMPRODUCT
assertEquals(SUMPRODUCT([1, 5, 10], [2, 2, 2]), 32);
assertEquals(SUMPRODUCT([1, 5, 10], [2, 2, 2], [2, 2, 2]), 64);
assertEquals(SUMPRODUCT([1, 5, 10], [1, 2, 2], [1, 4, 4]), 121);
assertEquals(SUMPRODUCT([1, 5, 10]), 16);
assertEquals(SUMPRODUCT([1, 5, 10, ""]), 16);
assertEquals(SUMPRODUCT([1, 5, 10, 200], [2, 2, 2, ""]), 32);
assertEquals(SUMPRODUCT([1, 5, 10, "str"]), 16);
assertEquals(SUMPRODUCT([10, 10, 22, "str"], [2, 2, [2, 2]]), 84);
assertEquals(SUMPRODUCT(1, 5, 10), 50);
assertEquals(SUMPRODUCT([1, 5, 10]), 16);
catchAndAssertEquals(function() {
  SUMPRODUCT([1, 5, 10], [2, 2]);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SUMPRODUCT([1, 5, 10], [2, 2, 2, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMPRODUCT();
}, ERRORS.NA_ERROR);



// Test SUMSQ
assertEquals(SUMSQ([1, 5, 10], 10), 226);
assertEquals(SUMSQ([10, 10, 22, ""]), 684);
assertEquals(SUMSQ(10, 10, 22), 684);
assertEquals(SUMSQ(10, 10, "22", true), 685);
assertEquals(SUMSQ(10, 10, "22", false), 684);
assertEquals(SUMSQ([10, 10, 22, true]), 684);
catchAndAssertEquals(function() {
  SUMSQ([10, 10, 22, "", []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMSQ([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMSQ();
}, ERRORS.NA_ERROR);


// Test SUMX2MY2
assertEquals(SUMX2MY2([1,2,3],[4,5,6]), -63);
assertEquals(SUMX2MY2([1, 2, 3], [[4, 5], [6]]), -63);
assertEquals(SUMX2MY2(["1",2,3],[4,5,6]), -48);
assertEquals(SUMX2MY2(["",2,3],[4,5,6]), -48);
assertEquals(SUMX2MY2([false,2,3],[4,5,6]), -48);
assertEquals(SUMX2MY2([true,2,3],[4,5,6]), -48);
catchAndAssertEquals(function() {
  SUMX2MY2([1,2,3],[4,5, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMX2MY2([1,2,3],[4,5]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMX2MY2();
}, ERRORS.NA_ERROR);


// Test SUMX2PY2
assertEquals(SUMX2PY2([1, 2, 3], [4, 5, 6]), 91);
assertEquals(SUMX2PY2([1, 2, 3], [[4, 5], [6]]), 91);
assertEquals(SUMX2PY2(["1",2,3],[4,5,6]), 74);
assertEquals(SUMX2PY2(["",2,3],[4,5,6]), 74);
assertEquals(SUMX2PY2([false,2,3],[4,5,6]), 74);
assertEquals(SUMX2PY2([true,2,3],[4,5,6]), 74);
catchAndAssertEquals(function() {
  SUMX2PY2([1,2,3],[4,5, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMX2PY2([1,2,3],[4,5]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMX2PY2();
}, ERRORS.NA_ERROR);


// Test TAN
assertEquals(TAN(0), 0);
assertEquals(TAN(1), 1.5574077246549023);
assertEquals(TAN(PI() / 2), 16331239353195370);
assertEquals(TAN(PI()), 0);
assertEquals(TAN(false), 0);
assertEquals(TAN(true), 1.5574077246549023);
assertEquals(TAN(""), 0);
assertEquals(TAN("0"), 0);
catchAndAssertEquals(function() {
  TAN("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  TAN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  TAN(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(TAN([1, 44]), 1.5574077246549023);
assertEquals(TAN([1, "str"]), 1.5574077246549023);


// Test TANH
assertEquals(TANH(0), 0);
assertEquals(TANH(1), 0.7615941559557649);
assertEquals(TANH(PI() / 2), 0.9171523356672744);
assertEquals(TANH(PI()), 0.9962720762207501);
assertEquals(TANH(false), 0);
assertEquals(TANH(true), 0.7615941559557649);
assertEquals(TANH(""), 0);
assertEquals(TANH("0"), 0);
catchAndAssertEquals(function() {
  TANH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  TANH();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  TANH(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(TANH([1, 44]), 0.7615941559557649);
assertEquals(TANH([1, "str"]), 0.7615941559557649);


// Test TRUE
assertEquals(TRUE(), true);


// Test TRUNC
assertEquals(TRUNC(PI(), 2), 3.14);
assertEquals(TRUNC("3.141592653589793", "2"), 3.14);
assertEquals(TRUNC(PI(), 1), 3.1);
assertEquals(TRUNC(PI(), 0), 3);
assertEquals(TRUNC(PI(), false), 3);
assertEquals(TRUNC(PI(), -1), 0);
assertEquals(TRUNC(31.41592653589793, -1), 30);
assertEquals(TRUNC([31.41592653589793], [-1]), 30);
assertEquals(TRUNC(31111.41592653589793, -4), 30000);
assertEquals(TRUNC(31111.41592653589793, -2), 31100);
catchAndAssertEquals(function() {
  TRUNC();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  TRUNC(3.1, 1, 1);
}, ERRORS.NA_ERROR);


// Test XOR
assertEquals(XOR(1, 1), false);
assertEquals(XOR(1, 0), true);
assertEquals(XOR(0, 0, 0), false);
assertEquals(XOR(0, 0, 1), true);
assertEquals(XOR(0, 0, [0, 0, 1]), true);
assertEquals(XOR(0, 1, [0, 0, 1]), false);
catchAndAssertEquals(function() {
  XOR("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  XOR();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  XOR(1, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  XOR([]);
}, ERRORS.REF_ERROR);



// assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 0), 18.994444444444444);
// // assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 1)', 18.99587544); // This is slightly off
// assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 2), 19.272222222222222);
// assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 3), 19.008219178082193);
// assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 4), 18.994444444444444);