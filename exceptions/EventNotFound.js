import Translation from '../translate/Translation';

/**
 * An exception thrown when event with specified name has not been found in a container
 *
 * @module tbrtc-common/exceptions
 */
class EventNotFound extends Error
{
    /**
     * Initializing of the exception
     *
     * @param {string} ename Event name
     */
    constructor(ename) {
        super(Translation.instance._('Event {ename} is not found in an event\'s container', {
            ename,
        }));
        this.name = 'EventNotFound';
    }
}

export default EventNotFound;
