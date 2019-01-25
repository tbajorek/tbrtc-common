import { assert } from 'chai';
import { SdpTransfer } from '../../messages/SdpTransfer';
import { Sdp } from '../../model/Sdp';
import { User as UserModel } from '../../model/User';
import Data from "../../model/Data";

const uuidv4 = require('uuid');

const userId = uuidv4();
const user = new UserModel(userId, '', '', '');
const sessionId = uuidv4();
const sdpA = new Sdp('offer', 'v=0\n' +
    'o=jdoe 2890844526 2890842807 IN IP4 10.47.16.5\n' +
    's=SDP Seminar\n' +
    'i=A Seminar on the session description protocol\n' +
    'u=http://www.example.com/seminars/sdp.pdf\n' +
    'e=j.doe@example.com (Jane Doe)\n' +
    'c=IN IP4 224.2.17.12/127\n' +
    't=2873397496 2873404696\n' +
    'a=recvonly\n' +
    'm=audio 49170 RTP/AVP 0\n' +
    'm=video 51372 RTP/AVP 99\n' +
    'a=rtpmap:99 h263-1998/90000', new UserModel(userId, '', '', ''));

const sdpB = new Sdp('answer', 'v=0\n' +
    'o=jdoe 2890844526 2890842807 IN IP4 10.47.16.5\n' +
    's=SDP Seminar\n' +
    'i=A Seminar on the session description protocol\n' +
    'u=http://www.example.com/seminars/sdp.pdf\n' +
    'e=j.doe@example.com (Jane Doe)\n' +
    'c=IN IP4 224.2.17.12/127\n' +
    't=2873397496 2873404696\n' +
    'a=recvonly\n' +
    'm=audio 49170 RTP/AVP 0\n' +
    'm=video 51372 RTP/AVP 99\n' +
    'a=rtpmap:99 h263-1998/90000', new UserModel(userId, '', '', ''));

const sdpAnswer = new SdpTransfer(sessionId, user, sdpA);
const sdpOffer = new SdpTransfer(sessionId, user, sdpB);

const answerJSON = {
    id: sdpAnswer.id,
    type: "sdp.transfer",
    sessionId,
    user: user.toJSON(),
    data: new Data({ sdp: sdpA.toJSON() }),
    "_securedFields": []
};

const offerJSON = {
    id: sdpOffer.id,
    type: "sdp.transfer",
    sessionId,
    user: user.toJSON(),
    data: new Data({ sdp: sdpB.toJSON() }),
    "_securedFields": []
};

describe('messages > SdpTransfer', function() {
    describe('#toJSON()', function() {
        it('should convert sdp message to JSON object', function() {
            assert.deepEqual(sdpAnswer.toJSON(), answerJSON);
            assert.deepEqual(sdpOffer.toJSON(), offerJSON);
        });
    });

    describe('#fromJSON()', function() {
        it('should create sdp message from JSON object', function() {
            assert.deepEqual(SdpTransfer.fromJSON(answerJSON), sdpAnswer);
            assert.deepEqual(SdpTransfer.fromJSON(offerJSON), sdpOffer);
        });
    });

    describe('#sdp()', function() {
        it('should get sdp data from message', function() {
            assert.equal(sdpAnswer.data.sdp, sdpA);
            assert.equal(sdpOffer.data.sdp, sdpB);
        });
    });
});
