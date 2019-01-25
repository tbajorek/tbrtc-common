import { assert } from 'chai';
import { Session } from '../../messages/Session';
import { User } from '../../model/User';
import Data from "../../model/Data";

const uuidv4 = require('uuid');

const userId = uuidv4();
const sessionId = uuidv4();
const user = new User(userId, '', '', '');
const sessNew = new Session('session.new', null, user);
const sessJoin = new Session('session.join', sessionId, user);
const sessLeave = new Session('session.leave', sessionId, user);
const sessClose = new Session('session.close', sessionId);

const sessNewJSON = {
    id: sessNew.id,
    type: "session.new",
    sessionId: null,
    user: user.toJSON(),
    data: new Data(null),
    "_securedFields": []
};

const sessJoinJSON = {
    id: sessJoin.id,
    type: "session.join",
    sessionId: sessionId,
    user: user.toJSON(),
    data: new Data(null),
    "_securedFields": []
};

const sessLeaveJSON = {
    id: sessLeave.id,
    type: "session.leave",
    sessionId: sessionId,
    user: user.toJSON(),
    data: new Data(null),
    "_securedFields": []
};

const sessCloseJSON = {
    id: sessClose.id,
    type: "session.close",
    sessionId: sessionId,
    user: null,
    data: new Data(null),
    "_securedFields": []
};

describe('messages > Session', function() {
    describe('#toJSON()', function() {
        it('should convert message to JSON object', function() {
            assert.deepEqual(sessNew.toJSON(), sessNewJSON);
            assert.deepEqual(sessJoin.toJSON(), sessJoinJSON);
            assert.deepEqual(sessLeave.toJSON(), sessLeaveJSON);
            assert.deepEqual(sessClose.toJSON(), sessCloseJSON);
        });
    });

    describe('#fromJSON()', function() {
        it('should create message from JSON object', function() {
            assert.deepEqual(Session.fromJSON(sessNewJSON), sessNew);
            assert.deepEqual(Session.fromJSON(sessJoinJSON), sessJoin);
            assert.deepEqual(Session.fromJSON(sessLeaveJSON), sessLeave);
            assert.deepEqual(Session.fromJSON(sessCloseJSON), sessClose);
        });
    });

    describe('#userId()', function() {
        it('should get user id from session message', function() {
            assert.equal(sessNew.user, user);
            assert.equal(sessJoin.user, user);
            assert.equal(sessLeave.user, user);
            assert.equal(sessClose.user, null);
        });
    });
});
