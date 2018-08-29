import _ from 'underscore';

export class Unique {
    constructor(initData = [], key = 'id') {
        this._data = {};
        if (initData.length) {
            for (const object of initData) {
                this.push(object, key);
            }
        }
    }

    push(object, key = 'id') {
        this._data[object[key]] = object;
        return this;
    }

    get(index) {
        return typeof this._data[index] !== 'undefined' ? this._data[index] : null;
    }

    set(index, newValue) {
        this._data[index] = newValue;
        return this;
    }

    remove(index) {
        delete this._data[index];
        return this;
    }

    forEach(callback) {
        for(const element of this._data) {
            callback(element);
        }
    }

    get data() {
        return this._data;
    }

    toArray() {
        return Object.entries(this._data).map(([k, v]) => v);
    }

    [Symbol.iterator]() {
        let index = 0;
        const keys = _.keys(this._data);
        return {
            next: () => {
                if (index < keys.length) {
                    return { value: this.data[keys[index++]], done: false };
                } else {
                    index = 0;
                    return { done: true };
                }
            },
        };
    }
}
