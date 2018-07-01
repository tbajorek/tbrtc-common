import Translation from '../translate/Translation';

class BadParamType extends Error
{
    constructor(pname, fname, ptype) {
        super(Translation.instance._('Parameter {pname} given to function {fname}() is not an expected type {ptype}', {
            "pname": pname,
            "fname": fname,
            "ptype": ptype
        }));
        this.name = 'BadParamType';
    }
}

export default BadParamType;
