import {assert} from 'chai';
import { Unique } from '../../utilities/array/Unique';

const elem1 = {'id': 1, 'value': 1};
const elem2 = {'id': 2, 'value': 1};
const elem3 = {'id': 3, 'value': 3};

let uniqueArray;

describe('utilities > array > Unique', () => {
    describe('#constructor()', () => {
        it('should create event object', () => {
            uniqueArray = new Unique([elem1, elem1, elem2]);
            assert.equal(uniqueArray.length, 2);

        });
    });

    describe('#get()', () => {
        it('should return good values', () => {
            assert.deepEqual(uniqueArray.get(1), elem1);
            assert.deepEqual(uniqueArray.get(2), elem2);
        });

        it('should not return non-existing element', () => {
            assert.isNull(uniqueArray.get(999));
        });
    });

    describe('#set()', () => {
        it('should change existing element', () => {
            assert.equal(uniqueArray.get(1).value, 1);
            uniqueArray.set(1, {id: 1, value: 8});
            assert.equal(uniqueArray.get(1).value, 8);
        });

        it('should set non-existing element', () => {
            assert.isNull(uniqueArray.get(999));
            uniqueArray.set(999, {id: 999, value: 11});
            assert.equal(uniqueArray.get(999).value, 11);
            assert.equal(uniqueArray.length, 3);
        });
    });

    describe('#push()', () => {
        it('should push a new element', () => {
            assert.equal(uniqueArray.length, 3);
            uniqueArray.push(elem3);
            assert.equal(uniqueArray.length, 4);
            assert.equal(uniqueArray.get(3).value, 3);
        });

        it('should not push an existing element', () => {
            assert.equal(uniqueArray.length, 4);
            uniqueArray.push(elem1);
            assert.equal(uniqueArray.length, 4);
        });
    });

    describe('#remove()', () => {
        it('should remove an existing element', () => {
            assert.equal(uniqueArray.length, 4);
            uniqueArray.remove(999);
            assert.equal(uniqueArray.length, 3);
        });

        it('should not remove a non-existing element', () => {
            assert.equal(uniqueArray.length, 3);
            uniqueArray.remove(549);
            assert.equal(uniqueArray.length, 3);
        });
    });

    describe('#toArray()', () => {
        it('should convert data to array', () => {
            const dataArray = uniqueArray.toArray();
            assert.deepEqual(dataArray, [elem1, elem2, elem3]);
        });
    });

    describe('#forEach()', () => {
        it('should iterate over the array', () => {
            const original = [elem1, elem2, elem3];
            let index = 0;
            uniqueArray.forEach((elem) => {
                assert.deepEqual(elem, original[index++]);
            });
        });
    });

    describe('#[iterator]', () => {
        it('should iterate over the array', () => {
            const original = [elem1, elem2, elem3];
            let index = 0;
            for(const elem of uniqueArray) {
                assert.deepEqual(elem, original[index++]);
            }
        });
    });
});