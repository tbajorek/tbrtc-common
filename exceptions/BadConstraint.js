import Translation from '../translate/Translation';

class BadConstraint extends Error
{
    constructor(cname) {
        super(Translation.instance._('Constraint {cname} has been used in wrong way', {
            "cname": cname
        }));
        this.name = 'BadConstraint';
    }
}

export default BadConstraint;
