export class NonUnique {
    constructor(initData = [], key = 'id') {
        this._data = [];
        if (initData.length) {
            for (const object of initData) {
                this.push(object, key);
            }
        }
    }

    push(object, key = 'id') {
        this._data.push(object);
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
        this._data.forEach(callback);
    }

    get data() {
        return this._data;
    }

    toArray() {
        return this._data;
    }
}
