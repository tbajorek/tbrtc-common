import _ from 'underscore';
import transform from 'sdp-transform';
import ValueChecker from '../utilities/ValueChecker';
import { AbstractModel } from './AbstractModel';
import { User } from './User';
import bowser from 'bowser';

/**
 * Model of SDP data sent when peer-to-peer connection is being established
 *
 * @module tbrtc-common/model
 */
export class Sdp extends AbstractModel {
    /**
     * Initialization of the SDP model
     *
     * @param {string} type Type of sending data (offer or answer)
     * @param {string} originalSdp Original SDP data
     * @param {User} sender User who sends the data
     * @param {string|null} originalBrowser Name of original browser of sender
     */
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

    /**
     * Type of sending data (offer or answer)
     *
     * @property
     * @readonly
     * @type {string}
     */
    get type() {
        return this._type;
    }

    /**
     * SDP data parsed to JSON object
     *
     * @property
     * @readonly
     * @type {object}
     */
    get parsed() {
        if (this._parsed === null) {
            this._parsed = transform.parse(this._data);
        }
        return this._parsed;
    }

    /**
     * It sets a new version of parsed SDP data. It requires to update object later.
     *
     * @param {object} parsedData New parsed SDP data
     */
    set parsed(parsedData) {
        this._parsed = parsedData;
        this._changed = true;
    }

    /**
     * Original SDP data stored as string
     *
     * @property
     * @readonly
     * @type {string}
     */
    get data() {
        if (this._parsed !== null && this._changed === true) {
            this._data = transform.write(this._parsed).replace(/\r\n/g, '\n');
            this._changed = false;
        }
        return this._data;
    }

    /**
     * User who sends the data
     *
     * @property
     * @readonly
     * @type {User}
     */
    get sender() {
        return this._sender;
    }

    /**
     * It sets a new value of bandwidth in SDP data
     *
     * @param {number} value New value of bandwidth
     */
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

    /**
     * Session description converted to original RTCSessionDescription object
     *
     * @property
     * @readonly
     * @type {RTCSessionDescription}
     */
    get description() {
        return new RTCSessionDescription({
            type: this._type,
            sdp: this._data
        });
    }

    /**
     * Session description converted to original RTCSessionDescription object
     *
     * @property
     * @static
     * @readonly
     * @type {object}
     */
    static get types() {
        return {
            OFFER: "offer",
            ANSWER: "answer",
            PRANSWER: "pranswer",
            ROLLBACK: "rollback",
        };
    }

    /**
     * Mapping of properties how to transform serialized and deserialized objects
     *
     * @property
     * @readonly
     * @type {object}
     * @private
     */
    get _serializedMap() {
        return {
            "type": "_type",
            "sender": "_sender",
            "data": "_data",
            "originalBrowser": "_originalBrowser"
        };
    }

    /**
     * It creates Sdp model from original SDP object used by browsers
     *
     * @param {RTCSessionDescription} description Original SDP object
     * @param {User} sender User who sends the data
     * @return {Sdp}
     */
    static fromDescription(description, sender) {
        return new Sdp(description.type, description.sdp, sender);
    }

    /**
     * It creates an empty model (used for deserialization mechanism)
     *
     * @return {Sdp}
     * @private
     */
    static _createEmpty() {
        return new Sdp('', '', null);
    }

    /**
     * It deserializes JSON input object to model
     *
     * @param {object} input Object serialized as JSON
     * @return {Sdp}
     */
    static fromJSON(input) {
        const object = super.fromJSON(input);
        object._sender = User.fromJSON(object.sender);
        return object;
    }
}