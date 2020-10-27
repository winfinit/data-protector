"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataProtector = /** @class */ (function () {
    function DataProtector() {
    }
    DataProtector.protect = function (dataToProtect, jsonPaths, lastPath) {
        if (jsonPaths === void 0) { jsonPaths = []; }
        if (lastPath === void 0) { lastPath = "$"; }
        if (Array.isArray(dataToProtect)) {
            for (var index in dataToProtect) {
                var currentJsonPath = lastPath + "[" + index + "]";
                dataToProtect[index] = this.protect(dataToProtect[index], jsonPaths, currentJsonPath);
            }
        }
        else if (dataToProtect === null) {
            dataToProtect = "null";
        }
        else if (typeof dataToProtect === "object") {
            for (var key in dataToProtect) {
                var currentJsonPath = lastPath + "." + key;
                dataToProtect[key] = this.protect(dataToProtect[key], jsonPaths, currentJsonPath);
            }
        }
        else {
            var whiltelistObj = DataProtector.getWhitelistObject(jsonPaths, lastPath);
            if (whiltelistObj !== undefined) {
                if (whiltelistObj.filter) {
                    dataToProtect = whiltelistObj.filter(dataToProtect);
                }
            }
            else {
                dataToProtect = DataProtector.protectPrimitive(dataToProtect);
            }
        }
        return dataToProtect;
    };
    DataProtector.getWhitelistObject = function (jsonPaths, pathToTest) {
        if (jsonPaths === void 0) { jsonPaths = []; }
        var returnObj = jsonPaths.find(function (element) { return element.jsonPath === pathToTest; });
        return returnObj;
    };
    DataProtector.protectString = function (stringToModify) {
        var valueToProtect = "string(" + stringToModify.length + ")";
        if (stringToModify === "") {
            valueToProtect += ".empty";
            return valueToProtect;
        }
        var types = [];
        // check if contains letters
        if (/[A-Z]/.test(stringToModify)) {
            types.push("upper");
        }
        if (/[a-z]/.test(stringToModify)) {
            types.push("lower");
        }
        if (/[0-9]/.test(stringToModify)) {
            types.push("number");
        }
        if (/\W|_/.test(stringToModify)) {
            types.push("special");
        }
        if (/\s/.test(stringToModify)) {
            types.push("space");
        }
        if (/[\n\r]/.test(stringToModify)) {
            types.push("newline");
        }
        valueToProtect += ".contains(" + types.join(',') + ")";
        return valueToProtect;
    };
    DataProtector.protectPrimitive = function (valueToModify) {
        if (typeof valueToModify === "number") {
            return DataProtector.protectNumber(valueToModify);
        }
        else if (typeof valueToModify === "string") {
            return DataProtector.protectString(valueToModify);
        }
        else if (typeof valueToModify === "boolean") {
            return "boolean";
        }
        else if (typeof valueToModify === "undefined") {
            return "undefined";
        }
        else if (typeof valueToModify === "function") {
            return "function";
        }
        else if (valueToModify === null) {
            return "null";
        }
        else {
            return "unknown-type-" + typeof valueToModify;
        }
    };
    DataProtector.protectNumber = function (numberToProtect) {
        var protectedValue = "number";
        var isFloat = DataProtector.isFloat(numberToProtect);
        var numberAsString = numberToProtect.toString();
        var offset = 0;
        var positiveOrNegative = "";
        if (numberToProtect < 0) {
            positiveOrNegative = "negative";
            offset = 1;
        }
        else {
            positiveOrNegative = "positive";
        }
        if (isFloat) {
            var splitFloatString = numberAsString.split(".");
            var lengthOfWhole = splitFloatString[0].length;
            var lenghtOfFraction = splitFloatString[1].length;
            protectedValue += ".float(" + (lengthOfWhole - offset) + "," + lenghtOfFraction + ")";
        }
        else {
            var lengthOfInt = numberAsString.length;
            protectedValue += ".int(" + (lengthOfInt - offset) + ")";
        }
        protectedValue += "." + positiveOrNegative;
        return protectedValue;
    };
    DataProtector.isFloat = function (n) {
        return Number(n) === n && n % 1 !== 0;
    };
    DataProtector.isPrimitive = function (valueToTest) {
        if (typeof valueToTest === "number") {
            return true;
        }
        else if (typeof valueToTest === "string") {
            return true;
        }
        else if (typeof valueToTest === "boolean") {
            return true;
        }
        else if (typeof valueToTest === "undefined") {
            return true;
        }
        else if (typeof valueToTest === "function") {
            return true;
        }
        else if (valueToTest === null) {
            return true;
        }
        return false;
    };
    DataProtector.prototype.posixType = function (valueToTest) {
    };
    return DataProtector;
}());
exports.DataProtector = DataProtector;
//# sourceMappingURL=data-protector.js.map