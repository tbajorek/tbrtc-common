import Translation from '../translate/Translation';

/**
 * An exception thrown when a parameter has a type which is different than expected
 *
 * @module tbrtc-common/exceptions
 */
class BadParamType extends Error
{
    /**
     * Initializing of the exception
     *
     * @param {string} pname Parameter name
     * @param {string} fname Function name
     * @param {string} ptype Expected type of parameter
     */
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
