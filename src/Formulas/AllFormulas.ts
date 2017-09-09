import {
  ABS,
  ACOS,
  ACOSH,
  ACOTH,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  COT,
  COTH,
  COSH,
  COS,
  COUNTUNIQUE,
  EVEN,
  ERF,
  ERFC,
  INT,
  ISEVEN,
  ISODD,
  MOD,
  ODD,
  SIN,
  SINH,
  SUM,
  SQRT,
  SQRTPI,
  PI,
  POWER,
  LOG,
  LOG10,
  LN,
  TAN,
  TANH,
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SUMPRODUCT,
  SUMIF,
  SUMSQ,
  SUMX2MY2,
  SUMX2PY2,
  FLOOR,
  IF,
  COUNTIF,
  COUNTIFS,
  CEILING,
  TRUNC,
  RADIANS,
  DEGREES,
  COMBIN,
  MULTIPLY,
  MINUS,
  RAND,
  RANDBETWEEN,
  SIGN,
  DIVIDE,
  EQ,
  GT,
  GTE,
  LT,
  LTE,
  NE,
  GCD,
  LCM,
  GAMMALN,
  PRODUCT,
  QUOTIENT,
  UPLUS,
  UMINUS,
  MROUND,
  FACTDOUBLE,
  UNARY_PERCENT,
  MULTINOMIAL,
  SERIESSUM
} from "./Math";
import {
  FREQUENCY,
  GROWTH,
  LINEST
} from "./Range";
import {
  NA,
  ISTEXT,
  ISLOGICAL,
  ISNUMBER,
  ISNONTEXT,
  ISEMAIL,
  ISURL,
  N,
  ISREF,
  ERRORTYPE,
  ISBLANK,
  ISERR,
  ISERROR,
  ISNA,
  IFERROR,
  TYPE,
  COLUMN,
  ROW,
  ISFORMULA
} from "./Info";
import {
  CHOOSE,
  ADDRESS,
  COLUMNS,
  ROWS
} from "./Lookup";
import {
  TO_DATE,
  TO_DOLLARS,
  TO_PERCENT,
  TO_TEXT
} from "./Convert";
import {
  AND,
  EXACT,
  TRUE,
  FALSE,
  NOT,
  OR,
  XOR
} from "./Logical";
import {
  BIN2DEC,
  BIN2HEX,
  BIN2OCT,
  DEC2BIN,
  DEC2HEX,
  DEC2OCT,
  DELTA
} from "./Engineering";
import {
  ACCRINT,
  CUMPRINC,
  CUMIPMT,
  DB,
  DDB,
  DOLLAR,
  DOLLARDE,
  DOLLARFR,
  EFFECT,
  SYD,
  SLN,
  NPV,
  NPER,
  NOMINAL,
  MIRR,
  IRR,
  IPMT,
  FV,
  PPMT
} from "./Financial";
import {
  AVERAGE,
  AVERAGEA,
  AVERAGEIF,
  AVEDEV,
  CORREL,
  COUNT,
  COUNTA,
  PEARSON,
  MEDIAN,
  DEVSQ,
  EXPONDIST,
  FDIST$LEFTTAILED,
  FINV,
  FISHER,
  FISHERINV,
  MAX,
  MAXA,
  MIN,
  MINA,
  QUARTILE,
  PERCENTILE,
  STDEV,
  STDEVA,
  STDEVP,
  STDEVPA,
  TRIMMEAN,
  SLOPE,
  STANDARDIZE,
  SMALL,
  LARGE,
  KURT,
  INTERCEPT,
  FORECAST,
  POISSON,
  PERCENTRANK,
  PERCENTRANK$EXC,
  NORMSINV,
  NORMSDIST,
  NORMDIST,
  NORMINV,
  NEGBINOMDIST,
  GEOMEAN,
  HARMEAN,
  CONFIDENCE,
  BINOMDIST,
  COVAR,
  WEIBULL,
  VARPA,
  VARP,
  VARA,
  VAR,
  PERMUT,
  RSQ,
  SKEW,
  STEYX,
  PROB,
  MODE,
  RANK,
  RANK$AVG,
  RANK$EQ,
  LOGNORMDIST,
  TDIST
} from "./Statistical";
import {
  ARABIC,
  CHAR,
  CODE,
  SPLIT,
  CONCATENATE,
  CONVERT,
  TRIM,
  LOWER,
  UPPER,
  T
} from "./Text"
import {
  DATE,
  DATEVALUE,
  DATEDIF,
  DAYS,
  DAY,
  DAYS360,
  EDATE,
  EOMONTH,
  MONTH,
  YEAR,
  WEEKDAY,
  WEEKNUM,
  YEARFRAC,
  TIMEVALUE,
  HOUR,
  MINUTE,
  SECOND,
  NETWORKDAYS,
  NETWORKDAYS$INTL,
  NOW,
  TODAY,
  TIME,
  WORKDAY,
  WORKDAY$INTL
} from "./Date"

