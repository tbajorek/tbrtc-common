import { AbstractModel } from './AbstractModel';
import ValueChecker from '../utilities/ValueChecker';
import { User } from "./User";

export class IceCandidate extends AbstractModel
{
    constructor(iceCandidate, sender) {
        ValueChecker.check({ iceCandidate, sender }, {
            "iceCandidate": {
                "typeof": ['null', 'object'],
                "instanceof": RTCIceCandidate,
            },
            "sender": {
                "typeof": ['null', 'object'],
                "instanceof": User,
            }
        });
        super();
        this._iceCandidate = iceCandidate;
        this._sender = sender;
    }

    get iceCandidate() {
        return this._iceCandidate;
    }

    get sender() {
        return this._sender;
    }

    get _serializedMap() {
        return {
            "iceCandidate":"_iceCandidate",
            "sender": "_sender",
        };
    }

    static _createEmpty() {
        return new IceCandidate(null, null);
    }
}
