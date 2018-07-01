import { Message } from './Message';
import { User as UserModel } from '../model/User';
import ValueChecker from '../utilities/ValueChecker';
import _ from "underscore";

export class User extends Message
{
    constructor(type, user = null) {
        ValueChecker.check({ user }, {
            "user": {
                "typeof": ['null', 'object'],
                "instanceof": UserModel
            }
        });
        super(type, null, user);
    }

    static _createEmpty() {
        return new User('message', null);
    }
}
