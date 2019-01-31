import _ from 'underscore';

export class Unique {
    constructor(initData = [], key = 'id') {
        this._data = {};
        this._length = 0;
        if (initData.length) {
            for (const object of initData) {
                this.push(object, key);
            }
        }
    }

    push(object, key = 'id') {
        if(!(object[key] in this._data)) {
            ++this._length;
        }
        this._data[object[key]] = object;
        return this;
    }

    get(index) {
        return typeof this._data[index] !== 'undefined' ? this._data[index] : null;
    }

    set(index, newValue) {
        if(!(index in this._data)) {
            ++this._length;
        }
        this._data[index] = newValue;
        return this;
    }

    remove(index) {
        if(index in this._data) {
            --this._length;
        }
        delete this._data[index];
        return this;
    }

    forEach(callback) {
        for(const element of this.toArray()) {
            callback(element);
        }
    }

    get data() {
        return this._data;
    }

    get length() {
        return this._length;
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
