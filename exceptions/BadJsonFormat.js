import Translation from '../translate/Translation';

class BadJsonFormat extends Error
{
    constructor(vname, fname) {
        super(Translation.instance._('JSON format of variable {vname} in function {fname}() is wrong', {
            "pname": pname,
            "fname": fname
        }));
        this.name = 'BadJsonFormat';
    }
}

export default BadJsonFormat;
