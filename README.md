# data-protector

[![NPM](https://nodei.co/npm/data-protector.png)](https://nodei.co/npm/data-protector/)

## What is data-protector?

The data-protector allows one to log your objects safely. There are plenty of data obfuscators already. The issue, however, with them is that often you need to blacklist instead of whitelist. If an engineer added a key to the object, which happened to be the customer's entire billing profile, you would end up leaking PII and have an incident on your hands. 

Another difference between this library and other similar libraries, it doesnt just mask, which often would render information useless, but it saves the types of data that it masked, for example:

* "string(10).contains(upper,lower)"
* "number.int(3).positive"
* "number.float(1,1).negative"
* "boolean"
* "string(0).empty"

Which I believe is what one would need to debug an issue that was caught outside of non-live environments.

Library also supports very primitive JSONPath like syntax for whitelisting specific namespace or a key.

## Install

```plain
npm install data-protector --save
```

## Usage

```javascript
import {DataProtector} from "data-protector";

const protectedObject = DataProtector.protect({
        string: "string",
        number: 123,
        undefined: undefined,
        empty: "",
        boolean: true
});

/*
{ 
    string: 'string(6).contains(lower)',
    number: 'number.int(3).positive',
    undefined: 'undefined',
    empty: 'string(0).empty',
    boolean: 'boolean' 
}
*/

const protectedObject = DataProtector.protect({
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
}, [{jsonPath: "$.array[0]"}, {jsonPath: "$.array[1].string2"}]);

/*
{
	"string": "string(6).contains(lower)",
	"number": "number.int(3).positive",
	"array": [
		123,
		{
			"string": "string(10).contains(upper,lower)",
			"string2": "someString2"
		}
	],
	"array2": [
		"number.int(3).positive",
		{
			"string": "string(10).contains(upper,lower)"
		}
	],
	"undefined": "undefined",
	"empty": "string(0).empty",
	"boolean": "boolean"
}
*/

const protectedObject = DataProtector.protect({
            array: [123, {
                string: "someString",
                string2: "someString2"
            }],
        }, [
                {
                    jsonPath: "$.array[0]", 
                    masker: (valueToMask) => {
                        return "xxx";
                    }
                }
            ]
);

/*
{
	"array": [
		"xxx",
		{
			"string": "string(10).contains(upper,lower)",
			"string2": "string(11).contains(upper,lower,number)"
		}
	]
}
*/

```

## Function prototype

```javascript
DataProtector.protect(
    valueToProtect: string | number | object | array | any, {
        jsonPath: string, 
        masker?: (valueToProtect: string) => string
    }[]
);
```

## Library development

### Linux/OSX

Clone the repository and change your current directory into a projects directory

```plain
git clone https://github.com/winfinit/data-protector.git
cd data-protector
```

Make sure typescript and mocha are installed

```plain
npm install typescript mocha --global
```

Build/rebuild the project

```plain
npm run clean-build
// or run: rm -Rf ./build && tsc
```  

Ensure that tests are passing

```plain
npm test
// or run mocha --recursive ./built/test/
```

### Windows

Same as Linux/OSX but change paths to match windows