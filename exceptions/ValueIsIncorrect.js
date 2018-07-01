import Translation from '../translate/Translation';

class ValueIsIncorrect extends Error
{
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
