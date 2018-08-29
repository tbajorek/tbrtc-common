import _ from 'underscore';
import BadParamType from '../exceptions/BadParamType';
import Event from './Event';
import EventNotFound from '../exceptions/EventNotFound';

/**
 * @module tbrtc-server/event
 */

/**
 * Class of single event container
 */
class EventContainerClass {
    /**
     * Initialization of event container
     */
    constructor() {
        this._events = [];
    }

    /**
     * It registers a new event in the container
     *
     * @param {Event} event
     */
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
    }

    /**
     * It dispatches the given event with passed parameters. Return value is an object returned by event handlers (if they return anything).
     *
     * @param eventName Name of the event
     * @param data Parameters passed to the dispatched event
     * @return {Object|null}
     */
    dispatch(eventName, data = {}) {
        return this.event(eventName).dispatch(data);
    }

    /**
     * It returns event with the given name. If there is no specified event, an exeption will be thrown.
     *
     * @param {string} eventName Name of the event
     * @return {Event}
     */
    event(eventName) {
        if (typeof eventName !== 'string') {
            throw new BadParamType('event', 'EventContainer.dispatch', 'string');
        }
        const foundIndex = _.findIndex(this._events, event => event.name === eventName);
        if (foundIndex < 0) {
            throw new EventNotFound(eventName);
        }
        return this._events[foundIndex];
    }

    /**
     * It assigns a function to handle the event
     *
     * @param {string} eventName Name of the event
     * @param {function} handler Function to handle the event when it occurs
     * @return {EventContainerClass}
     */
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
    }

    /**
     * It iterates through all events and executes callback function with every of them passed by its parameter
     *
     * @param {function} callback Callback function
     */
    forEach(callback) {
        this._events.forEach(callback);
    }

    /**
     * It imports events registered in the passed container
     *
     * @param {EventContainer} eventContainer Container with events
     */
    import(eventContainer) {
         eventContainer.forEach(event => {
            for(const handler of event.handlers) {
                this.on(event.name, handler);
            }
        });
    }

    /**
     * All names of events which are registered in the container
     *
     * @property
     * @readonly
     * @type {string[]}
     */
    get available() {
        const names = [];
        _.each(this._events, (event) => {
            names.push(event.name);
        });
        return names;
    }
}

/**
 * Universal event container which can be used in two ways: as a global singleton object or as a factory of local containers
 */
const EventContainer = {
    /**
     * @private
     * @property
     * @type {EventContainerClass}
     */
    _instance: null,
    /**
     * It contains always an one object of event container which can be used globally
     *
     * @property
     * @readonly
     * @type {EventContainerClass}
     */
    get instance() {
        if (!this._instance) {
            this._instance = this.createInstance();
        }
        return this._instance;
    },
    /**
     * It creates a new instance of event container
     *
     * @return {EventContainerClass}
     */
    createInstance() {
        return new EventContainerClass();
    }
};

export default EventContainer;
