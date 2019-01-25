import Event from '../../event/Event';
import EventContainer from '../../event/EventContainer';
import EventNotFound from '../../exceptions/EventNotFound';

const { assert } = require('chai');

let executed = false;
let executed2 = false;
const handler1 = (e) => { executed = e.data; };
const handler2 = (e) => { executed2 = e.data; };
const event1 = new Event('event1', handler1);

const container = EventContainer.createInstance();

describe('event > EventContainer', () => {
    describe('#get instance()', () => {
        it('should return always single and the same instance', () => {
            assert.instanceOf(container, EventContainer.constructor);
        });
    });

    describe('#register() && event()', () => {
        it('should register event in the container', () => {
            assert.throws(() => { container.event('event1'); }, EventNotFound);
            container.register(event1);
            assert.deepEqual(event1.eventContainer, container);
            assert.deepEqual(container.event('event1'), event1);
        });
    });

    describe('#dispatch()', () => {
        it('should iterate through all events', () => {
            assert.deepEqual(container.event('event1').data, {});
            container.dispatch('event1', { aval: 11 });
            const newData = { aval: 11, };
            assert.deepEqual(executed, newData);
        });
    });

    describe('#forEach()', () => {
        it('should iterate through all events', () => {
            container.forEach((event) => {
                assert.deepEqual(event, event1);
            });
        });
    });

    describe('#on()', () => {
        it('should attach new handler to specified event', () => {
            container.on('event1', handler2);
            const data = {
                val: 15, nval: -15, tval: 8, aval: 11,
            };
            container.dispatch('event1', data);
            assert.deepEqual(executed, data);
            assert.deepEqual(executed2, data);
        });

        it('should create empty event if it doesn\'t exist and attach new handler to it', () => {
            container.on('event2', handler2);
            container.dispatch('event2', { tval: 8 });
            assert.deepEqual(executed2, { tval: 8 });
        });
    });

    describe('#get available()', () => {
        it('should register event in the container', () => {
            assert.equal(container.available.length, 2);
            assert.equal(container.available[0], event1.name);
            assert.equal(container.available[1], 'event2');
        });
    });
});
