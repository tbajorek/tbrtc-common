import { Message } from './Message';
import ValueChecker from '../utilities/ValueChecker';
import {User} from "../model/User";

export class Session extends Message
{
    static _createEmpty() {
        return new Session('message', null, null);
    }
}
