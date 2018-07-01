import _ from 'underscore';
import UndefinedConstraint from '../exceptions/UndefinedConstraint';
import BadConstraint from '../exceptions/BadConstraint';
import ValueIsIncorrect from '../exceptions/ValueIsIncorrect';

const ValueChecker = {
    check: (params, constraints) => {
        const paramNames = _.keys(params);
        const constNames = _.keys(constraints);
        const sameArrays = paramNames.length===constNames.length && paramNames.every((v,i)=> v === constNames[i]);
        for(const paramName of paramNames) {
            let singleConstrains = null;
            if(sameArrays && typeof constraints[paramName] !== 'undefined') {
                singleConstrains = constraints[paramName];
            } else if(!sameArrays) {
                throw new BadConstraint('<constraint list>');
            }
            if(singleConstrains !== null) {
                ValueChecker._checkSingleParam(params[paramName], singleConstrains, paramName);
            }
        }

        let constraint;
        let result = true;
        for(let index = 0; index< params.length; ++index) {
            constraint = ValueChecker.typeof(constraints[index], 'array') ? constraints[index]: (ValueChecker.exact(constraints.length, 1) && ValueChecker.typeof(constraints, 'object')) ? constraints : null;
            if(constraint !== null && ValueChecker.typeof(constraint, 'object')) {
                result = ValueChecker._checkSingleParam()
            }
        }
    },
    _checkSingleParam: (value, constraint, name = '<undefined_name>') => {
        _.each(constraint, (expected, singleConstraint) => {
            if(typeof ValueChecker[singleConstraint] !== 'function') {
                throw new UndefinedConstraint(singleConstraint);
            }
            if(ValueChecker[singleConstraint](value, expected, name) === false) {
                throw new ValueIsIncorrect(name, singleConstraint, ValueChecker._getExpectedName(expected));
            }
        });
    },
    _getExpectedName: (expected) => {
        if(ValueChecker.instanceof(expected, Object)) {
            return expected.constructor.name;
        } else if(ValueChecker.typeof(expected, 'function')) {
            return expected.name;
        } else {
            return JSON.stringify(expected);
        }
    },
    exact: (cValue, eValue, name = '<undefined_name>') => cValue === eValue,
    inside: (cValue, eValue, name = '<undefined_name>') => {
        if(ValueChecker.typeof(eValue, 'array')) {
            return _.findIndex(eValue, el => el === cValue) >= 0;
        } else {
            return true;
        }
    },
    required: (value, flag = true, name = '<undefined_name>') => (flag && typeof value !== 'undefined' && value !== null),
    typeof: (value, type, name = '<undefined_name>') => {
        const types = ValueChecker._ensureArray(type);
        for(const singleType of types) {
            switch (singleType) {
                case 'null':
                    if(value === null) {
                        return true;
                    }
                    break;
                case 'array':
                    if(Array.isArray(value)) {
                        return true;
                    }
                    break;
                default:
                    if(typeof value === singleType) {
                        return true;
                    }
                    break;
            }
        }
        return false;
    },
    instanceof: (value, type, name = '<undefined_name>') => {
        type = ValueChecker._ensureArray(type);
        if(!(ValueChecker.required(value) && ValueChecker.typeof(value, 'object'))) {
            return true;
        }
        for(const singleType of type) {
            if(value instanceof singleType) {
                return true;
            }
        }
        return false;
    },
    hasFn: (object, props, name = '<undefined_name>') => {
        props = ValueChecker._ensureArray(props);
        for(const prop of props) {
            if(!(ValueChecker.required(object[prop]) && ValueChecker.typeof(object[prop], 'function'))) {
                return false;
            }
        }
        return true;
    },
    props: (object, constraints, name = '<undefined_name>') => {
        _.each(constraints, (constraint, propName) => {
            if(propName in object) {
                ValueChecker._checkSingleParam(object[propName], constraint, propName);
            }
        });
    },
    elements: (value, constraints, name = '<undefined_name>') => {
        if (!ValueChecker.typeof(value, 'array')) {
            throw new BadConstraint('children');
        } else {
            _.each(value, (element, index) => {
                ValueChecker._checkSingleParam(element, constraints, name+'['+index+']');
            });
        }
        return true;
    },
    _ensureArray(value) {
        if(Array.isArray(value)) {
            return value;
        } else if(ValueChecker.required(value)) {
            return [value];
        } else {
            return [];
        }
    }

};

export default ValueChecker;
