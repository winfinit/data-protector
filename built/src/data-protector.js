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
                if (whiltelistObj.masker) {
                    dataToProtect = whiltelistObj.masker(dataToProtect);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1wcm90ZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS1wcm90ZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQTtJQUFBO0lBK0lBLENBQUM7SUE1SVUscUJBQU8sR0FBZCxVQUFlLGFBQWtCLEVBQUUsU0FBOEIsRUFBRSxRQUFzQjtRQUF0RCwwQkFBQSxFQUFBLGNBQThCO1FBQUUseUJBQUEsRUFBQSxjQUFzQjtRQUNyRixJQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUc7WUFDaEMsS0FBTSxJQUFNLEtBQUssSUFBSSxhQUFhLEVBQUc7Z0JBQ2pDLElBQU0sZUFBZSxHQUFNLFFBQVEsU0FBSSxLQUFLLE1BQUcsQ0FBQztnQkFDaEQsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUN6RjtTQUNKO2FBQU0sSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQy9CLGFBQWEsR0FBRyxNQUFNLENBQUM7U0FDMUI7YUFBTSxJQUFLLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRztZQUM1QyxLQUFLLElBQU0sR0FBRyxJQUFJLGFBQWEsRUFBRTtnQkFDN0IsSUFBTSxlQUFlLEdBQU0sUUFBUSxTQUFJLEdBQUssQ0FBQztnQkFDN0MsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQzthQUNyRjtTQUNKO2FBQU07WUFDSCxJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVFLElBQUssYUFBYSxLQUFLLFNBQVMsRUFBRztnQkFDL0IsSUFBSyxhQUFhLENBQUMsTUFBTSxFQUFHO29CQUN4QixhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDdkQ7YUFDSjtpQkFBTTtnQkFDSCxhQUFhLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0o7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRU0sZ0NBQWtCLEdBQXpCLFVBQTBCLFNBQThCLEVBQUUsVUFBa0I7UUFBbEQsMEJBQUEsRUFBQSxjQUE4QjtRQUNwRCxJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUM3RSxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0sMkJBQWEsR0FBcEIsVUFBcUIsY0FBc0I7UUFDdkMsSUFBSSxjQUFjLEdBQUcsWUFBVSxjQUFjLENBQUMsTUFBTSxNQUFHLENBQUM7UUFFeEQsSUFBSyxjQUFjLEtBQUssRUFBRSxFQUFHO1lBQ3pCLGNBQWMsSUFBSSxRQUFRLENBQUM7WUFDM0IsT0FBTyxjQUFjLENBQUM7U0FDekI7UUFFRCxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7UUFDekIsNEJBQTRCO1FBQzVCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRztZQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFHO1lBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUc7WUFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4QjtRQUNELElBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRztZQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFHO1lBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUc7WUFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6QjtRQUVELGNBQWMsSUFBSSxlQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQUcsQ0FBQztRQUVsRCxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRU0sOEJBQWdCLEdBQXZCLFVBQXdCLGFBQWtCO1FBRXRDLElBQUssT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFHO1lBQ3JDLE9BQU8sYUFBYSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUssT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQzNDLE9BQU8sYUFBYSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUssT0FBTyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQzVDLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO2FBQU0sSUFBSyxPQUFPLGFBQWEsS0FBSyxXQUFXLEVBQUU7WUFDOUMsT0FBTyxXQUFXLENBQUM7U0FDdEI7YUFBTSxJQUFJLE9BQU8sYUFBYSxLQUFLLFVBQVUsRUFBRztZQUM3QyxPQUFPLFVBQVUsQ0FBQztTQUNyQjthQUFNLElBQUssYUFBYSxLQUFLLElBQUksRUFBRztZQUNqQyxPQUFPLE1BQU0sQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTyxlQUFlLEdBQUcsT0FBTyxhQUFhLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBRU0sMkJBQWEsR0FBcEIsVUFBcUIsZUFBdUI7UUFDcEMsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkQsSUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRTVCLElBQUssZUFBZSxHQUFHLENBQUMsRUFBRztZQUN2QixrQkFBa0IsR0FBRyxVQUFVLENBQUM7WUFDaEMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNkO2FBQU07WUFDSCxrQkFBa0IsR0FBRyxVQUFVLENBQUM7U0FDbkM7UUFFRCxJQUFLLE9BQU8sRUFBRztZQUNYLElBQU0sZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxJQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDakQsSUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDcEQsY0FBYyxJQUFJLGFBQVUsYUFBYSxHQUFHLE1BQU0sVUFBSSxnQkFBZ0IsTUFBRyxDQUFDO1NBQzdFO2FBQU07WUFDSCxJQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQzFDLGNBQWMsSUFBSSxXQUFRLFdBQVcsR0FBRyxNQUFNLE9BQUcsQ0FBQztTQUNyRDtRQUVELGNBQWMsSUFBSSxNQUFJLGtCQUFvQixDQUFDO1FBRTNDLE9BQU8sY0FBYyxDQUFDO0lBQzlCLENBQUM7SUFFTSxxQkFBTyxHQUFkLFVBQWUsQ0FBUztRQUNwQixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLHlCQUFXLEdBQWxCLFVBQW1CLFdBQWdCO1FBQy9CLElBQUssT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFHO1lBQ25DLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTSxJQUFLLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQU0sSUFBSyxPQUFPLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDMUMsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNLElBQUssT0FBTyxXQUFXLEtBQUssV0FBVyxFQUFFO1lBQzVDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTSxJQUFLLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUMzQyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQU0sSUFBSyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsaUNBQVMsR0FBVCxVQUFVLFdBQWdCO0lBRTFCLENBQUM7SUFHTCxvQkFBQztBQUFELENBQUMsQUEvSUQsSUErSUM7QUEvSVksc0NBQWEifQ==