import { Message } from './Message';
import {Session as SessionModel} from "../model/Session";

/**
 * Message which is used to exchange information about session
 *
 * @module tbrtc-common/messages
 */
export class Session extends Message
{
    /**
     * It deserializes JSON input object to Session message object
     *
     * @param {object} input
     * @return {Session}
     */
    static fromJSON(input) {
        let object = super.fromJSON(input);
        if(object.type === 'session.data') {
            object.data.session = SessionModel.fromJSON(object.data.session);
        }
        return object;
    }

    /**
     * It creates an empty message (used for deserialization mechanism)
     *
     * @return {Session}
     * @private
     */
    static _createEmpty() {
        return new Session('message', null, null);
    }
}
