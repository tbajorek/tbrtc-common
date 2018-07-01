import _ from 'underscore';
import { AbstractModel } from './AbstractModel';

class Data extends AbstractModel
{
    /*toJSON() {
        var result = {};
        _.each(this, (value, name) => {

        })
    }*/

    constructor(inputData = null) {
        super();
        if(inputData !== null) {
            const self = this;
            _.each(inputData, (value, name) => {
                self[name] = value;
            });
        }
    }

    get _serializedMap() {
        let map = {};
        _.each(this, (value, name) => {
            map[name] = name;
        });
        return map;
    }
}

export default Data;
