import Translation from '../translate/Translation';

class UndefinedConstraint extends Error
{
    constructor(cname) {
        super(Translation.instance._('Constraint {cname} is undefined in specification', {
            "cname": cname
        }));
        this.name = 'UndefinedConstraint';
    }
}

export default UndefinedConstraint;
