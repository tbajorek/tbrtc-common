import { AbstractModel } from './AbstractModel';
import ValueChecker from '../utilities/ValueChecker';
import { Sdp } from "./Sdp";
import OperationNotAllowed from "../exceptions/OperationNotAllowed";

export class User extends AbstractModel
{
    constructor(id, name, email, connectionId = null) {
        ValueChecker.check({ connectionId }, {
            "connectionId": {
                "typeof": ['null', 'string']
            }
        });
        super();
        this._id = id;
        this._name = name;
        this._email = email;
        this._connectionId = connectionId;
        this._originalId = null;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get connectionId() {
        return this._connectionId;
    }

    set connectionId(value) {
        this._connectionId = value;
    }

    get originalId() {
        return this._originalId;
    }

    set originalId(value) {
        if(this._originalId === null) {
            this._originalId = value;
        } else {
            throw new OperationNotAllowed('User.originalId = '+value, 'tbrtc-common/model/User.set originalId')
        }
    }

    fromJSON(inputJSON) {
        return new this(inputJSON.id, inputJSON.name, inputJSON.email, inputJSON.connectionId);
    }

    get _serializedMap() {
        return {
            "id":"_id",
            "name": "_name",
            "email": "_email",
            "connectionId": "_connectionId",
        };
    }

    static _createEmpty() {
        return new User(null, null, null, null);
    }
}
