import ValueChecker from '../../utilities/ValueChecker';
import Translation from '../../translate/Translation';
import {Message} from "../Message";

/**
 * Error message which is sent when an error has been occurred
 *
 * @module tbrtc-common/messages/result
 */
export class Error extends Message
{
    /**
     * Initialization of the message
     *
     * @param {number} code Error code
     * @param {string|null} content Message content which is human readable
     * @param {object} details Object with all available data
     */
    constructor(code, content = null, details = {}) {
        ValueChecker.check({ code, content, details }, {
            "code": {
                "required": true,
                "typeof": "number"
            },
            "content": {
                "typeof": ["string", "null"]
            },
            "details": {
                "typeof": 'object'
            }
        });
        const sessionId = typeof details.sessionId !== 'undefined' ? details.sessionId : null;
        if(content === null) {
            content = Error.matchContent(code);
        }
        super('error', sessionId, null, {code, content, details});
    }

    /**
     * Error number
     *
     * @property
     * @readonly
     * @type {number}
     */
    get code() {
        return this.data.code;
    }

    /**
     * Translated message content
     *
     * @property
     * @readonly
     * @type {string}
     */
    get content() {
        return Translation.instance._(this.data.content, this.data.details);
    }

    /**
     * Object with all available data of the error
     *
     * @property
     * @readonly
     * @type {object}
     */
    get details() {
        return this.data.details;
    }

    /**
     * It creates an empty message (used for deserialization mechanism)
     *
     * @return {Error}
     * @private
     */
    static _createEmpty() {
        return new Error(0, '');
    }

    /**
     * It returns a specified human readable message for the passed error code
     *
     * @param {number} code Error code
     * @return {string}
     */
    static matchContent(code) {
        if(code === Error.codes.BAD_AUTH) {
            return "The given authentication data are incorrect for user {uname}";
        } else if(code === Error.codes.PERM_REQ) {
            return "User {uname} doesn't have permissions to do this action: {aname}";
        } else if(code === Error.codes.DOUBLE_SESS_MEMB) {
            return "The user {uname} already exists in session {sessid}";
        } else if(code === Error.codes.SESS_ERROR) {
            return "An error with session {sessid} has been occured";
        } else if(code === Error.codes.CONN_NOT_FOUND) {
            return "The connection {connid} is not found";
        } else if(code === Error.codes.SESS_NOT_FOUND) {
            return "The session {sessid} is not found";
        } else if(code === Error.codes.USER_NOT_FOUND) {
            return "User {uname} is not found";
        } else if(code === Error.codes.REQ_NOT_FOUND) {
            return "Join request of user {uname} for this session is not found";
        } else {
            return "An unidentified error occured";
        }
    }

    /**
     * It contains all available error codes
     *
     * @readonly
     * @type {object}
     */
    static get codes() {
        return {
            BAD_AUTH: 1,
            PERM_REQ: 2,
            DOUBLE_SESS_MEMB: 3,
            SESS_ERROR: 4,
            CONN_NOT_FOUND: 5,
            SESS_NOT_FOUND: 6,
            USER_NOT_FOUND: 7,
            REQ_NOT_FOUND: 8,
        }
    }
}
