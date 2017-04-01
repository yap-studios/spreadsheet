import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

/**
 * Converts wild-card style expressions (in which * matches zero or more characters, and ? matches exactly one character)
 * to regular expressions. * and ? can be escaped by prefixing ~
 * @param c input
 * @returns {RegExp} resulting regex
 */
function wildCardRegex(c: string) {
  var a = c.split("~?");
  for (var i = 0; i < a.length; i++) {
    a[i] = a[i].split("?").join(".{1}");
  }
  var b = a.join("\\\?");
  var d = b.split("~*");
  for (var i = 0; i < d.length; i++) {
    d[i] = d[i].split("*").join(".*");
  }
  return new RegExp("^"+d.join(".*")+"$", "g");
}


/**
 * Creates a criteria function to evaluate elements in a range in an *IF function.
 */
class CriteriaFunctionFactory {
  /**
   * If the criteria is a number, use strict equality checking.
   * If the criteria is a string, check to see if it is a comparator.
   * If the criteria is a string, and it is not a comparator, check for regex.
   * If the criteria is a string and has not matched the above, finally use strict equality checking as a fallback.
   * If the criteria has not been set, default to false-returning criteria function.
   * @param criteria
   * @returns {(x:any)=>boolean}
   */
  static createCriteriaFunction(criteria: string) : Function {
    // Default criteria does nothing
    var criteriaEvaluation = function (x) : boolean {
      return false;
    };

    if (typeof criteria === "number" || typeof criteria === "boolean") {
      criteriaEvaluation = function (x) : boolean {
        return x === criteria;
      };
    } else if (typeof criteria === "string") {
      // https://regex101.com/r/c2hxAZ/6
      var comparisonMatches = criteria.match(/(^<=|^>=|^=|^>|^<)\s*(-?[0-9]+([,.][0-9]+)?)\s*$/);
      if (comparisonMatches !== null && comparisonMatches.length >= 4 && comparisonMatches[2] !== undefined) {
        criteriaEvaluation = function (x) : boolean {
          return eval(x + criteria);
        };
        if (comparisonMatches[1] === "=") {
          criteriaEvaluation = function (x) : boolean {
            return eval(x + "===" + comparisonMatches[2]);
          };
        }
      } else if (criteria.match(/\*|\~\*|\?|\~\?/) !== null) {
        // Regular string
        var matches = criteria.match(/\*|\~\*|\?|\~\?/);
        if (matches !== null) {
          criteriaEvaluation = function (x) : boolean {
            try {
              // http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
              return wildCardRegex(criteria).test(x);
            } catch (e) {
              return false;
            }
          };
        } else {
          criteriaEvaluation = function (x) : boolean {
            return x === criteria;
          };
        }
      } else {
        criteriaEvaluation = function (x) : boolean {
          return x === criteria;
        };
      }
    }
    return criteriaEvaluation;
  }
}

/**
 * Static class of helpers used to cast various types to each other.
 */
class TypeCaster {
  /**
   * Converts any value to a number or throws an error if it cannot coerce it to the number type
   * @param value to convert
   * @returns {number} to return. Will always return a number or throw an error. Never returns undefined.
   */
  static valueToNumber(value : any) {
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      if (value === "") {
        return 0;
      }
      if (value.indexOf(".") > -1) {
        var fl = parseFloat(value.replace("$", ""));
        if (isNaN(fl)) {
          throw new CellError(ERRORS.VALUE_ERROR, "Function ____ expects number values, but is text and cannot be coerced to a number.");
        }
        return fl;
      }
      var fl = parseInt(value.replace("$", ""));
      if (isNaN(fl)) {
        throw new CellError(ERRORS.VALUE_ERROR, "Function ____ expects number values, but is text and cannot be coerced to a number.");
      }
      return fl;
    } else if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    return 0;
  }

  /**
   * Converts any value to a number, defaulting to 0 value in cases in which it cannot coerce it to a number type
   * @param value to conver
   * @returns {number} to return. Will always return a number or 0.
   */
  static valueToNumberGracefully(value: any) : number {
    try {
      return TypeCaster.valueToNumber(value);
    } catch (e) {
      return 0;
    }
  }

  /**
   * Converts any value to a boolean or throws an error if it cannot coerce it to the boolean type.
   * @param value to convert
   * @returns {boolean} to return.
   */
  static valueToBoolean(value: any) {
    if (typeof value === "number") {
      return value !== 0;
    } else if (typeof value === "string") {
      throw new CellError(ERRORS.VALUE_ERROR, "___ expects boolean values. But '" + value + "' is a text and cannot be coerced to a boolean.")
    } else if (typeof value === "boolean") {
      return value;
    }
  }
  /**
   * Convert a value to string.
   * @param value of any type, including array. array cannot be empty.
   * @returns {string} string representation of value
   */
  static valueToString(value: any) : string {
    if (typeof value === "number") {
      return value.toString();
    } else if (typeof value === "string") {
      return value;
    } else if (typeof value === "boolean") {
      return value ? "TRUE" : "FALSE";
    } else if (value instanceof Array) {
      return this.valueToString(value[0]); // TODO: Take this out. It's stupid. We should handle arrays at a different level.
    }
  }

  /**
   * Returns true if we can coerce it to the number type.
   * @param value to coerce
   * @returns {boolean} if could be coerced to a number
   */
  static canCoerceToNumber(value: any) : boolean {
    if (typeof value === "number" || typeof value === "boolean") {
      return true;
    } else if (typeof value === "string") {
      if (value === "") {
        return false;
      }
      if (value.indexOf(".") > -1) {
        return !isNaN(parseFloat(value));
      }
      return !isNaN(parseInt(value));
    }
    return false;
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a number.
   * @param input to attempt to coerce into a number
   * @returns {number} number representation of the input
   */
  static firstValueAsNumber(input: any) : number {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      return TypeCaster.firstValueAsNumber(input[0]);
    }
    return TypeCaster.valueToNumber(input);
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a string.
   * @param input to attempt to coerce into a string
   * @returns {number} number representation of the input
   */
  static firstValueAsString(input: any) : string {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      return TypeCaster.firstValueAsString(input[0]);
    }
    return TypeCaster.valueToString(input);
  }

  static firstValue(input: any) : any {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      return TypeCaster.firstValue(input[0]);
    }
    return input;
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a string.
   * @param input to attempt to coerce into a string
   * @returns {number} number representation of the input
   */
  static firstValueAsBoolean(input: any): boolean {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      return TypeCaster.firstValueAsBoolean(input[0]);
    }
    return TypeCaster.valueToBoolean(input);
  }
}

