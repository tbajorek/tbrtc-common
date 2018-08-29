import { AbstractModel } from './AbstractModel';
import ValueChecker from '../utilities/ValueChecker';
import { User } from "./User";

/**
 * Model of ICE candidates sent when peer-to-peer connection is being established
 *
 * @module tbrtc-common/model
 */
export class IceCandidate extends AbstractModel
{
    /**
     * Initialization of the ICE model
     *
     * @param {RTCIceCandidate} iceCandidate ICE original data
     * @param {User} sender User who sends the data
     */
    constructor(iceCandidate, sender) {
        super();
        ValueChecker.check({ iceCandidate, sender }, {
            "iceCandidate": {
                "typeof": ['null', 'object'],
                "instanceof": IceCandidate._getRTCIcecandidateReference(),
            },
            "sender": {
                "typeof": ['null', 'object'],
                "instanceof": User,
            }
        });
        this._iceCandidate = iceCandidate;
        this._sender = sender;
    }

    /**
     * ICE original data
     *
     * @property
     * @readonly
     * @type {RTCIceCandidate}
     */
    get iceCandidate() {
        const reference = IceCandidate._getRTCIcecandidateReference();
        return new reference(this._iceCandidate);
    }

    /**
     * User who sends the data
     *
     * @property
     * @readonly
     * @type {User}
     */
    get sender() {
        return this._sender;
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
            "iceCandidate":"_iceCandidate",
            "sender": "_sender",
        };
    }

    /**
     * It returns an available wrapper for ICE candidate data
     *
     * @return {RTCIceCandidate|Object}
     * @private
     * @static
     */
    static _getRTCIcecandidateReference() {
        let reference;
        if(typeof window !== 'undefined' && 'RTCIceCandidate' in window) {
            reference = RTCIceCandidate;
        } else {
            reference = Object;
        }
        return reference;
    }

    /**
     * It creates an empty model (used for deserialization mechanism)
     *
     * @return {IceCandidate}
     * @private
     */
    static _createEmpty() {
        return new IceCandidate(null, null);
    }
}
