import { assert } from 'chai';
import { SdpTransfer } from '../../messages/SdpTransfer';
import { Sdp } from '../../model/Sdp';

const uuidv4 = require('uuid');

const userId = uuidv4();
const sessionId = uuidv4();
const sdp = new Sdp('v=0\n' +
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
    'a=rtpmap:99 h263-1998/90000');

const sdpAnswer = new SdpTransfer('answer', sessionId, userId, sdp);
const sdpOffer = new SdpTransfer('offer', sessionId, userId, sdp);

const answerJSON = {
    id: sdpAnswer.id,
    type: "answer",
    sessionId,
    data: { userId, sdp: sdp.toJSON() }
};

const offerJSON = {
    id: sdpOffer.id,
    type: "offer",
    sessionId,
    data: { userId, sdp: sdp.toJSON() }
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
            assert.equal(sdpAnswer.sdp, sdp);
            assert.equal(sdpOffer.sdp, sdp);
        });
    });
});
