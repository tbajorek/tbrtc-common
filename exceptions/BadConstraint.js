import Translation from '../translate/Translation';

/**
 * An exception thrown when constraint of ValueChecker has been used in a wrong way
 *
 * @module tbrtc-common/exceptions
 */
class BadConstraint extends Error
{
    /**
     * Initializing of the exception
     *
     * @param {string} cname Constraint name
     */
    constructor(cname) {
        super(Translation.instance._('Constraint {cname} has been used in wrong way', {
            "cname": cname
        }));
        this.name = 'BadConstraint';
    }
}

export default BadConstraint;
