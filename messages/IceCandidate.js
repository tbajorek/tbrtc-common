import { Message } from './Message';
import { User as UserModel } from '../model/User';
import ValueChecker from '../utilities/ValueChecker';
import { IceCandidate as IceCandidateModel } from "./IceCandidate";


export class IceCandidate extends Message {
    constructor(type, user, iceModel) {
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
        super(type, null, user);
        this.data.ice = iceModel;
    }

    get ice() {
        return this.data.ice;
    }

    static _createEmpty() {
        return new IceCandidate('ice.candidate', null, null);
    }
}