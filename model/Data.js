import _ from 'underscore';
import { AbstractModel } from './AbstractModel';

/**
 * Model of additional data transferred in messages
 *
 * @module tbrtc-common/model
 */
class Data extends AbstractModel
{
    /**
     * During initialization it is wrapping source object in Data.
     * It can allow any objects to be serialized by using the mechanism provided by model.
     *
     * @param {object} inputData Source object
     */
    constructor(inputData = null) {
        super();
        if(inputData !== null) {
            const self = this;
            _.each(inputData, (value, name) => {
                self[name] = value;
            });
        }
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
        let map = {};
        _.each(this, (value, name) => {
            map[name] = name;
        });
        return map;
    }
}

export default Data;
