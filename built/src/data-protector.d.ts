interface filterObject {
    "jsonPath": string;
    "masker"?: (valueToProtect: string) => string;
}
export declare class DataProtector {
    static protect(dataToProtect: any, jsonPaths?: filterObject[], lastPath?: string): any;
    static getWhitelistObject(jsonPaths: filterObject[] | undefined, pathToTest: string): filterObject | undefined;
    static protectString(stringToModify: string): string;
    static protectPrimitive(valueToModify: any): string;
    static protectNumber(numberToProtect: number): string;
    static isFloat(n: number): boolean;
    static isPrimitive(valueToTest: any): boolean;
    posixType(valueToTest: any): void;
}
export {};
//# sourceMappingURL=data-protector.d.ts.map