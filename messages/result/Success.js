import ValueChecker from '../../utilities/ValueChecker';
import Translation from '../../translate/Translation';
import {Message} from "../Message";

/**
 * Success message which is sent when an operation has been successfully finished
 *
 * @module tbrtc-common/messages/result
 */
export class Success extends Message
{
    /**
     * Initialization of the message
     *
     * @param {string} content Message content which is human readable
     * @param {string|null} sessionId Session id if it is sent in a session
     * @param {object} details Object with all available data
     */
    constructor(content, sessionId = null, details = null) {
        ValueChecker.check({content, details}, {
            "content": {
                "required": true,
                "typeof": "string"
            },
            "details": {
                "typeof": ['object', 'null']
            }
        });
        super('success', sessionId, null, {content, details});
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
     * Object with all available data sent with the message
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
     * @return {Success}
     * @private
     */
    static _createEmpty() {
        return new Success('');
    }
}
