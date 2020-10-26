export declare class DataProtector {
    static protect(dataToProtect: any, jsonPaths?: string[], lastPath?: string): any;
    static filterTest(jsonPaths: string[] | undefined, pathToTest: string): boolean;
    static protectString(stringToModify: string): string;
    static protectPrimitive(valueToModify: any): string;
    static protectNumber(numberToProtect: number): string;
    static isFloat(n: number): boolean;
    static isPrimitive(valueToTest: any): boolean;
    posixType(valueToTest: any): void;
}
//# sourceMappingURL=data-protector.d.ts.map