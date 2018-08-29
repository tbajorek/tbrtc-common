import fetch from 'cross-fetch';
import _ from 'underscore';
import urlJoin from 'url-join';
import Translation from "../translate/Translation";

class Requester {
    static request(resource, method, successCode = 200, payload = null, actions = null, token = null) {
        const inputActions = actions !== null ? actions : {};
        const allActions = _.defaults(inputActions, {
            request: null,
            success: null,
            error: null
        });
        return dispatch => {
            const baseUrl = __BACKEND_SERVER_URL__;
            if(typeof allActions.request === 'function') {
                dispatch(allActions.request(payload));
            }
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            };
            if (token !== null) {
                headers['Authorization'] = 'Bearer ' + token;
            }
            const params = {
                method,
                headers
            };
            if(payload !== null) {
                params.body = JSON.stringify(payload)
            }
            let responseObj = {};
            return fetch(
                urlJoin(baseUrl, resource), params
            ).then(
                response => {
                    let success = false;
                    if(Array.isArray(successCode)) {
                        success = successCode.indexOf(response.status) >= 0;
                    } else if(typeof successCode === 'number') {
                        success = successCode === response.status;
                    }
                    if(!success) {
                        throw new Error(Translation.instance._('Bad status code received from server: {scode} ({stext})', {
                            scode: response.status,
                            stext: response.statusText
                        }));
                    }
                    responseObj = response;
                    try {
                        return response.json();

                    } catch(e) {
                        throw new Error(Translation.instance._('Response from server can not be correctly interpreted'));
                    }
                }
            ).then(json => {
                if(typeof allActions.success === 'function') {
                    dispatch(allActions.success(
                        {...json, _responseData: responseObj, _requestPayload: payload}
                    ));
                }
            }).catch(error => {
                if(typeof allActions.error === 'function') {
                    dispatch(allActions.error(error));
                }
            });
        }
    }

    static get(resource, succesCode = 200, actions = null, token = null) {
        return Requester.request(resource, 'GET', succesCode, null, actions, token);
    }

    static post(resource, successCode = 200, payload = null, actions = null, token = null) {
        return Requester.request(resource, 'POST', successCode, payload, actions, token);
    }

    static put(resource, successCode = 200, payload = null, actions = null, token = null) {
        return Requester.request(resource, 'PUT', successCode, payload, actions, token);
    }

    static delete(resource, successCode = 200, actions = null, token = null) {
        return Requester.request(resource, 'DELETE', successCode, null, actions, token);
    }
}


export default Requester;