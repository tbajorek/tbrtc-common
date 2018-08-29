import { assert } from 'chai';
import transform from 'sdp-transform'
import { Sdp } from '../../model/Sdp'
import _ from 'underscore'

const sdp = 'v=0\n' +
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
    'b=TIAS:1000\n' +
    'a=rtpmap:99 h263-1998/90000\n';

const sdpModel = new Sdp(sdp, 'firefox');
const parsed = transform.parse(sdp);

const newSdp = 'v=0\n' +
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
    'b=TIAS:2000000\n' +
    'a=rtpmap:99 h263-1998/90000\n';

const newParsed = transform.parse(newSdp);

describe('model > Sdp', function() {
    describe('#toJSON()', function() {
        it('should convert model to JSON object', function() {
            assert.deepEqual(sdpModel.toJSON(), { data: sdp, originalBrowser: 'firefox' });
        });
    });

    describe('#fromJSON()', function() {
        it('should create model from JSON object', function() {
            assert.deepEqual(Sdp.fromJSON({ data: sdp, originalBrowser: 'firefox' }), sdpModel);
        });
    });


    describe('#get parsed()', function() {
        it('should get parsed sdp data', function() {
            assert.deepEqual(sdpModel.parsed, parsed);
        });
    });

    describe('#set bandwidth()', function() {
        it('should set bandwidth data in sdp', function() {
            sdpModel.bandwidth = 2000;
            assert.deepEqual(sdpModel.parsed, newParsed);
            assert.deepEqual(sdpModel.data, newSdp);
        });
    });

    describe('#set sdp()', function() {
        it('should set all data in sdp', function() {
            sdpModel.parsed = parsed;
            assert.deepEqual(sdpModel.data, sdp);
        });
    });
});
