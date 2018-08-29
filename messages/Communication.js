import { Message } from './Message';
import { User as UserModel } from '../model/User';
import ValueChecker from "../utilities/ValueChecker";

/**
 * Message which is used to direct exchange data between two users logged to the same signaling server
 *
 * @module tbrtc-common/messages
 */
export class Communication extends Message {
    /**
     * Initialization of the message
     *
     * @param {UserModel} user Data of user who is a receiver of the message
     * @param {UserModel} sender Data of a user who sends the message
     * @param {object} details Object with all available data which are sent between users
     */
    constructor(user, sender, details) {
        ValueChecker.check({ user, sender }, {
            "user": {
                "typeof": ['null', 'object'],
                "instanceof": UserModel,
            },
            "sender": {
                "typeof": ['null', 'object'],
                "instanceof": UserModel,
            }
        });
        super('user.communication', null, user, {
            sender, details
        });
    }

    /**
     * Content of the message written by one of users
     *
     * @property
     * @readonly
     * @type {UserModel}
     */
    get sender() {
        return this.data.sender;
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
     * @return {Communication}
     * @private
     */
    static _createEmpty() {
        return new Communication(null, null, {});
    }
}