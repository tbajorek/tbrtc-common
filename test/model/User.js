import { assert } from 'chai';
import {User} from '../../model/User'

const userJSON = {
    "id": 15,
    "name": "John",
    "surname": "Black",
    "email": "jblack@example.com",
    "_securedFields": [],
    "avatar": null,
    "connectionId": null
};

describe('model > User', function() {
    describe('#constructor()', function() {
        it('should create correct User model', function() {
            const user = new User(userJSON.id, userJSON.name, userJSON.surname, userJSON.email);
            assert.equal(user.id, userJSON.id);
            assert.equal(user.name, userJSON.name);
            assert.equal(user.email, userJSON.email);
        });
    });

    describe('#toJSON()', function() {
        it('should convert model to JSON object', function() {
            const user = new User(userJSON.id, userJSON.name, userJSON.surname, userJSON.email);
            assert.deepEqual(user.toJSON(), userJSON);
        });
    });

    describe('#fromJSON()', function() {
        it('should create model from JSON object', function() {
            const userFrom = User.fromJSON(userJSON);
            const userOrig = new User(userJSON.id, userJSON.name, userJSON.surname, userJSON.email);
            assert.deepEqual(userFrom, userOrig);
        });
    });
});
