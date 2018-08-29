/**
 * It creates standarized actions for Redux
 */
class ActionCreator {
    static createAction(type, payload = {}) {
        return {
            type,
            payload,
            error: false
        }
    }

    static createErrorAction(type, payload = {}) {
        return {
            ...ActionCreator.createAction(type, payload),
            error: true
        }
    }

    static isError(action) {
        return action.error === true;
    }
}

export default ActionCreator;