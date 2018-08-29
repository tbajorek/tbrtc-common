import { assert } from 'chai';
import { Session } from '../../messages/Session';

const uuidv4 = require('uuid');

const userId = uuidv4();
const sessionId = uuidv4();
const sessNew = new Session('session.new', null, userId);
const sessJoin = new Session('session.join', sessionId, userId);
const sessLeave = new Session('session.leave', sessionId, userId);
const sessClose = new Session('session.close', sessionId);

const sessNewJSON = {
    id: sessNew.id,
    type: "session.new",
    sessionId: null,
    data: { userId }
};

const sessJoinJSON = {
    id: sessJoin.id,
    type: "session.join",
    sessionId: sessionId,
    data: { userId }
};

const sessLeaveJSON = {
    id: sessLeave.id,
    type: "session.leave",
    sessionId: sessionId,
    data: { userId }
};

const sessCloseJSON = {
    id: sessClose.id,
    type: "session.close",
    sessionId: sessionId,
    data: { userId: null }
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
            assert.equal(sessNew.userId, userId);
            assert.equal(sessJoin.userId, userId);
            assert.equal(sessLeave.userId, userId);
            assert.equal(sessClose.userId, null);
        });
    });
});
