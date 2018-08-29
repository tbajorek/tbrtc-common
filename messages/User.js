import { Message } from './Message';
import { User as UserModel } from '../model/User';
import ValueChecker from '../utilities/ValueChecker';

/**
 * Message which is used to exchange information about users
 *
 * @module tbrtc-common/messages
 */
export class User extends Message
{
    /**
     * Initialization of the message
     *
     * @param {string} type Name of message type
     * @param {UserModel} user Data of a user who is related to the message
     */
    constructor(type, user = null) {
        ValueChecker.check({ user }, {
            "user": {
                "typeof": ['null', 'object'],
                "instanceof": UserModel
            }
        });
        super(type, null, user);
    }

    /**
     * It serializes the object to JSON input object in a deep way
     *
     * @return {object}
     */
    toJSON() {
        if(this.type === 'user.connect') {
            return super.toUnsafeJSON();
        } else {
            return super.toJSON();
        }
    }

    /**
     * It creates an empty message (used for deserialization mechanism)
     *
     * @return {User}
     * @private
     */
    static _createEmpty() {
        return new User('message', null);
    }
}
