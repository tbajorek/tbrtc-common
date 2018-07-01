import ValueChecker from '../../utilities/ValueChecker';
import Translation from '../../translate/Translation';
import {Message} from "../Message";

const uuidv4 = require('uuid');

export class Success extends Message
{
    constructor(content, sessionId = null, details = null) {
        ValueChecker.check({content, details}, {
            "content": {
                "required": true,
                "typeof": "string"
            },
            "details": {
                "typeof": ['object', 'null']
            }
        });
        super('success', sessionId, null, {content, details});
    }

    get content() {
        return Translation.instance._(this.data.content, this.data.details);
    }

    get details() {
        return this.data.details;
    }

    static _createEmpty() {
        return new Success('');
    }
}
