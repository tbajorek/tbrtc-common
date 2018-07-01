import _ from 'underscore';
import BadParamType from '../exceptions/BadParamType';
import ValueChecker from '../utilities/ValueChecker';
import { AbstractModel } from '../model/AbstractModel';
import { User } from '../model/User';
import Data from '../model/Data';

const uuidv4 = require('uuid');

export class Message extends AbstractModel
{
    constructor(type, sessionId = null, user = null, data = null) {
        super();
        ValueChecker.check({ type, sessionId, user, data }, {
            "type": {
                "required": true,
                "typeof": 'string',
                "inside": Message.types,
            },
            "sessionId": {
                "typeof": ['null', 'string']
            },
            "user": {
                "typeof": ['null', 'object'],
                "instanceof": User,
            },
            "data": {
                "typeof": ['null', 'object'],
            }
        });
        if(_.findIndex(Message.types, oneType => oneType === type) < 0) {
            throw new BadParamType('type','Message.constructor', 'Message.types');
        }
        this._id = uuidv4();
        this._sessionId = sessionId;
        this._user = user;
        this._type = type;
        if(typeof data === 'object' && data !== null) {
            this._data = new Data(data);
        } else {
            this._data = null;
        }
    }
    get id() {
        return this._id;
    }
    get type() {
        return this._type;
    }
    get data() {
        return this._data;
    }
    get user() {
        return this._user;
    }
    get sessionId() {
        return this._sessionId;
    }
    set data(value) {
        if(typeof value === 'object') {
            this._data = new  Data(value);
        }
    }

    static get types() {
        return [
            "user.init",
            "user.connect",
            "session.new",
            "session.request",
            "session.stop",
            "session.confirm",
            "session.reject",
            "session.data",
            "session.leave",
            "session.disconnect",
            "sdp.transfer",
            "ice.candidate",
            "success",
            "error",
            "message",
        ];
    }

    get _serializedMap() {
        return {
            "id":"_id",
            "type": "_type",
            "sessionId": "_sessionId",
            "user": '_user',
            "data": '_data'
        };
    }

    static fromJSON(input) {
        let object = super.fromJSON(input);
        if(object.user !== null) {
            object._user = User.fromJSON(object.user);
        }
        return object;
    }

    static _createEmpty() {
        return new Message('message', null, null);
    }
}