// Using alias to bind dot-notation function names.
const __COMPLEX = {
  "F.DIST": FDIST$LEFTTAILED,
  "NETWORKDAYS.INTL": NETWORKDAYS$INTL,
  "WORKDAY.INTL": WORKDAY$INTL,
  "POISSON.DIST": POISSON,
  "PERCENTRANK.INC": PERCENTRANK,
  "PERCENTRANK.EXC": PERCENTRANK$EXC,
  "ERROR.TYPE": ERRORTYPE,
  "RANK.AVG": RANK$AVG,
  "RANK.EQ": RANK$EQ
};

const __TRY_CATCH_FORMULAS : Object = {
  "ERROR.TYPE": ERRORTYPE,
  "ERRORTYPE": ERRORTYPE,
  "ISERR": ISERR,
  "ISERROR": ISERROR,
  "ISNA": ISNA,
  "IFERROR": IFERROR
};

export {
  __COMPLEX,
  __TRY_CATCH_FORMULAS,

  ABS,
  ACOS,
  ACCRINT,
  ACOSH,
  ACOTH,
  AND,
  ARABIC,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  AVEDEV,
  AVERAGE,
  AVERAGEA,
  AVERAGEIF,
  BIN2DEC,
  BIN2HEX,
  BIN2OCT,
  CEILING,
  CHAR,
  CODE,
  COMBIN,
  CONCATENATE,
  CONVERT,
  CORREL,
  PEARSON,
  COS,
  PI,
  COSH,
  COT,
  COTH,
  COUNT,
  COUNTA,
  COUNTIF,
  COUNTIFS,
  COUNTUNIQUE,
  CUMIPMT,
  CUMPRINC,
  DATE,
  DATEVALUE,
  DAY,
  DAYS,
  DAYS360,
  DB,
  DDB,
  DEC2BIN,
  DEC2HEX,
  DEC2OCT,
  DEGREES,
  DELTA,
  DEVSQ,
  DOLLAR,
  DOLLARDE,
  DOLLARFR,
  EDATE,
  EFFECT,
  EOMONTH,
  ERF,
  ERFC,
  EVEN,
  EXACT,
  EXPONDIST,
  FALSE,
  FINV,
  FISHER,
  FISHERINV,
  FLOOR,
  IF,
  INT,
  ISEVEN,
  ISODD,
  LN,
  LOG,
  LOG10,
  MAX,
  MAXA,
  MEDIAN,
  MIN,
  MINA,
  MOD,
  TRUE,
  NOT,
  ODD,
  OR,
  POWER,
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SIN,
  SINH,
  SPLIT,
  SQRT,
  SQRTPI,
  SUM,
  SUMIF,
  SUMPRODUCT,
  SUMSQ,
  SUMX2MY2,
  SUMX2PY2,
  TAN,
  TANH,
  TRUNC,
  XOR,
  YEARFRAC,
  RADIANS,
  MONTH,
  YEAR,
  WEEKDAY,
  WEEKNUM,
  DATEDIF,
  TIMEVALUE,
  HOUR,
  MINUTE,
  SECOND,
  NETWORKDAYS,
  NETWORKDAYS$INTL,
  NOW,
  TODAY,
  TIME,
  WORKDAY,
  WORKDAY$INTL,
  MULTIPLY,
  MINUS,
  RAND,
  RANDBETWEEN,
  SIGN,
  DIVIDE,
  EQ,
  GT,
  GTE,
  LT,
  LTE,
  NE,
  NA,
  CHOOSE,
  GCD,
  TRIM,
  LCM,
  GAMMALN,
  QUARTILE,
  PERCENTILE,
  PRODUCT,
  QUOTIENT,
  UPLUS,
  UMINUS,
  STDEV,
  STDEVA,
  STDEVP,
  STDEVPA,
  ISTEXT,
  ISLOGICAL,
  ISNUMBER,
  ISNONTEXT,
  MROUND,
  FACTDOUBLE,
  FREQUENCY,
  GROWTH,
  TRIMMEAN,
  SLOPE,
  LOWER,
  UPPER,
  STANDARDIZE,
  SMALL,
  LARGE,
  KURT,
  INTERCEPT,
  FORECAST,
  SYD,
  SLN,
  NPV,
  NPER,
  NOMINAL,
  MIRR,
  IRR,
  IPMT,
  FV,
  ISEMAIL,
  ISURL,
  LINEST,
  POISSON,
  PERCENTRANK,
  PERCENTRANK$EXC,
  NORMSINV,
  NORMSDIST,
  NORMDIST,
  NORMINV,
  NEGBINOMDIST,
  GEOMEAN,
  HARMEAN,
  CONFIDENCE,
  N,
  UNARY_PERCENT,
  MULTINOMIAL,
  BINOMDIST,
  COVAR,
  ISREF,
  ERRORTYPE,
  ISBLANK,
  ISERR,
  ISERROR,
  ISNA,
  IFERROR,
  TYPE,
  COLUMN,
  ROW,
  T,
  PPMT,
  WEIBULL,
  VARPA,
  VARP,
  VARA,
  VAR,
  PERMUT,
  RSQ,
  SKEW,
  STEYX,
  PROB,
  MODE,
  RANK,
  RANK$AVG,
  RANK$EQ,
  LOGNORMDIST,
  TDIST,
  TO_DATE,
  TO_DOLLARS,
  TO_PERCENT,
  TO_TEXT,
  ISFORMULA,
  ADDRESS,
  COLUMNS,
  ROWS,
  SERIESSUM
}