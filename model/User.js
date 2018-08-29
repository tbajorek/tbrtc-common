import { AbstractModel } from './AbstractModel';
import ValueChecker from '../utilities/ValueChecker';
import OperationNotAllowed from "../exceptions/OperationNotAllowed";

export class User extends AbstractModel
{
    constructor(id, name, surname, email, avatar = null, connectionId = null) {
        ValueChecker.check({ connectionId }, {
            "connectionId": {
                "typeof": ['null', 'string']
            }
        });
        super();
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._avatar = avatar;
        this._connectionId = connectionId;
        this._originalId = null;
        this._exposedFields = ['id', 'name', 'email', 'surname', 'avatar', 'connectionId'];
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

    get surname() {
        return this._surname;
    }

    get email() {
        return this._email;
    }

    get avatar() {
        return this._avatar;
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
        return new this(inputJSON.id, inputJSON.name, inputJson.surname, inputJSON.email, inputJSON.avatar, inputJSON.connectionId);
    }

    static _createEmpty() {
        return new User(null, null, null, null);
    }
}
