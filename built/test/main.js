"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
var data_protector_1 = require("../src/data-protector");
describe('DataProtector class', function () {
    it('isPrimitive number', function () {
        var protectedString = data_protector_1.DataProtector.isPrimitive(1);
        expect(protectedString).to.be.true;
    });
    it('isPrimitive string', function () {
        var protectedString = data_protector_1.DataProtector.isPrimitive("test");
        expect(protectedString).to.be.true;
    });
    it('isPrimitive boolean', function () {
        var protectedString = data_protector_1.DataProtector.isPrimitive(true);
        expect(protectedString).to.be.true;
    });
    it('isPrimitive undefined', function () {
        var protectedString = data_protector_1.DataProtector.isPrimitive(undefined);
        expect(protectedString).to.be.true;
    });
    it('isPrimitive object', function () {
        var protectedString = data_protector_1.DataProtector.isPrimitive({});
        expect(protectedString).to.be.false;
    });
    it('isPrimitive array', function () {
        var protectedString = data_protector_1.DataProtector.isPrimitive([]);
        expect(protectedString).to.be.false;
    });
    it('should protect whole positive number', function () {
        var protectedString = data_protector_1.DataProtector.protectNumber(10);
        expect(protectedString).to.be.equal("number.int(2).positive");
    });
    it('should protect whole negative number', function () {
        var protectedString = data_protector_1.DataProtector.protectNumber(-10);
        expect(protectedString).to.be.equal("number.int(2).negative");
    });
    it('should protect float positive number', function () {
        var protectedString = data_protector_1.DataProtector.protectNumber(10.22);
        expect(protectedString).to.be.equal("number.float(2,2).positive");
    });
    it('should protect float negative number', function () {
        var protectedString = data_protector_1.DataProtector.protectNumber(-10.22);
        expect(protectedString).to.be.equal("number.float(2,2).negative");
    });
    it('should protect float negative number', function () {
        var protectedString = data_protector_1.DataProtector.protectNumber(-10.22);
        expect(protectedString).to.be.equal("number.float(2,2).negative");
    });
    it('should protect primitive number', function () {
        var protectedString = data_protector_1.DataProtector.protectPrimitive(-10.22);
        expect(protectedString).to.be.equal("number.float(2,2).negative");
    });
    it('should protect primitive string', function () {
        var protectedString = data_protector_1.DataProtector.protectPrimitive("test");
        expect(protectedString).to.be.equal("string(4).contains(lower)");
    });
    it('should protect string', function () {
        var protectedString = data_protector_1.DataProtector.protectString("test");
        expect(protectedString).to.be.equal("string(4).contains(lower)");
    });
    it('should protect string (empty)', function () {
        var protectedString = data_protector_1.DataProtector.protectString("");
        expect(protectedString).to.be.equal("string(0).empty");
    });
    it('should protect string (upper,lower)', function () {
        var protectedString = data_protector_1.DataProtector.protectString("Test");
        expect(protectedString).to.be.equal("string(4).contains(upper,lower)");
    });
    it('should protect string (upper,lower,number)', function () {
        var protectedString = data_protector_1.DataProtector.protectString("Test1");
        expect(protectedString).to.be.equal("string(5).contains(upper,lower,number)");
    });
    it('should protect string (upper,lower,number,special)', function () {
        var protectedString = data_protector_1.DataProtector.protectString("Test1_");
        expect(protectedString).to.be.equal("string(6).contains(upper,lower,number,special)");
    });
    it('should protect string (upper,lower,number,special,space)', function () {
        var protectedString = data_protector_1.DataProtector.protectString("Test1_ ");
        expect(protectedString).to.be.equal("string(7).contains(upper,lower,number,special,space)");
    });
    it('should protect string (upper,lower,number,special,space,newline)', function () {
        var protectedString = data_protector_1.DataProtector.protectString("Test1_ \n");
        expect(protectedString).to.be.equal("string(8).contains(upper,lower,number,special,space,newline)");
    });
    it('should protect simple array', function () {
        var protectedArray = data_protector_1.DataProtector.protect([-20.44, "String4*", false, "", undefined]);
        expect(protectedArray[0]).to.equal("number.float(2,2).negative");
        expect(protectedArray[1]).to.equal("string(8).contains(upper,lower,number,special)");
        expect(protectedArray[2]).to.equal("boolean");
        expect(protectedArray[3]).to.equal("string(0).empty");
        expect(protectedArray[4]).to.equal("undefined");
    });
    it('should protect complex array', function () {
        var protectedArray = data_protector_1.DataProtector.protect([-20.44, "String4*", false, "", undefined, [1], [{
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
    it('should protect complex object', function () {
        var protectedObject = data_protector_1.DataProtector.protect({
            string: "string",
            number: 123,
            array: [123, {
                    string: "someString"
                }],
            undefined: undefined,
            empty: "",
            boolean: true,
            null: null,
            function: function () { }
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
    it('should protect simple object with white list', function () {
        var protectedObject = data_protector_1.DataProtector.protect({
            string: "string",
            number: 123,
            undefined: undefined,
            empty: "",
            boolean: true
        }, [{ jsonPath: "$.number" }]);
        // console.log("protectedObject", protectedObject);
        expect(protectedObject).to.have.a.property("string").that.equals("string(6).contains(lower)");
        expect(protectedObject).to.have.a.property("number").that.equals(123);
        expect(protectedObject).to.have.a.property("undefined").that.is.equal("undefined");
        expect(protectedObject).to.have.a.property("empty").that.is.equal("string(0).empty");
        expect(protectedObject).to.have.a.property("boolean").that.is.equal("boolean");
    });
    it('should protect complex object with a filter', function () {
        var protectedObject = data_protector_1.DataProtector.protect({
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
        }, [{ jsonPath: "$.array[0]" }, { jsonPath: "$.array[1].string2" }]);
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
    });
    it('custom filter', function () {
        var protectedObject = data_protector_1.DataProtector.protect({
            array: [123, {
                    string: "someString",
                    string2: "someString2"
                }],
        }, [{ jsonPath: "$.array[0]", masker: function (valueToMask) {
                    return "xxx";
                } }]);
        //console.log(JSON.stringify(protectedObject, null, "\t"))
        expect(protectedObject.array[1]).to.have.a.property("string").that.equals("string(10).contains(upper,lower)");
        expect(protectedObject.array[1]).to.have.a.property("string2").that.equals("string(11).contains(upper,lower,number)");
        expect(protectedObject.array[0]).to.equals("xxx");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDcEMsd0RBRStCO0FBRS9CLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtJQUU1QixFQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDckIsSUFBTSxlQUFlLEdBQUcsOEJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9CQUFvQixFQUFFO1FBQ3JCLElBQU0sZUFBZSxHQUFHLDhCQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtRQUN0QixJQUFNLGVBQWUsR0FBRyw4QkFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUU7UUFDeEIsSUFBTSxlQUFlLEdBQUcsOEJBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9CQUFvQixFQUFFO1FBQ3JCLElB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