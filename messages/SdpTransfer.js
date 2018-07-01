import { Message } from './Message';
import { Sdp } from '../model/Sdp';
import ValueChecker from '../utilities/ValueChecker';

export class SdpTransfer extends Message
{
    constructor(sessionId, user, sdp) {
        ValueChecker.check({ sdp }, {
            "sdp": {
                "required": true,
                "typeof": ['object', 'null'],
                "instanceof": Sdp
            }
        });
        super('sdp.transfer', sessionId, user);
        this.data.sdp = sdp;
    }

    get sdp() {
        return this.data.sdp;
    }

    static _createEmpty() {
        return new IceCandidate('sdp.transfer', null, null);
    }
}
