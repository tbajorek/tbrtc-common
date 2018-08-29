import BadJsonFormat from '../exceptions/BadJsonFormat'
import { Session } from '../messages/Session'
import { User } from '../messages/User'
import { SdpTransfer } from '../messages/SdpTransfer'
import { IceCandidate } from '../messages/IceCandidate'
import { Chat } from '../messages/Chat'
import { Message } from '../messages/Message'
import { Success } from '../messages/result/Success'
import { Error } from '../messages/result/Error'
import {Communication} from "../messages/Communication";

/**
 * It creates all types of messages based on their serialized data as a JSON string
 */
class  MessageFactory
{
    /**
     * It creates a message based on the passed data
     *
     * @param {string} json String with data of messages serialized as JSON
     */
    static createFromJson(json) {
        if(typeof json === 'string') {
            json = JSON.parse(json);
        } else {
            throw new BadJsonFormat('json', 'factory/MessageFactory.createFromJson');
        }
        switch(json.type) {
            case 'session.new':
            case 'session.close':
            case 'session.request':
            case 'session.stop':
            case 'session.confirm':
            case 'session.reject':
            case 'session.data':
            case 'session.leave':
            case 'session.disconnect':
                return Session.fromJSON(json);
            case 'answer':
            case 'offer':
                return SdpTransfer.fromJSON(json);
            case 'user.init':
            case 'user.connect':
            case 'user.disconnect':
                return  User.fromJSON(json);
            case 'user.communication':
                return  Communication.fromJSON(json);
            case 'sdp.transfer':
                return SdpTransfer.fromJSON(json);
            case 'ice.candidate':
                return IceCandidate.fromJSON(json);
            case 'chat.message':
                return Chat.fromJSON(json);
            case 'success':
                return Success.fromJSON(json);
            case 'error':
                return Error.fromJSON(json);
            default:
                return Message.fromJSON(json);
        }
    }
}

export default MessageFactory;
