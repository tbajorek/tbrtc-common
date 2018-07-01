import _ from 'underscore';
import BadParamType from '../exceptions/BadParamType';
import Event from './Event';
import EventNotFound from '../exceptions/EventNotFound';

/**
 * @module tbrtc-server/event
 */

const EventContainer = {
    _instance: null,
    get instance() {
        if (!this._instance) {
            this._instance = this._createInstance();
        }
        return this._instance;
    },
    _createInstance() {
        return {
            _events: [],
            register(event) {
                if (event instanceof Event) {
                    const foundIndex = _.findIndex(this._events, e => e.name === event.name);
                    if(foundIndex < 0) {
                        event._registerContainer(this);
                        this._events.push(event);
                    }
                } else {
                    throw new BadParamType('event', 'EventContainer.addEvent', 'event/Event');
                }
            },
            dispatch(eventName, data = {}) {
                return this.event(eventName).dispatch(data);
            },
            event(eventName) {
                if (typeof eventName !== 'string') {
                    throw new BadParamType('event', 'EventContainer.dispatch', 'string');
                }
                const foundIndex = _.findIndex(this._events, event => event.name === eventName);
                if (foundIndex < 0) {
                    throw new EventNotFound(eventName);
                }
                return this._events[foundIndex];
            },
            on(eventName, handler) {
                try {
                    const foundEvent = this.event(eventName);
                    foundEvent.attach(handler);
                    return this;
                } catch (e) {
                    if (!(e instanceof EventNotFound)) {
                        throw e;
                    } else {
                        this.register(new Event(eventName, handler, {}));
                        return this;
                    }
                }
            },
            forEach(callback) {
                return this._events.forEach(callback);
            },
            get available() {
                const names = [];
                _.each(this._events, (event) => {
                    names.push(event.name);
                });
                return names;
            },
        };
    }
};

export default EventContainer;
