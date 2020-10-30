"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataProtector = /** @class */ (function () {
    function DataProtector() {
    }
    DataProtector.protect = function (dataToProtect, jsonPaths, lastPath) {
        if (jsonPaths === void 0) { jsonPaths = []; }
        if (lastPath === void 0) { lastPath = "$"; }
        // for initial object, we want to ensure it is a copy
        var copyDataToProtect;
        if (!DataProtector.isPrimitive(dataToProtect) && lastPath === "$") {
            copyDataToProtect = Object.assign({}, dataToProtect);
            ;
        }
        else {
            copyDataToProtect = dataToProtect;
        }
        if (Array.isArray(copyDataToProtect)) {
            for (var index in copyDataToProtect) {
                var currentJsonPath = lastPath + "[" + index + "]";
                copyDataToProtect[index] = this.protect(copyDataToProtect[index], jsonPaths, currentJsonPath);
            }
        }
        else if (copyDataToProtect === null) {
            copyDataToProtect = "null";
        }
        else if (typeof copyDataToProtect === "object") {
            for (var key in copyDataToProtect) {
                var currentJsonPath = lastPath + "." + key;
                copyDataToProtect[key] = this.protect(copyDataToProtect[key], jsonPaths, currentJsonPath);
            }
        }
        else {
            var whiltelistObj = DataProtector.getWhitelistObject(jsonPaths, lastPath);
            if (whiltelistObj !== undefined) {
                if (whiltelistObj.masker) {
                    copyDataToProtect = whiltelistObj.masker(copyDataToProtect);
                }
            }
            else {
                copyDataToProtect = DataProtector.protectPrimitive(copyDataToProtect);
            }
        }
        return copyDataToProtect;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1wcm90ZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS1wcm90ZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQTtJQUFBO0lBc0pBLENBQUM7SUFuSlUscUJBQU8sR0FBZCxVQUFlLGFBQWtCLEVBQUUsU0FBOEIsRUFBRSxRQUFzQjtRQUF0RCwwQkFBQSxFQUFBLGNBQThCO1FBQUUseUJBQUEsRUFBQSxjQUFzQjtRQUNyRixxREFBcUQ7UUFDckQsSUFBSSxpQkFBaUIsQ0FBQztRQUN0QixJQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxRQUFRLEtBQUssR0FBRyxFQUFHO1lBQ2pFLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQUEsQ0FBQztTQUN6RDthQUFNO1lBQ0gsaUJBQWlCLEdBQUcsYUFBYSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUc7WUFDcEMsS0FBTSxJQUFNLEtBQUssSUFBSSxpQkFBaUIsRUFBRztnQkFDckMsSUFBTSxlQUFlLEdBQU0sUUFBUSxTQUFJLEtBQUssTUFBRyxDQUFDO2dCQUNoRCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUNqRztTQUNKO2FBQU0sSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7WUFDbkMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO1NBQzlCO2FBQU0sSUFBSyxPQUFPLGlCQUFpQixLQUFLLFFBQVEsRUFBRztZQUNoRCxLQUFLLElBQU0sR0FBRyxJQUFJLGlCQUFpQixFQUFFO2dCQUNqQyxJQUFNLGVBQWUsR0FBTSxRQUFRLFNBQUksR0FBSyxDQUFDO2dCQUM3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