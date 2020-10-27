export class DataProtector {


    static protect(dataToProtect: any, jsonPaths: string[] = [], lastPath: string = "$"): any {
        if ( Array.isArray(dataToProtect) ) {
            for ( const index in dataToProtect ) {
                const currentJsonPath = `${lastPath}[${index}]`;
                dataToProtect[index] = this.protect(dataToProtect[index], jsonPaths, currentJsonPath);                    
            }
        }  else if (dataToProtect === null) {
            dataToProtect = "null";
        } else if ( typeof dataToProtect === "object" ) {
            for (const key in dataToProtect) {
                const currentJsonPath = `${lastPath}.${key}`;
                dataToProtect[key] = this.protect(dataToProtect[key], jsonPaths, currentJsonPath);
            }
        } else {
            if (! DataProtector.filterTest(jsonPaths, lastPath) ) {
                dataToProtect = DataProtector.protectPrimitive(dataToProtect);
            }
        }
        return dataToProtect;
    }

    static filterTest(jsonPaths: string[] = [], pathToTest: string): boolean {
        if ( jsonPaths.includes(pathToTest) ) {
            return true;
        } else {
            return false;
        }
    }

    static protectString(stringToModify: string): string {
        let valueToProtect = `string(${stringToModify.length})`;

        if ( stringToModify === "" ) {
            valueToProtect += ".empty";
            return valueToProtect;
        } 

        let types: string[] = [];
        // check if contains letters
        if (/[A-Z]/.test(stringToModify) ) {
            types.push("upper");
        }
        if ( /[a-z]/.test(stringToModify) ) {
            types.push("lower");
        }
        if ( /[0-9]/.test(stringToModify) ) {
            types.push("number");
        }
        if ( /\W|_/.test(stringToModify) ) {
            types.push("special");
        }
        if ( /\s/.test(stringToModify) ) {
            types.push("space");
        }
        if ( /[\n\r]/.test(stringToModify) ) {
            types.push("newline");
        }

        valueToProtect += `.contains(${types.join(',')})`;

        return valueToProtect;
    }

    static protectPrimitive(valueToModify: any): string {
        if (! DataProtector.isPrimitive(valueToModify) ) {
            throw new Error("passed value is not a primitive type");
        }

        if ( typeof valueToModify === "number" ) {
            return DataProtector.protectNumber(valueToModify);
        } else if ( typeof valueToModify === "string") {
            return DataProtector.protectString(valueToModify);
        } else if ( typeof valueToModify === "boolean") {
            return "boolean";
        } else if ( typeof valueToModify === "undefined") {
            return "undefined";
        } else if (typeof valueToModify === "function" ) {
            return "function";
        } else if ( valueToModify === null ) {
            return "null";
        } else {
            return "unknown-type-" + typeof valueToModify;
        }
    }

    static protectNumber(numberToProtect: number): string {
            let protectedValue = "number";
            const isFloat = DataProtector.isFloat(numberToProtect);
            const numberAsString = numberToProtect.toString();
            let offset = 0;
            let positiveOrNegative = "";

            if ( numberToProtect < 0 ) {
                positiveOrNegative = "negative";
                offset = 1;
            } else {
                positiveOrNegative = "positive";
            }

            if ( isFloat ) {    
                const splitFloatString = numberAsString.split(".");
                const lengthOfWhole = splitFloatString[0].length;
                const lenghtOfFraction = splitFloatString[1].length;
                protectedValue += `.float(${lengthOfWhole - offset},${lenghtOfFraction})`;
            } else {
                const lengthOfInt = numberAsString.length;
                protectedValue += `.int(${lengthOfInt - offset})`;
            }

            protectedValue += `.${positiveOrNegative}`;        
            
            return protectedValue;
    }

    static isFloat(n: number): boolean{
        return Number(n) === n && n % 1 !== 0;
    }

    static isPrimitive(valueToTest: any): boolean {
        if ( typeof valueToTest === "number" ) {
            return true;
        } else if ( typeof valueToTest === "string") {
            return true;
        } else if ( typeof valueToTest === "boolean") {
            return true;
        } else if ( typeof valueToTest === "undefined") {
            return true;
        } else if ( typeof valueToTest === "function") {
            return true;
        } else if ( valueToTest === null) {
            return true;
        }

        return false;
    }

    posixType(valueToTest: any) {

    }

   
}