/**
 * Static class for building objects using variables as keys. Mostly used in situations where we want to build objects
 * with similar key structures inside of arrays.
 * ```
 * var m = "key";
 * var n = "another"
 * var x = [
 *   ObjectFromPairs.of([
 *     m, 1,
 *     n, 2
 *   ]);
 * ]
 * ```
 * The example above would result in: `{"key": 1, "another": 2}`.
 * NOTE: This code does not perform well, and should be used sparingly.
 */
class ObjectFromPairs {
  /**
   * Creates an object from pairs.
   * @param values - Even number of values, where odd-indexed values will be used as keys, and even-indexed values will
   * be used as values in the object. If function is given odd number of values the last value will still be used as a
   * key for which the value will be undefined. Use at your own risk.
   * @returns {{}}
   */
  static of(values : Array<any>) {
    var o = {};
    for (var i = 0; i < values.length - 1; i = i + 2) {
      if (i % 2 === 0) {
        o[values[i]] = values[i+1];
      }
    }
    return o;
  }
}

export {
  ObjectFromPairs
}