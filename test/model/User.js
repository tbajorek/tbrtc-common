import { assert } from 'chai';
import {User} from '../../model/User'

const userJSON = {
    "id": 15,
    "name": "John Black",
    "email": "jblack@example.com"
};

describe('model > User', function() {
    describe('#constructor()', function() {
        it('should create correct User model', function() {
            var user = new User(userJSON.id, userJSON.name, userJSON.email);
            assert.equal(user.id, userJSON.id);
            assert.equal(user.name, userJSON.name);
            assert.equal(user.email, userJSON.email);
        });
    });

    describe('#toJSON()', function() {
        it('should convert model to JSON object', function() {
            var user = new User(userJSON.id, userJSON.name, userJSON.email);
            assert.deepEqual(user.toJSON(), userJSON);
        });
    });

    describe('#fromJSON()', function() {
        it('should create model from JSON object', function() {
            var userFrom = User.fromJSON(userJSON);
            var userOrig = new User(userJSON.id, userJSON.name, userJSON.email);
            assert.deepEqual(userFrom, userOrig);
        });
    });
});
