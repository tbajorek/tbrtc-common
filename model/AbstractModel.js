import _ from 'underscore'

/**
 * Abstract model which provides functionality to serialize and deserialize models to and from JSON objects
 *
 * @module tbrtc-common/model
 */
export class AbstractModel
{
    /**
     * Initialization of abstract model
     */
    constructor() {
        this._exposedFields = [];
        this._securedFields = [];
    }

    /**
     * It serializes a model to JSON object without hiding secured fields
     *
     * @return {object}
     */
    toUnsafeJSON(safe = false) {
        let result = {};
        let self = this;
        _.each(this._serializedMap, (value, key) => {
            if(typeof self !== 'undefined' && value in self) {
                if(typeof self[value] === 'object' && self[value] !== null && ('toJSON' in self[value] || 'toUnsafeJSON' in self[value])) {
                    if(safe) {
                        result[key] = self[value].toJSON();
                    } else {
                        result[key] = self[value].toUnsafeJSON();
                    }

                } else if(Array.isArray(self[value])) {
                    let tmp = [];
                    self[value].forEach((elem) => {
                        if(typeof elem === 'object' && ('toJSON' in elem || 'toUnsafeJSON' in elem)) {
                            if(safe) {
                                tmp.push(elem.toJSON());
                            } else {
                                tmp.push(elem.toUnsafeJSON());
                            }
                        } else {
                            tmp.push(elem);
                        }
                    });
                    result[key] = tmp;
                } else {
                    result[key] = self[value];
                }
            }
        });
        result._securedFields = this._securedFields;
        return result;
    }

    /**
     * It serializes a model to JSON object and hides secured fields
     *
     * @return {object}
     */
    toJSON() {
        return AbstractModel.hideSecureFields(this.toUnsafeJSON(true));
    }

    /**
     * It returns stringified JSON object
     *
     * @return {string}
     */
    toString() {
        return JSON.stringify(this.toJSON());
    }

    /**
     * It deserializes JSON input object to model
     *
     * @param {object} input Object serialized as JSON
     * @return {AbstractModel}
     */
    static fromJSON(input) {
        let object = this._createEmpty();
        _.each(object._serializedMap, function(value, key) {
            object[value] = input[key];
        });
        return object;
    }

    /**
     * It deserializes stringified JSON object to model
     *
     * @param {string} inputString String with serialized JSON object data
     * @return {AbstractModel}
     */
    static fromString(inputString) {
        return this.fromJSON(JSON.parse(inputString));
    }

    /**
     * It returns a serialized JSON object without properties which are marked as secured
     *
     * @param {object} unsafeModel Object with all properties
     * @return {object}
     */
    static hideSecureFields(unsafeModel) {
        const safeModel = unsafeModel;
        if(Array.isArray(unsafeModel._securedFields)) {
            for(const field of unsafeModel._securedFields) {
                safeModel[field] = null;
            }
        }
        return safeModel;
    }

    /**
     * It creates an empty model (used for deserialization mechanism)
     *
     * @return {AbstractModel}
     * @private
     */
    static _createEmpty() {
        return new AbstractModel();
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
        const result = {};
        for(const field of this._exposedFields) {
            result[field] = '_'+field;
        }
        return result;
    }
}
