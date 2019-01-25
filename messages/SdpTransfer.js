import { Message } from './Message';
import { Sdp } from '../model/Sdp';
import { User as UserModel} from '../model/User';
import ValueChecker from '../utilities/ValueChecker';

/**
 * Message which is used to exchange data of session description
 *
 * @module tbrtc-common/messages
 */
export class SdpTransfer extends Message
{
    /**
     * Initialization of the message
     *
     * @param {string} sessionId Session identifier
     * @param {UserModel} user Data of a user who should receive the message
     * @param {Sdp} sdp Object with data of session description
     */
    constructor(sessionId, user, sdp) {
        ValueChecker.check({ sdp }, {
            "sdp": {
                "typeof": ['object', 'null'],
                "instanceof": Sdp
            }
        });
        super('sdp.transfer', sessionId, user, { sdp });
    }

    /**
     * Object with data of session description
     *
     * @property
     * @readonly
     * @type {Sdp}
     */
    get sdp() {
        return this.data.sdp;
    }

    /**
     * It deserializes JSON input object to SdpTransfer message object
     *
     * @param {object} input
     * @return {SdpTransfer}
     */
    static fromJSON(input) {
        let object = super.fromJSON(input);
        object.data.sdp = Sdp.fromJSON(object.data.sdp);
        return object;
    }

    /**
     * It creates an empty message (used for deserialization mechanism)
     *
     * @return {SdpTransfer}
     * @private
     */
    static _createEmpty() {
        return new SdpTransfer(null, null, null);
    }
}
