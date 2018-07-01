//https://github.com/clux/sdp-transform
import _ from 'underscore';
import transform from 'sdp-transform';
import ValueChecker from '../utilities/ValueChecker';
import { AbstractModel } from './AbstractModel';
import { User } from './User';
import bowser from 'bowser';

export class Sdp extends AbstractModel {
    constructor(type, originalSdp, sender, originalBrowser = null) {
        super();
        ValueChecker.check({ originalSdp, sender, originalBrowser }, {
            "originalSdp": {
                "required": true,
                "typeof": 'string'
            },
            "sender": {
                "typeof": ['object', 'null'],
                "instanceof": User,
            },
            "originalBrowser": {
                "typeof": ['string', 'null']
            }
        });
        this._type = type;
        this._data = originalSdp.replace(/\r\n/g, '\n');
        this._sender = sender;
        if (originalBrowser === null) {
            this._originalBrowser = bowser.name;
        } else {
            this._originalBrowser = originalBrowser;
        }
        this._parsed = null;
        this._changed = false;
    }

    get type() {
        return this._type;
    }

    get parsed() {
        if (this._parsed === null) {
            this._parsed = transform.parse(this._data);
        }
        return this._parsed;
    }

    set parsed(parsedData) {
        this._parsed = parsedData;
        this._changed = true;
    }

    get data() {
        if (this._parsed !== null && this._changed === true) {
            this._data = transform.write(this._parsed).replace(/\r\n/g, '\n');
            this._changed = false;
        }
        return this._data;
    }

    get sender() {
        return this._sender;
    }

    set bandwidth(value) {
        _.each(this.parsed.media, (singleMedia, index) => {
            if (singleMedia.type === 'video') {
                if (typeof singleMedia.bandwidth === 'undefined') {
                    this._parsed.media[index].bandwidth = [{}];
                }
                if (this._originalBrowser === 'firefox') {
                    this._parsed.media[index].bandwidth[0].type = 'TIAS';
                    this._parsed.media[index].bandwidth[0].limit = (value >>> 0) * 1000;
                } else {
                    this._parsed.media[index].bandwidth[0].type = 'AS';
                    this._parsed.media[index].bandwidth[0].limit = value;
                }
            }
        });
        this._changed = true;
    }

    get types() {
        return {
            OFFER: "offer",
            ANSWER: "answer",
            PRANSWER: "pranswer",
            ROLLBACK: "rollback",
        };
    }

    get _serializedMap() {
        return {
            "type": "_type",
            "sender": "_sender",
            "data": "_data",
            "originalBrowser": "_originalBrowser"
        };
    }

    get description() {
        return {
            type: this._type,
            sdp: this._data
        };
    }

    static fromDescription(description, sender) {
        return new Sdp(description.type, description.sdp, sender);
    }

    static _createEmpty() {
        return new Sdp('', '', null);
    }

    static fromJSON(input) {
        var object = super.fromJSON(input);
        object.sender = User.fromJSON(object.sender);
        return object;
    }
}