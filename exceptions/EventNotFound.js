import Translation from '../translate/Translation';

/**
 * @module tbrtc-server/exceptions
 */

class EventNotFound extends Error
{
    constructor(ename) {
        super(Translation.instance._('Event {ename} is not found in an event\'s container', {
            ename,
        }));
        this.name = 'EventNotFound';
    }
}

export default EventNotFound;
