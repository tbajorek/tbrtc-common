import Translation from '../translate/Translation';

/**
 * An exception thrown when JSON format of a variable is wrong
 *
 * @module tbrtc-common/exceptions
 */
class BadJsonFormat extends Error
{
    /**
     * Initializing of the exception
     *
     * @param {string} vname Variable name
     * @param {string} fname Function name
     */
    constructor(vname, fname) {
        super(Translation.instance._('JSON format of variable {vname} in function {fname}() is wrong', {
            "vname": vname,
            "fname": fname
        }));
        this.name = 'BadJsonFormat';
    }
}

export default BadJsonFormat;
