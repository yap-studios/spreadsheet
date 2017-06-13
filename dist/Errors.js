"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var NULL_ERROR = "#NULL!";
exports.NULL_ERROR = NULL_ERROR;
var DIV_ZERO_ERROR = "#DIV/0!";
exports.DIV_ZERO_ERROR = DIV_ZERO_ERROR;
var VALUE_ERROR = "#VALUE!";
exports.VALUE_ERROR = VALUE_ERROR;
var REF_ERROR = "#REF!";
exports.REF_ERROR = REF_ERROR;
var NAME_ERROR = "#NAME!";
exports.NAME_ERROR = NAME_ERROR;
var NUM_ERROR = "#NUM!";
exports.NUM_ERROR = NUM_ERROR;
var NA_ERROR = "#N/A";
exports.NA_ERROR = NA_ERROR;
var NullError = (function (_super) {
    __extends(NullError, _super);
    function NullError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NULL_ERROR;
        return _this;
    }
    return NullError;
}(Error));
exports.NullError = NullError;
var DivZeroError = (function (_super) {
    __extends(DivZeroError, _super);
    function DivZeroError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = DIV_ZERO_ERROR;
        return _this;
    }
    return DivZeroError;
}(Error));
exports.DivZeroError = DivZeroError;
var ValueError = (function (_super) {
    __extends(ValueError, _super);
    function ValueError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = VALUE_ERROR;
        return _this;
    }
    return ValueError;
}(Error));
exports.ValueError = ValueError;
var RefError = (function (_super) {
    __extends(RefError, _super);
    function RefError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = REF_ERROR;
        return _this;
    }
    return RefError;
}(Error));
exports.RefError = RefError;
var NameError = (function (_super) {
    __extends(NameError, _super);
    function NameError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NAME_ERROR;
        return _this;
    }
    return NameError;
}(Error));
exports.NameError = NameError;
var NumError = (function (_super) {
    __extends(NumError, _super);
    function NumError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NUM_ERROR;
        return _this;
    }
    return NumError;
}(Error));
exports.NumError = NumError;
var NAError = (function (_super) {
    __extends(NAError, _super);
    function NAError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NA_ERROR;
        return _this;
    }
    return NAError;
}(Error));
exports.NAError = NAError;