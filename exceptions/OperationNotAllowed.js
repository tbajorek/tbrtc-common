import Translation from '../translate/Translation';

class OperationNotAllowed extends Error
{
    constructor(opname, fname) {
        super(Translation.instance._('Operation {opname} in function {fname}() is not allowed', {
            "opname": opname,
            "fname": fname,
        }));
        this.name = 'OperationNotAllowed';
    }
}

export default OperationNotAllowed;
