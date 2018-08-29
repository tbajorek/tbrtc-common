import Translation from '../translate/Translation';

/**
 * An exception thrown when an undefined constraint of ValueChecker is used
 *
 * @module tbrtc-common/exceptions
 */
class UndefinedConstraint extends Error
{
    /**
     * Initializing of the exception
     *
     * @param {string} cname Constraint name
     */
    constructor(cname) {
        super(Translation.instance._('Constraint {cname} is undefined in specification', {
            "cname": cname
        }));
        this.name = 'UndefinedConstraint';
    }
}

export default UndefinedConstraint;
