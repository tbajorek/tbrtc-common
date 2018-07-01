import _ from 'underscore'

export class AbstractModel
{
    get _serializedMap() {
        return {};
    }

    static fromJSON(input) {
        let object = this._createEmpty();
        _.each(this.prototype._serializedMap, function(value, key) {
            object[value] = input[key];
        });
        return object;
    }

    toJSON() {
        var result = {};
        var self = this;
        _.each(this._serializedMap, function(value, key) {
            if(typeof self !== 'undefined' && value in self) {
                if(typeof self[value] === 'object' && self[value] !== null && 'toJSON' in self[value]) {
                    result[key] = self[value].toJSON();
                } else if(Array.isArray(self[value])) {
                    var tmp = [];
                    self[value].forEach(function(elem){
                        if(typeof elem === 'object' && 'toJSON' in elem) {
                            tmp.push(elem.toJSON());
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
        return result;
    }

    static _createEmpty() {
        return new AbstractModel();
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    static fromString(inputString) {
        return this.fromJSON(JSON.parse(inputString));
    }
}
