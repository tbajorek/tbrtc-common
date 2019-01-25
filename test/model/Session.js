import { assert } from 'chai';
import { User } from '../../model/User'
import { Session } from '../../model/Session'

const user1JSON = {
    "id": 15,
    "name": "John",
    "surname": "Black",
    "email": "jblack@example.com",
    "avatar": null,
    "connectionId": null,
    "_securedFields": []
};

const user2JSON = {
    "id": 1,
    "name": "Bobbie",
    "surname": "Edgardo",
    "email": "bobbie@example.com",
    "avatar": null,
    "connectionId": null,
    "_securedFields": []
};

const user3JSON = {
    "id": 35,
    "name": "Spencer",
    "surname": "Sosimo",
    "email": "spencer@example.com",
    "avatar": null,
    "connectionId": null,
    "_securedFields": []
};

const user4JSON = {
    "id": 11,
    "name": "Martin",
    "surname": "Bush",
    "email": "martinb@example.com",
    "avatar": null,
    "connectionId": null,
    "_securedFields": []
};

const sessionJSON = {
    "id": 17,
    "creator": user1JSON,
    "members": [
        user2JSON, user3JSON, user1JSON
    ],
    "_securedFields": []
};

const user1 = new User(user1JSON.id, user1JSON.name, user1JSON.surname, user1JSON.email);
const user2 = new User(user2JSON.id, user2JSON.name, user2JSON.surname, user2JSON.email);
const user3 = new User(user3JSON.id, user3JSON.name, user3JSON.surname, user3JSON.email);
const user4 = new User(user4JSON.id, user4JSON.name, user4JSON.surname, user4JSON.email);
const members = [user2, user3];

const session = new Session(sessionJSON.id, user1, members);

describe('model > Session', function() {
    describe('#constructor()', function() {
        it('should create correct Session model', function() {
            assert.equal(session.id, sessionJSON.id);
            assert.deepEqual(session.creator, user1);
            assert.deepEqual(session.members, members);
        });
    });

    describe('#toJSON()', function() {
        it('should convert model to JSON object', function() {
            assert.deepEqual(session.toJSON(), sessionJSON);
        });
    });

    describe('#fromJSON()', function() {
        it('should create model from JSON object', function() {
            var sessionFrom = Session.fromJSON(sessionJSON);
            assert.deepEqual(sessionFrom, session);
        });
    });

    describe('#hasMember()', function() {
        it('should check if user is a member of the session', function() {
            assert.deepEqual(session.hasMember(user2.id), true);
            assert.deepEqual(session.hasMember(user4.id), false);
        });
    });

    describe('#memberJoin()', function() {
        it('should join User model to the session', function() {
            assert.deepEqual(session.hasMember(user4), false);
            session.join(user4);
            assert.deepEqual(session.hasMember(user4), true);
        });
    });

    describe('#memberLeave()', function() {
        it('should leave User model from the session', function() {
            assert.deepEqual(session.hasMember(user4), true);
            session.leave(user4.id);
            assert.deepEqual(session.hasMember(user4), false);
        });
    });
});
