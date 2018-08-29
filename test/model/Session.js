import { assert } from 'chai';
import { User } from '../../model/User'
import { Session } from '../../model/Session'

const user1JSON = {
    "id": 15,
    "name": "John Black",
    "email": "jblack@example.com"
};

const user2JSON = {
    "id": 1,
    "name": "Bobbie Edgardo",
    "email": "bobbie@example.com"
};

const user3JSON = {
    "id": 35,
    "name": "Spencer Sosimo",
    "email": "spencer@example.com"
};

const user4JSON = {
    "id": 11,
    "name": "Martin Bush",
    "email": "martinb@example.com"
};

const sessionJSON = {
    "id": 17,
    "creator": user1JSON,
    "members": [
        user2JSON, user3JSON
    ]
};

var user1 = new User(user1JSON.id, user1JSON.name, user1JSON.email);
var user2 = new User(user2JSON.id, user2JSON.name, user2JSON.email);
var user3 = new User(user3JSON.id, user3JSON.name, user3JSON.email);
var user4 = new User(user4JSON.id, user4JSON.name, user4JSON.email);
const members = [user2, user3];

var session = new Session(sessionJSON.id, user1, members);

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
            session.memberJoin(user4);
            assert.deepEqual(session.hasMember(user4), true);
        });
    });

    describe('#memberLeave()', function() {
        it('should leave User model from the session', function() {
            assert.deepEqual(session.hasMember(user4), true);
            session.memberLeave(user4.id);
            assert.deepEqual(session.hasMember(user4), false);
        });
    });
});
