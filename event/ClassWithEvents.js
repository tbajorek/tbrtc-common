import EventContainer from "./EventContainer";
import Event from "./Event";

/**
 * @module tbrtc-server/event
 */

class ClassWithEvents {
    /**
     * Initialize a class which is using events inside it
     */
    constructor() {
        /**
         * Event container
         *
         * @type {EventContainer}
         * @protected
         */
        this._events = EventContainer.createInstance();
        this.builtInEvents.forEach(eventName => this._events.register(new Event(eventName)));
    }

    /**
     * Add new handler to specified event
     *
     * @param {string} eventName Name of event
     * @param {function} handler Handler to be executed when event occurs
     */
    on(eventName, handler) {
        this._events.on(eventName, handler);
    }

    /**
     * It dispatches a concrete events with passed parameters
     *
     * @param {string} eventName Name of dispatched event
     * @param {object} params Set of passed parameters
     * @return {*|Object}
     */
    dispatch(eventName, params) {
        return this._events.dispatch(eventName, params);
    }

    /**
     * It imports events registered in the passed container
     *
     * @param {EventContainer} eventContainer Container with events
     */
    importEvents(eventContainer) {
        this._events.import(eventContainer);
    }

    /**
     * Return built-in events
     *
     * @readonly
     * @property
     * @type {string[]}
     */
    get builtInEvents() {
        return [];
    }

    /**
     * It contains all registered events
     *
     * @readonly
     * @property
     * @type {EventContainer}
     */
    get events() {
        return this._events;
    }
}

export default ClassWithEvents;