/**
 * Static class to help filter down Arrays
 */
class Filter {
  /**
   * Converts string values in array to 0
   * @param arr to convert
   * @returns {Array} array in which all string values have been converted to 0.
   */
  static stringValuesToZeros(arr: Array<any>) : Array<any> {
    var toReturn = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "string") {
        toReturn.push(arr[i]);
      } else {
        toReturn.push(0);
      }
    }
    return toReturn;
  }

  /**
   * Flatten an array of arrays of ...etc.
   * @param values array of values
   * @returns {Array} flattened array
   */
  static flatten(values: Array<any>) : Array<any> {
    return values.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? Filter.flatten(toFlatten) : toFlatten);
    }, []);
  }

  /**
   * Flatten an array of arrays of... etc, but throw an error if any are empty references.
   * @param values array of values
   * @returns {Array} flattened array
   */
  static flattenAndThrow(values: Array<any>) : Array<any> {
    return values.reduce(function (flat, toFlatten) {
      if (Array.isArray(toFlatten) && toFlatten.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      return flat.concat(Array.isArray(toFlatten) ? Filter.flattenAndThrow(toFlatten) : toFlatten);
    }, []);
  }

  /**
   * Filter out all strings from an array.
   * @param arr to filter
   * @returns {Array} filtered array
   */
  static filterOutStringValues(arr: Array<any>) : Array<any> {
    var toReturn = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "string") {
        toReturn.push(arr[i]);
      }
    }
    return toReturn;
  }

  /**
   * Filters out non number values.
   * @param arr to filter
   * @returns {Array} filtered array
   */
  static filterOutNonNumberValues(arr: Array<any>) : Array<any> {
    var toReturn = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "string" && typeof arr[i] !== "boolean") {
        toReturn.push(arr[i]);
      }
    }
    return toReturn;
  }
}

/**
 * Static class to check argument length within expected ranges when calling functions.
 */
