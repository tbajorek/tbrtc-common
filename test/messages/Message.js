import { assert } from 'chai';
import { Message } from '../../messages/Message';

const uuidv4 = require('uuid');

const uuid1 = uuidv4();
const uuid2 = uuidv4();
const data = { var1: "value1" };
const message1 = new Message('message');
const message2 = new Message('message', uuid1);
const message3 = new Message('message', uuid2, data);

const message1JSON = {
    id: message1.id,
    type: "message",
    sessionId: null,
    data: null
};

const message2JSON = {
    id: message2.id,
    type: "message",
    sessionId: uuid1,
    data: null
};

const message3JSON = {
    id: message3.id,
    type: "message",
    sessionId: uuid2,
    data: data
};

describe('messages > Message', function() {
    describe('#constructor() && get()', function() {
        it('should create correct basic message and get properties', function() {
            assert.equal(message1.type, 'message');
            assert.equal(message1.sessionId, null);
            assert.deepEqual(message1.data, null);
            assert.equal(message2.sessionId, uuid1);
            assert.equal(message3.sessionId, uuid2);
            assert.deepEqual(message3.data, data);
        });
    });

    describe('#toJSON()', function() {
        it('should convert message to JSON object', function() {
            assert.deepEqual(message1.toJSON(), message1JSON);
            assert.deepEqual(message2.toJSON(), message2JSON);
            assert.deepEqual(message3.toJSON(), message3JSON);
        });
    });

    describe('#fromJSON()', function() {
        it('should create message from JSON object', function() {
            assert.deepEqual(Message.fromJSON(message1JSON), message1);
            assert.deepEqual(Message.fromJSON(message2JSON), message2);
            assert.deepEqual(Message.fromJSON(message3JSON), message3);
        });
    });

    describe('#set data()', function() {
        it('should set data object in message', function() {
            message1.data = data;
            assert.deepEqual(message1.data, data);
        });
    });
});
