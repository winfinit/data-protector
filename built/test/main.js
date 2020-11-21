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
    it('should protect primitive', function () {
        var protectedArray = data_protector_1.DataProtector.protect(-20.44);
        expect(protectedArray).to.equal("number.float(2,2).negative");
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
        var originalObject = {
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
        var protectedObject = data_protector_1.DataProtector.protect(originalObject, [{ jsonPath: "$.array[0]" }, { jsonPath: "$.array[1].string2" }]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDcEMsd0RBRStCO0FBRS9CLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtJQUU1QixFQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDckIsSUFBTSxlQUFlLEdBQUcsOEJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9CQUFvQixFQUFFO1FBQ3JCLElBQU0sZUFBZSxHQUFHLDhCQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtRQUN0QixJQUFNLGVBQWUsR0FBRyw4QkFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUU7UUFDeEIsSUFBTSxlQUFlLEdBQUcsOEJBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9CQUFvQixFQUFFO1FBQ3JCLElB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USxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWhELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRztRQUNqQixJQUFNLGVBQWUsR0FBRyw4QkFBYSxDQUFDLE9BQU8sQ0FBQztZQUMxQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLFlBQVk7b0JBQ3BCLE9BQU8sRUFBRSxhQUFhO2lCQUN6QixDQUFDO1NBQ0wsRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBQyxXQUFXO29CQUM3QyxPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUwsMERBQTBEO1FBRTFELE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUM5RyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDdEgsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==