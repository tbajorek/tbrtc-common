import EventContainer from "./EventContainer";
import Event from "./Event";

class ClassWithEvents {
    constructor() {
        /**
         * Event container
         * @type {EventContainer}
         * @protected
         */
        this._events = EventContainer._createInstance();
        this.builtInEvents.forEach(eventName => this._events.register(new Event(eventName)));
    }


    /**
     * Add new handler to specified event
     * @param {string} eventName Name of event
     * @param {function} handler Handler to be executed when event occurs
     */
    on(eventName, handler) {
        this._events.on(eventName, handler);
    }

    dispatch(eventName, params) {
        return this._events.dispatch(eventName, params);
    }

    /**
     * Return built-in events
     * @returns {string[]} Built-in events
     */
    get builtInEvents() {
        return [];
    }

    get events() {
        return this._events;
    }
}

export default ClassWithEvents;
