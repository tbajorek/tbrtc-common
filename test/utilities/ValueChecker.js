import { assert } from 'chai';
import ValueChecker from '../../utilities/ValueChecker';
import ValueIsIncorrect from '../../exceptions/ValueIsIncorrect';

class User {}
class Child extends User {
    constructor() {
        super();
        this.var1 = 15;
        this.var2 = ['test', 'other'];
    }
    fn1() {}
    fn2() {}
}
class MyError extends Error {}
class Simple {}

describe('utilities > ValueChecker', function() {
    describe('#_ensureArray()', function() {
        it('should guarantee that every parameter will be returned as array', function() {
            assert.deepEqual(ValueChecker._ensureArray(15), [15]);
            assert.deepEqual(ValueChecker._ensureArray([15,10]), [15, 10]);
            assert.deepEqual(ValueChecker._ensureArray(null), []);
        });
    });

    describe('#typeof()', function() {
        it('should check if value type is array', function() {
            assert.equal(ValueChecker.typeof([], 'array'), true);
            assert.equal(ValueChecker.typeof([15, 'test'], 'array'), true);
            assert.equal(ValueChecker.typeof([15, 'test'], 'array'), true);
            assert.equal(ValueChecker.typeof({}, 'array'), false);
            assert.equal(ValueChecker.typeof({"var1": 51}, 'array'), false);
            assert.equal(ValueChecker.typeof({0: 'test'}, 'array'), false);
            assert.equal(ValueChecker.typeof('test', 'array'), false);
        });

        it('should check if value type is a concrete type, excepts arrays', function() {
            assert.equal(ValueChecker.typeof(15, 'number'), true);
            assert.equal(ValueChecker.typeof(() => {}, 'function'), true);
            assert.equal(ValueChecker.typeof({"var1": 14}, 'object'), true);
            assert.equal(ValueChecker.typeof(new Error(), 'object'), true);
            assert.equal(ValueChecker.typeof('15', 'string'), true);
            assert.equal(ValueChecker.typeof(null, 'null'), true);
        });

        it('should check if value type is one of concrete types, stored in array parameter', function() {
            assert.equal(ValueChecker.typeof(15, ['number', 'string']), true);
            assert.equal(ValueChecker.typeof('15', ['number', 'string']), true);
            assert.equal(ValueChecker.typeof(10, ['array', 'number']), true);
            assert.equal(ValueChecker.typeof([10], ['array', 'number']), true);
            assert.equal(ValueChecker.typeof(null, ['array', 'null']), true);

        });
    });

    describe('#exact()', function() {
        it('should check equlality of two values', function() {
            assert.equal(ValueChecker.exact(15, 15), true);
            assert.equal(ValueChecker.exact(15, 10), false);
        });
    });

    describe('#inside()', function() {
        it('should check if a value is one of allowed values', function() {
            assert.equal(ValueChecker.inside(15, [15, 10]), true);
            assert.equal(ValueChecker.inside(3, [15, 10]), false);
        });
    });

    describe('#required()', function() {
        it('should check if the value is defined', function() {
            assert.equal(ValueChecker.required(15), true);
            assert.equal(ValueChecker.required(15, true), true);
            assert.equal(ValueChecker.required(null), false);
            const object = {"var1": 11};
            assert.equal(ValueChecker.required(null,object.var2), false);
        });
    });

    describe('#instanceof()', function() {
        it('should check instance of the given value', function() {
            assert.equal(ValueChecker.instanceof(new Error(), Error), true);
            assert.equal(ValueChecker.instanceof(new MyError(), Error), true);
            assert.equal(ValueChecker.instanceof(new User(), User), true);
            assert.equal(ValueChecker.instanceof(new Child(), User), true);
            assert.equal(ValueChecker.instanceof([15,31], Array), true);
        });

        it('should check if instance of the given value is one of concrete, stored in array', function() {
            assert.equal(ValueChecker.instanceof(new Error(), [Error, User]), true);
            assert.equal(ValueChecker.instanceof(new User(), [Error, User]), true);
            assert.equal(ValueChecker.instanceof(new Simple(), [Error, User]), false);
            assert.equal(ValueChecker.instanceof(new Child(), [Error, User]), true);
        });
    });

    describe('#hasFn()', function() {
        it('should check if object has specific method/methods', function() {
            const child = new Child();
            assert.equal(ValueChecker.hasFn(child, 'fn1'), true);
            assert.equal(ValueChecker.hasFn(child, ['fn1', 'fn2']), true);
            assert.equal(ValueChecker.hasFn(child, 'fn3'), false);
            assert.equal(ValueChecker.hasFn(child, ['fn3', 'fn4']), false);
        });
    });

    describe('#props()', function() {
        it('should check if object properties meet specific constraints', function() {
            const child = new Child();
            assert.doesNotThrow(() => {
                ValueChecker.props(child, {
                    "var1": {
                        "required": true,
                        "typeof": "number"
                    },
                    "var10": {
                        "typeof": ['null', 'string']
                    },
                    "fn1": {
                        "typeof": "function"
                    }
                }, ValueIsIncorrect);
            });
        });
    });

    describe('#elements()', function() {
        it('should check if array elements meet specific constraints', function() {
            assert.doesNotThrow(() => {
                ValueChecker.elements([15,26,27,14], {
                    "required": true,
                    "typeof": "number"
                });
            }, ValueIsIncorrect);

            assert.throws(() => {
                ValueChecker.elements(['24', 15], {
                    "typeof": "string"
                });
            }, ValueIsIncorrect);
        });
    });

    describe('#_checkSingleParam()', function() {
        it('should check if single param meets specific constraints', function() {
            assert.doesNotThrow(() => {
                ValueChecker._checkSingleParam([15,18], {
                    "required": true,
                    "typeof": "array",
                    "children": {
                        "required": true,
                        "typeof": "number"
                    }
                });
            }, ValueIsIncorrect);

            assert.throws(() => {
                ValueChecker._checkSingleParam([15,'test'], {
                    "required": true,
                    "typeof": "array",
                    "elements": {
                        "required": true,
                        "typeof": "number"
                    }
                });
            }, ValueIsIncorrect);

            assert.doesNotThrow(() => {
                ValueChecker._checkSingleParam(new Child(), {
                    "instanceof": User,
                    "hasFn": ['fn1', 'fn2']
                });
            }, ValueIsIncorrect);
        });
    });

    describe('#check()', function() {
        it('should check if given parameters meet given constraints', function() {
            const vars = {
                "var1": 12,
                "var2": "test",
                "var3": new Child(),
                "var4": [new Child(), new User()]
            };

            const constraints = {
                "var1": {
                    "required": true,
                    "typeof": "number",
                    "inside": [12, 15]
                },
                "var2": {
                    "typeof": "string"
                },
                "var3": {
                    "typeof": ["object", "null"],
                    "instanceof": [Child, Error],
                    "hasFn": ['fn1', 'fn2']
                },
                "var4": {
                    "typeof": "array",
                    "children": {
                        "required": true,
                        "typeof": "object"
                    }
                }
            };

            assert.doesNotThrow(() => {
                ValueChecker.check(vars, constraints);
            }, ValueIsIncorrect);
        });
    });
});