class ArgsChecker {
  /**
   * Checks to see if the arguments are of the correct length.
   * @param args to check length of
   * @param length expected length
   */
  static checkLength(args: any, length: number) {
    if (args.length !== length) {
      throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are at least a certain length.
   * @param args to check length of
   * @param length expected length
   */
  static checkAtLeastLength(args: any, length: number) {
    if (args.length < length) {
      throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are within a max and min, inclusively
   * @param args to check length of
   * @param low least number of arguments
   * @param high max number of arguments
   */
  static checkLengthWithin(args: any, low: number, high: number) {
    if (args.length > high || args.length < low) {
      throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }
}

/**
 * Class to hold static methods for serialization.
 */
class Serializer {
  static serialize(value: any) : string {
    var t = typeof value;
    return "<" +  t + ": " + value + ">";
  }
}


/**
 * Build a regular expression step by step, to make it easier to build and read the resulting regular expressions.
 */
class DateRegExBuilder {
  private regexString = "";
  private static ZERO_OR_MORE_SPACES = "\\s*";

  static DateRegExBuilder() : DateRegExBuilder {
    return new DateRegExBuilder();
  }

  /**
   * Start the regular expression builder by matching the start of a line and zero or more spaces.
   * @returns {DateRegExBuilder} builder
   */
  start() : DateRegExBuilder {
    this.regexString += "^" + DateRegExBuilder.ZERO_OR_MORE_SPACES;
    return this;
  }

  /**
   * End the regular expression builder by matching the end of the line.
   * @returns {DateRegExBuilder} builder
   */
  end(): DateRegExBuilder {
    this.regexString += "$";
    return this;
  }

  /**
   * Capture all month full name and short names to the regular expression.
   * @returns {DateRegExBuilder} builder
   */
  MONTHNAME() : DateRegExBuilder {
    this.regexString += "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)";
    return this;
  }

  /**
   * Capture all month full name and short names to the regular expression, in addition to any followed by one or more
   * spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  MONTHNAME_W_SPACE() : DateRegExBuilder {
    this.regexString += "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec|january\\s+|february\\s+|march\\s+|april\\s+|may\\s+|june\\s+|july\\s+|august\\s+|september\\s+|october\\s+|november\\s+|december\\s+|jan\\s+|feb\\s+|mar\\s+|apr\\s+|jun\\s+|jul\\s+|aug\\s+|sep\\s+|oct\\s+|nov\\s+|dec\\s+)";
    return this;
  }

  /**
   * Add capture group for optionally capturing day names.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  OPTIONAL_DAYNAME() : DateRegExBuilder {
    this.regexString += "(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)?";
    return this;
  }

  /**
   * Add capture group for optionally capturing a comma followed by one or more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  OPTIONAL_COMMA() : DateRegExBuilder {
    this.regexString += "(,?\\s+)?";
    return this;
  }

  /**
   * Add capture group for capturing month digits between 01 and 12, inclusively.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  MM() : DateRegExBuilder {
    this.regexString += "([1-9]|0[1-9]|1[0-2])";
    return this;
  }

  /**
   * Add capture group for capturing month digits between 01 and 12, inclusively, in addition to any followed by one or
   * more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  MM_W_SPACE() : DateRegExBuilder {
    this.regexString += "([1-9]|0[1-9]|1[0-2]|[1-9]\\s+|0[1-9]\\s+|1[0-2]\\s+)";
    return this;
  }

  /**
   * Add capture group for capturing day digits between 01 and 31, inclusively.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  DD() : DateRegExBuilder {
    this.regexString += "(0?[0-9]|1[0-9]|2[0-9]|3[0-1])";
    return this;
  }

  /**
   * Add capture group for capturing day digits between 01 and 31, inclusively, in addition to any followed by one or
   * more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  DD_W_SPACE() : DateRegExBuilder {
    this.regexString += "(0?[0-9]|1[0-9]|2[0-9]|3[0-1]|0?[0-9]\\s+|1[0-9]\\s+|2[0-9]\\s+|3[0-1]\\s+)";
    return this;
  }

  /**
   * Add capture group for capturing 4 digits or 3 digits starting with 0-9.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  YYYY() : DateRegExBuilder {
    this.regexString += "([0-9]{4}|[1-9][0-9][0-9])";
    return this;
  }

  /**
   * Add capture group for capturing 1 through 4 digits.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  YYYY14() : DateRegExBuilder {
    this.regexString += "([0-9]{1,4})";
    return this;
  }

  /**
   * Add capture group for capturing 1 through 4 digits, in addition to any followed by one or more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  YYYY14_W_SPACE() : DateRegExBuilder {
    this.regexString += "([0-9]{1,4}|[0-9]{1,4}\\s+)";
    return this;
  }

  /**
   * Add capture group for a flexible delimiter, including ", ", " ", ".", "\", "-".
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  FLEX_DELIMITER() : DateRegExBuilder {
    this.regexString += "(,?\\s+|\\s*-?\\.?-?\\/?\\s*)";
    return this;
  }

  /**
   * Add a capture group for capturing timestamps including: "10am", "10:10", "10:10pm", "10:10:10", "10:10:10am", along
   * with zero or more spaces after semi colons, AM or PM, and unlimited number of digits per unit.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  OPTIONAL_TIMESTAMP_CAPTURE_GROUP() : DateRegExBuilder {
    this.regexString += "((\\s+[0-9]+\\s*am\\s*$|[0-9]+\\s*pm\\s*$)|(\\s+[0-9]+:\\s*[0-9]+\\s*$)|(\\s+[0-9]+:\\s*[0-9]+\\s*am\\s*$|\\s+[0-9]+:\\s*[0-9]+\\s*pm\\s*$)|(\\s+[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*$)|(\\s+[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*am\\s*$|[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*pm\\s*$))?";
    return this;
  }

  TIMESTAMP_UNITS_CAPTURE_GROUP() : DateRegExBuilder {
    this.regexString += "(\\s+([0-9]+)()()\\s*(am|pm)\\s*$)|(\\s+([0-9]+):\\s*([0-9]+)()()\\s*$)|(\\s+(([0-9]+):\\s*([0-9]+)()\\s*(am|pm))\\s*$)|(\\s+(([0-9]+):\\s*([0-9]+):\\s*([0-9]+)())\\s*$)|(\\s+(([0-9]+):\\s*([0-9]+):\\s*([0-9]+)\\s*(am|pm))\\s*$)";
    return this;
  }

  /**
   * Build the regular expression and ignore case.
   * @returns {RegExp}
   */
  build() : RegExp {
    return new RegExp(this.regexString, 'i');
  }
}


export {
  ArgsChecker,
  CriteriaFunctionFactory,
  DateRegExBuilder,
  Filter,
  Serializer,
  TypeCaster
}