import {assert} from 'chai';
import Event from '../../src/event/Event';
import EventContainer from '../../src/event/EventContainer';

const handler1 = (e) => {
    assert.instanceOf(e, Event);//param is current Event object
    e.data.val = -15;
    return e;
};
const event1 = new Event('event1', handler1);

describe('event > Event', () => {
    describe('#constructor()', () => {
        it('should create event object', () => {
            assert.equal(event1.name, 'event1');
            assert.deepEqual(event1.handlers, [handler1]);
        });
    });

    describe('#attach()', () => {
        it('should add new handler', () => {
            assert.deepEqual(event1.attach((e) => { e.data.val2 = 6; return e; }), event1);
        });
    });

    describe('#dispatch()', () => {
        it('should dispatch the event and execute all handlers', () => {
            const expectedData = { nval: 21, val: -15, val2: 6 };
            assert.deepEqual(event1.dispatch({ nval: 21 }), expectedData);
        });
    });

    describe('#stopDispatching()', () => {
        it('should break dispatching', () => {
            event1.attach((e) => {
                e.data.last = 0;
                e.stopDispatching();
                return e;
            }).attach((e) => {
                e.data.something = 5;
            });
            const expectedData = {
                val: -15, val2: 6, last: 0,
            };
            assert.deepEqual(event1.dispatch(), expectedData);
        });
    });

    describe('#get eventContainer()', () => {
        it('should return registered event container', () => {
            const container = EventContainer.instance;
            container.register(event1);
            assert.deepEqual(event1.eventContainer, container);
        });
    });

    describe('#detach()', () => {
        it('should remove handler', () => {
            const event2 = new Event('event2', handler1);
            event2.detach(handler1);
            const data = { testval: 45 };
            assert.deepEqual(event2.dispatch(data), data);
        });
    });
});
