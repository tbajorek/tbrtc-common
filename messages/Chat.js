import { Message } from './Message';
import { User as UserModel } from '../model/User';
import ValueChecker from '../utilities/ValueChecker';

/**
 * Message which is sent when chat messages are exchanged between users in session
 *
 * @module tbrtc-common/messages
 */
export class Chat extends Message {
    /**
     * Initialization of the message
     *
     * @param {string} sessionId Session id
     * @param {UserModel|null} user Message content which is human readable
     * @param {string} content Message content which is human readable
     * @param {string} date Object with all available data
     */
    constructor(sessionId, user, content, date) {
        ValueChecker.check({ sessionId, content, date }, {
            "sessionId": {
                "typeof": 'string',
                "required": true
            },
            "content": {
                "typeof": 'string',
                "required": true
            },
            "date": {
                "typeof": 'string',
                "required": true
            }
        });
        super('chat.message', sessionId, user, {
            content, date
        });
    }

    /**
     * Content of the message written by one of users
     *
     * @property
     * @readonly
     * @type {string}
     */
    get content() {
        return this.data.content;
    }

    /**
     * Date when the message has been written
     *
     * @property
     * @readonly
     * @type {string}
     */
    get date() {
        return this.data.date;
    }

    /**
     * It creates an empty message (used for deserialization mechanism)
     *
     * @return {Chat}
     * @private
     */
    static _createEmpty() {
        return new Chat('', null, '', '');
    }
}