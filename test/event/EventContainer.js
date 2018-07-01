import Event from '../../src/event/Event';
import EventContainer from '../../src/event/EventContainer';
import EventNotFound from '../../../tbrtc-server/src/exceptions/EventNotFound';

const { assert } = require('chai');

const handler1 = (e) => { e.data.nval = -e.data.val; return e; };
const handler2 = (e) => { e.data.tval = 8; return e; };
const event1 = new Event('event1', handler1, { val: 15 });

const container = EventContainer.instance;

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
            const oldData = { val: 15 };
            assert.deepEqual(container.event('event1').data, oldData);
            container.dispatch('event1', { aval: 11 });
            const newData = { val: 15, nval: -15, aval: 11, };
            assert.deepEqual(container.event('event1').data, newData);
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
            container.dispatch('event1');
            const data = {
                val: 15, nval: -15, tval: 8, aval: 11,
            };
            assert.deepEqual(container.event('event1').data, data);
        });

        it('should create empty event if it doesn\'t exist and attach new handler to it', () => {
            container.on('event2', handler2);
            container.dispatch('event2');
            assert.deepEqual(container.event('event2').data, { tval: 8 });
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
