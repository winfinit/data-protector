var expect = require('chai').expect;
import {
    DataProtector
} from '../src/data-protector';

describe('DataProtector class', function() {

    it('isPrimitive number', () => {
        const protectedString = DataProtector.isPrimitive(1);
        expect(protectedString).to.be.true;
    });

    it('isPrimitive string', () => {
        const protectedString = DataProtector.isPrimitive("test");
        expect(protectedString).to.be.true;
    });

    it('isPrimitive boolean', () => {
        const protectedString = DataProtector.isPrimitive(true);
        expect(protectedString).to.be.true;
    });

    it('isPrimitive undefined', () => {
        const protectedString = DataProtector.isPrimitive(undefined);
        expect(protectedString).to.be.true;
    });

    it('isPrimitive object', () => {
        const protectedString = DataProtector.isPrimitive({});
        expect(protectedString).to.be.false;
    });

    it('isPrimitive array', () => {
        const protectedString = DataProtector.isPrimitive([]);
        expect(protectedString).to.be.false;
    });

    it('should protect whole positive number', () => {
        const protectedString = DataProtector.protectNumber(10);
        expect(protectedString).to.be.equal("number.int(2).positive");

    });

    it('should protect whole negative number', () => {
        const protectedString = DataProtector.protectNumber(-10);
        expect(protectedString).to.be.equal("number.int(2).negative");

    });

    it('should protect float positive number', () => {
        const protectedString = DataProtector.protectNumber(10.22);
        expect(protectedString).to.be.equal("number.float(2,2).positive");

    });

    it('should protect float negative number', () => {
        const protectedString = DataProtector.protectNumber(-10.22);
        expect(protectedString).to.be.equal("number.float(2,2).negative");
    });

    it('should protect float negative number', () => {
        const protectedString = DataProtector.protectNumber(-10.22);
        expect(protectedString).to.be.equal("number.float(2,2).negative");
    });
    
    it('should protect primitive number', () => {
        const protectedString = DataProtector.protectPrimitive(-10.22);
        expect(protectedString).to.be.equal("number.float(2,2).negative");
    });

    it('should protect primitive string', () => {
        const protectedString = DataProtector.protectPrimitive("test");
        expect(protectedString).to.be.equal("string(4).contains(lower)");
    });

    it('should protect string', () => {
        const protectedString = DataProtector.protectString("test");
        expect(protectedString).to.be.equal("string(4).contains(lower)");
    });

    it('should protect string (empty)', () => {
        const protectedString = DataProtector.protectString("");
        expect(protectedString).to.be.equal("string(0).empty");
    });

    it('should protect string (upper,lower)', () => {
        const protectedString = DataProtector.protectString("Test");
        expect(protectedString).to.be.equal("string(4).contains(upper,lower)");
    });

    it('should protect string (upper,lower,number)', () => {
        const protectedString = DataProtector.protectString("Test1");
        expect(protectedString).to.be.equal("string(5).contains(upper,lower,number)");
    });

    it('should protect string (upper,lower,number,special)', () => {
        const protectedString = DataProtector.protectString("Test1_");
        expect(protectedString).to.be.equal("string(6).contains(upper,lower,number,special)");
    });

    it('should protect string (upper,lower,number,special,space)', () => {
        const protectedString = DataProtector.protectString("Test1_ ");
        expect(protectedString).to.be.equal("string(7).contains(upper,lower,number,special,space)");
    });

    it('should protect string (upper,lower,number,special,space,newline)', () => {
        const protectedString = DataProtector.protectString("Test1_ \n");
        expect(protectedString).to.be.equal("string(8).contains(upper,lower,number,special,space,newline)");
    });

    it('should protect primitive' , () => {
        const protectedArray = DataProtector.protect(-20.44);

        expect(protectedArray).to.equal("number.float(2,2).negative");
    });

    it('should protect simple array' , () => {
        const protectedArray = DataProtector.protect([-20.44, "String4*", false, "", undefined]);

        expect(protectedArray[0]).to.equal("number.float(2,2).negative");
        expect(protectedArray[1]).to.equal("string(8).contains(upper,lower,number,special)");
        expect(protectedArray[2]).to.equal("boolean");
        expect(protectedArray[3]).to.equal("string(0).empty");
        expect(protectedArray[4]).to.equal("undefined");
    });

    it('should protect complex array' , () => {
        const protectedArray = DataProtector.protect([-20.44, "String4*", false, "", undefined, [1], [{
            number: 1,
            object: {
                key: -0.4,
                arr: [1, 'string']
            }
        }]]);

        //console.log(JSON.stringify(protectedArray, null, "\t"));

        expect(protectedArray[0]).to.equal("number.float(2,2).negative");
        expect(protectedArray[1]).to.equal("string(8).contains(upper,lower,number,special)");
        expect(protectedArray[2]).to.equal("boolean");
        expect(protectedArray[3]).to.equal("string(0).empty");
        expect(protectedArray[4]).to.equal("undefined");
        expect(protectedArray[5]).to.be.an("array");
        expect(protectedArray[5][0]).to.equal("number.int(1).positive");
        expect(protectedArray[6]).to.be.an("array");
        expect(protectedArray[6][0]).to.have.a.property("number").that.equals("number.int(1).positive");
        expect(protectedArray[6][0]).to.have.a.property("object").that.is.an("object");
        expect(protectedArray[6][0].object).to.have.a.property("key").that.equals("number.float(1,1).negative");
    });

    it('should protect complex object' , () => {
        const protectedObject = DataProtector.protect({
            string: "string",
            number: 123,
            array: [123, {
                string: "someString"
            }],
            undefined: undefined,
            empty: "",
            boolean: true,
            null: null,
            function: function() {}
        });

        //console.log(JSON.stringify(protectedObject, null, "\t"))

        expect(protectedObject).to.have.a.property("function").that.equals("function");
        expect(protectedObject).to.have.a.property("null").that.equals("null");
        expect(protectedObject).to.have.a.property("string").that.equals("string(6).contains(lower)");
        expect(protectedObject).to.have.a.property("number").that.is.equal("number.int(3).positive");
        expect(protectedObject).to.have.a.property("undefined").that.is.equal("undefined");
        expect(protectedObject).to.have.a.property("empty").that.is.equal("string(0).empty");
        expect(protectedObject).to.have.a.property("boolean").that.is.equal("boolean");
        expect(protectedObject).to.have.a.property("array");
        expect(protectedObject.array[1]).to.have.a.property("string").that.equals("string(10).contains(upper,lower)");
        expect(protectedObject.array[0]).to.equals("number.int(3).positive");
    });

    it('should protect simple object with white list' , () => {
        const protectedObject = DataProtector.protect({
            string: "string",
            number: 123,
            undefined: undefined,
            empty: "",
            boolean: true
        }, [{jsonPath: "$.number"}]);

        // console.log("protectedObject", protectedObject);
        
        expect(protectedObject).to.have.a.property("string").that.equals("string(6).contains(lower)");
        expect(protectedObject).to.have.a.property("number").that.equals(123);
        expect(protectedObject).to.have.a.property("undefined").that.is.equal("undefined");
        expect(protectedObject).to.have.a.property("empty").that.is.equal("string(0).empty");
        expect(protectedObject).to.have.a.property("boolean").that.is.equal("boolean");
    });

    it('should protect complex object with a filter' , () => {
        const originalObject: any = {
            string: "string",
            number: 123,
            array: [123, {
                string: "someString",
                string2: "someString2"
            }],
            array2: [123, {
                string: "someString"
            }],
            undefined: undefined,
            empty: "",
            boolean: true
        };
        const protectedObject = DataProtector.protect(originalObject, [{jsonPath: "$.array[0]"}, {jsonPath: "$.array[1].string2"}]);

        //console.log(JSON.stringify(protectedObject, null, "\t"))

        expect(protectedObject).to.have.a.property("string").that.equals("string(6).contains(lower)");
        expect(protectedObject).to.have.a.property("number").that.is.equal("number.int(3).positive");
        expect(protectedObject).to.have.a.property("undefined").that.is.equal("undefined");
        expect(protectedObject).to.have.a.property("empty").that.is.equal("string(0).empty");
        expect(protectedObject).to.have.a.property("boolean").that.is.equal("boolean");
        expect(protectedObject).to.have.a.property("array");
        expect(protectedObject.array[1]).to.have.a.property("string").that.equals("string(10).contains(upper,lower)");
        expect(protectedObject.array[1]).to.have.a.property("string2").that.equals("someString2");
        expect(protectedObject.array[0]).to.equals(123);

        expect(originalObject.array2[0]).to.equal(123);
        expect(originalObject.array2[1].string).to.equal("someString");
    });

    it('custom filter' , () => {
        const protectedObject = DataProtector.protect({
            array: [123, {
                string: "someString",
                string2: "someString2"
            }],
        }, [{jsonPath: "$.array[0]", masker: (valueToMask) => {
            return "xxx";
        }}]);

        //console.log(JSON.stringify(protectedObject, null, "\t"))

        expect(protectedObject.array[1]).to.have.a.property("string").that.equals("string(10).contains(upper,lower)");
        expect(protectedObject.array[1]).to.have.a.property("string2").that.equals("string(11).contains(upper,lower,number)");
        expect(protectedObject.array[0]).to.equals("xxx");
    });

});