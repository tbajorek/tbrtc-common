import { assert } from 'chai';
import uuidv4 from 'uuid';
import { User as UserMessage } from '../../messages/User';
import { User as UserModel } from '../../model/User';
import Data from "../../model/Data";

const userJSON = {
    id: uuidv4(),
    name: 'John',
    surname: 'Black',
    email: 'john@example.com',
    "_securedFields": [],
    "avatar": null,
    "connectionId": null
};
const userModel = new UserModel(userJSON.id, userJSON.name, userJSON.surname, userJSON.email);

const userMessageJSON = {
    id: null,
    type: 'user.connect',
    sessionId: null,
    user: userJSON,
    data: new Data(null),
    "_securedFields": []
};

describe('messages > User', function() {
    let userMessage;
    describe('#constructor()', function() {
        it('should create correct User message', function() {
            userMessage = new UserMessage(userMessageJSON.type, userModel);
            userMessageJSON.id = userMessage.id;
            assert.equal(userMessage.type, userMessageJSON.type);
            assert.deepEqual(userMessage.user, userModel);
        });
    });

    describe('#toJSON()', function() {
        it('should convert message to JSON object', function() {
            assert.deepEqual(userMessage.toJSON(), userMessageJSON);
        });
    });

    describe('#fromJSON()', function() {
        it('should create message from JSON object', function() {
            assert.deepEqual(UserMessage.fromJSON(userMessageJSON), userMessage);
        });
    });

    describe('#user()', function() {
        it('should get user object from session message', function() {
            assert.deepEqual(userMessage.user, userModel);
        });
    });
});
