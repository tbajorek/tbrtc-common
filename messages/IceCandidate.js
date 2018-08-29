import { Message } from './Message';
import { User as UserModel } from '../model/User';
import ValueChecker from '../utilities/ValueChecker';
import { IceCandidate as IceCandidateModel } from "../model/IceCandidate";

/**
 * Message which is used to exchange data of ICE candidates between two peers who wants to be directly connected
 *
 * @module tbrtc-common/messages
 */
export class IceCandidate extends Message {
    /**
     * Initialization of the message
     *
     * @param {string} sessionId Session identifier
     * @param {UserModel} user Data of a user who should receive the message
     * @param {IceCandidateModel} iceModel Object with data of ICE candidate
     */
    constructor(sessionId, user, iceModel) {
        ValueChecker.check({ user, iceModel }, {
            "user": {
                "typeof": ['null', 'object'],
                "instanceof": UserModel
            },
            "iceModel": {
                "typeof": ['null', 'object'],
                "instanceof": IceCandidateModel
            }
        });
        super('ice.candidate', sessionId, user, { ice: iceModel });
        this.data.ice = iceModel;
    }

    /**
     * Object with data of ICE candidate
     *
     * @property
     * @readonly
     * @type {IceCandidateModel}
     */
    get ice() {
        return this.data.ice;
    }

    /**
     * It deserializes JSON input object to IceCandidate message object
     *
     * @param {object} input
     * @return {IceCandidate}
     */
    static fromJSON(input) {
        let object = super.fromJSON(input);
        object.data.ice = IceCandidateModel.fromJSON(object.data.ice);
        return object;
    }

    /**
     * It creates an empty message (used for deserialization mechanism)
     *
     * @return {IceCandidate}
     * @private
     */
    static _createEmpty() {
        return new IceCandidate(null, null, null);
    }
}