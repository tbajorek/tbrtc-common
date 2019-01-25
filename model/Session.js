import { User } from './User'
import { AbstractModel } from './AbstractModel'
import _ from 'underscore'
import Translation from '../translate/Translation'
import BadParamType from '../exceptions/BadParamType';

const translation = Translation.instance;

/**
 * Model of session which creates a connection between users who joined it
 *
 * @module tbrtc-common/model
 */
export class Session extends AbstractModel
{
    /**
     * Initialization of the session model
     *
     * @param {string|null} id Session identifier
     * @param {User|null} creator User who created session (if it is created already)
     * @param {User[]} members Array of users who joined to the session (including the creator)
     */
    constructor(id = null, creator = null, members = []) {
        super();
        this._id = id;
        this.creator = creator;
        this._members = members;
        if(creator !== null) {
            this.join(creator);
        }
    }

    /**
     * User who created session (if it is created already)
     *
     * @property
     * @readonly
     * @type {string|null}
     */
    get id() {
        return this._id;
    }

    /**
     * Array of users who joined to the session (including the creator)
     *
     * @property
     * @readonly
     * @type {User[]}
     */
    get members() {
        return this._members;
    }

    /**
     * It checks if user with the given identifier is a member of the session
     *
     * @param {string|User} userId User identifier
     * @return {boolean}
     */
    hasMember(userId) {
        if(typeof userId === 'object' && 'id' in userId) {
            userId = userId.id;
        }
        return _.findIndex(this.members, member => member.id === userId) >= 0;
    }

    /**
     * It joins a new user to the session
     *
     * @param {User} user User who is joining to the session
     * @return {boolean}
     */
    join(user) {
        if(!(user instanceof User)) {
            throw new BadParamType('user','Session.joinMember', 'model/User');
        }
        if(!this.hasMember(user.id)) {
            this._members.push(user);
            return true;
        } else {
            console.warn(translation._('The user (id = {uid}) is already a member of the session (id = {sid})', {
                "uid": user.id,
                "sid": this.id
            })+'!');
            return false;
        }
    }

    /**
     * It removes a user with passed identifier from a set of session members.
     * If there is the user, it is returned.
     *
     * @param {string} userId User identifier
     * @return {User|null}
     */
    leave(userId) {
        const foundIndex = _.findIndex(this.members, member => member.id === userId);
        if(this.hasMember(userId)) {
            const member = this.members[foundIndex];
            this._members.splice(foundIndex, 1);
            return member;
        } else {
            console.warn(translation._('The user (id = {uid}) is not a member of the session (id = {sid})', {
                "uid": userId,
                "sid": this.id
            })+'!');
            return null;
        }
    }

    /**
     * It checks if the passed user is creator of the session
     *
     * @param {User} user Checked user
     * @return {boolean}
     */
    isCreator(user) {
        if(!(user instanceof User)) {
            throw new BadParamType('user','Session.isCreator', 'model/User');
        }
        return this.creator !== null && this.creator.id === user.id;
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
            "id": "_id",
            "creator": "creator",
            "members": '_members'
        };
    };

    /**
     * It creates an empty model (used for deserialization mechanism)
     *
     * @return {Session}
     * @private
     */
    static _createEmpty() {
        return new Session(null, null);
    }

    /**
     * It deserializes JSON input object to model
     *
     * @param {object} input Object serialized as JSON
     * @return {Session}
     */
    static fromJSON(input) {
        const object = super.fromJSON(input);
        object.creator = User.fromJSON(object.creator);
        const members = [];
        object.members.forEach(function (elem) {
            members.push(User.fromJSON(elem));
        });
        object._members = members;
        return object;
    }
}
