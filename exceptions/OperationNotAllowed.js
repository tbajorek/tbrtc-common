import Translation from '../translate/Translation';

/**
 * An exception thrown when an operation is being done without permissions
 *
 * @module tbrtc-common/exceptions
 */
class OperationNotAllowed extends Error
{
    /**
     * Initializing of the exception
     *
     * @param {string} opname Operation name
     * @param {string} fname Function name
     */
    constructor(opname, fname) {
        super(Translation.instance._('Operation {opname} in function {fname}() is not allowed', {
            "opname": opname,
            "fname": fname,
        }));
        this.name = 'OperationNotAllowed';
    }
}

export default OperationNotAllowed;
