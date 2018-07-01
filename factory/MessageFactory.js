import BadJsonFormat from '../exceptions/BadJsonFormat'
import { Session } from '../messages/Session'
import { User } from '../messages/User'
import { SdpTransfer } from '../messages/SdpTransfer'
import { IceCandidate } from '../messages/IceCandidate'
import { Message } from '../messages/Message'
import { Success } from '../messages/result/Success'
import { Error } from '../messages/result/Error'

class  MessageFactory
{
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
            case 'sdp.transfer':
                return SdpTransfer.fromJSON(json);
            case 'ice.candidate':
                return IceCandidate.fromJSON(json);
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
