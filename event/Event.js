import _ from 'underscore';
import clone from 'clone';
import BadParamType from '../exceptions/BadParamType';
import Translation from '../translate/Translation';

/**
 * @module tbrtc-server/event
 */

/**
 * Single event
 */
class Event
{
    /**
     * Create new event
     * @param {String} name Event name
     * @param {Function[]|Function} handler Handler to be executed when event occurs
     */
    constructor(name, handler = []) {
        /**
         * Event name
         * @type {String}
         * @private
         */
        this._name = name;
        /**
         * List of handlers assigned to the event
         * @type {Function[]}
         * @private
         */
        this._handlers = [];
        if (Array.isArray(handler)) {
            this._handlers = handler;
        } else if (typeof handler === 'function') {
            this._handlers = [handler];
        } else {
            throw new BadParamType('handler', 'Event.constructor', 'array / function');
        }
        /**
         * Flag if event is currently dispatched
         * @type {boolean}
         * @private
         */
        this._dispatching = false;
        /**
         * Event container where this event is registered
         * @type {EventContainer|null}
         * @private
         */
        this._eventContainer = null;
    }

    /**
     * Add new handler to the event
     * @param {Function} handler Handler to be executed when event occurs
     * @returns {Event}
     */
    attach(handler) {
        if (typeof handler !== 'function') {
            throw new BadParamType('handler', 'Event.addHandler', 'function');
        } else {
            this._handlers.push(handler);
            return this;
        }
    }

    /**
     * Remove added handler from the event
     * @param {Function} handler Handler function
     * @returns {Event}
     */
    detach(handler) {
        if (typeof handler !== 'function') {
            throw new BadParamType('handler', 'Event.addHandler', 'function');
        } else {
            const foundIndex = _.findIndex(this.handlers, h => h === handler);
            if (foundIndex >= 0) {
                this._handlers.splice(foundIndex, 1);
            } else {
                console.warn(Translation.instance._('Detached hander is not found'));
            }
            return this;
        }
    }

    /**
     * Dispatch the event
     * @param {Object} data Additional data to be sent to handlers
     * @returns {Object}
     */
    dispatch(data = {}) {
        let newObj;
        this._dispatching = true;
        const param = clone(this);
        param.data = data;
        for (let i = 0; i < this._handlers.length && this._dispatching; ++i) {
            newObj = this._handlers[i](param);
            this._dispatching = param._dispatching;
            if (newObj instanceof Event && 'data' in newObj) {
                param.data = newObj.data;
            }
        }
        this._dispatching = false;
        return param.data;
    }

    /**
     * Stop dispatching the event. Used in handlers.
     */
    stopDispatching() {
        this._dispatching = false;
    }

    /**
     * Set event container where the event is registered
     * @param {EventContainer} eventContainer
     * @private
     */
    _registerContainer(eventContainer) {
        if (this._eventContainer === null) {
            this._eventContainer = eventContainer;
        }
    }

    /**
     * Return event name
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     * Return array of handlers
     * @returns {Function[]}
     */
    get handlers() {
        return this._handlers;
    }

    /**
     * Return connected event container
     * @returns {EventContainer}
     */
    get eventContainer() {
        return this._eventContainer;
    }
}

export default Event;
