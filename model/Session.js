import { User } from './User'
import { AbstractModel } from './AbstractModel'
import _ from 'underscore'
import Translation from '../translate/Translation'
import BadParamType from '../exceptions/BadParamType';

const translation = Translation.instance;

export class Session extends AbstractModel
{
    constructor(id = null, creator = null, members = []) {
        super();
        this._id = id;
        this.creator = creator;
        this._members = members;
        if(creator !== null) {
            this.join(creator);
        }
    }

    get id() {
        return this._id;
    }

    /**
     *
     * @returns {User[]}
     */
    get members() {
        return this._members;
    }

    hasMember(userId) {
        if(typeof userId === 'object' && 'id' in userId) {
            userId = userId.id;
        }
        return _.findIndex(this.members, member => member.id === userId) >= 0;
    }

    join(user) {
        if(!(user instanceof User)) {
            throw new BadParamType('user','Session.joinMember', 'model/User');
        }
        if(!this.hasMember(user.id)) {
            this._members.push(user);
            return user.joinSession(this);
        } else {
            console.warn(translation._('The user (id = {uid}) is already a member of the session (id = {sid})', {
                "uid": user.id,
                "sid": this.id
            })+'!');
        }
    }

    leave(userId) {
        const foundIndex = _.findIndex(this.members, member => member.id === userId);
        if(this.hasMember(userId)) {
            const member = this.members[foundIndex];
            this._members.splice(foundIndex, 1);
            return member.leaveSession(this.id);
        } else {
            console.warn(translation._('The user (id = {uid}) is not a member of the session (id = {sid})', {
                "uid": userId,
                "sid": this.id
            })+'!');
        }
    }

    isCreator(user) {
        if(!(user instanceof User)) {
            throw new BadParamType('user','Session.isCreator', 'model/User');
        }
        return this.creator !== null && this.creator.id === user.id;
    }

    get _serializedMap() {
        return {
            "id": "_id",
            "creator": "creator",
            "members": '_members'
        };
    };

    static _createEmpty() {
        return new Session(null, null);
    }

    static fromJSON(input) {
        var object = super.fromJSON(input);
        object.creator = User.fromJSON(object.creator);
        var members = [];
        object.members.forEach(function (elem) {
            members.push(User.fromJSON(elem));
        });
        object._members = members;
        return object;
    }
}
