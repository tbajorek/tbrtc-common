import Translation from '../translate/Translation';

/**
 * An exception thrown when a checked value is different than expected in a constraint
 *
 * @module tbrtc-common/exceptions
 */
class ValueIsIncorrect extends Error
{
    /**
     * Initializing of the exception
     *
     * @param {string} vname Existed value name
     * @param {string} cname Constraint name
     * @param {string} exname Expected value name
     */
    constructor(vname, cname, exname) {
        super(Translation.instance._('Value {vname} does not meet expected value {exname} of the constraint {cname}', {
            "vname": vname,
            "cname": cname,
            "exname": exname
        }));
        this.name = 'ValueIsIncorrect';
    }
}

export default ValueIsIncorrect;
