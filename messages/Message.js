import _ from 'underscore';
import BadParamType from '../exceptions/BadParamType';
import ValueChecker from '../utilities/ValueChecker';
import { AbstractModel } from '../model/AbstractModel';
import { User } from '../model/User';
import Data from '../model/Data';

const uuidv4 = require('uuid');

/**
 * Base message which is a parent of other types. It can be also used directly.
 *
 * @module tbrtc-common/messages
 */
export class Message extends AbstractModel
{
    /**
     * Initialization of the message
     *
     * @param {string} type Message type
     * @param {string|null} sessionId Session identifier
     * @param {UserModel} user Data of a user who should receive the message
     * @param {object} data Object with additional data
     */
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
        this._data = new Data(data);
    }

    /**
     * Message identifier
     *
     * @property
     * @readonly
     * @type {string}
     */
    get id() {
        return this._id;
    }

    /**
     * Message type
     *
     * @property
     * @readonly
     * @type {string}
     */
    get type() {
        return this._type;
    }

    /**
     * Message data
     *
     * @property
     * @readonly
     * @type {Data}
     */
    get data() {
        return this._data;
    }

    /**
     * User which is bound up with the message
     *
     * @property
     * @readonly
     * @type {User|null}
     */
    get user() {
        return this._user;
    }

    /**
     * Session identifier
     *
     * @property
     * @readonly
     * @type {string|null}
     */
    get sessionId() {
        return this._sessionId;
    }

    /**
     * Setter of data object
     *
     * @param {object} value Value to be set
     */
    set data(value) {
        if(typeof value === 'object') {
            this._data = new  Data(value);
        }
    }

    /**
     * All available types of messages
     *
     * @static
     * @property
     * @readonly
     * @type {string[]}
     */
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
            "chat.message",
            "session.leave",
            "session.close",
            "sdp.transfer",
            "ice.candidate",
            "user.communication",
            "success",
            "error",
            "message",
        ];
    }

    /**
     * Mapping of properties how to transform serialized and deserialized objects
     *
     * @property
     * @readonly
     * @type {object}
     * @private
     */
    get _serializedMap() {
        return {
            "id":"_id",
            "type": "_type",
            "sessionId": "_sessionId",
            "user": '_user',
            "data": '_data'
        };
    }

    /**
     * It deserializes JSON input object to Message object
     *
     * @param {object} input
     * @return {Message}
     */
    static fromJSON(input) {
        let object = super.fromJSON(input);
        if(object.user !== null) {
            object._user = User.fromJSON(object.user);
        }
        if(object.data !== null) {
            object.data = new Data(object.data);
        }
        return object;
    }

    /**
     * It creates an empty message (used for deserialization mechanism)
     *
     * @return {Message}
     * @private
     */
    static _createEmpty() {
        return new Message('message', null, null);
    }
}
