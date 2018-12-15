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
            const baseUrl = process.env.BACKEND_SERVER_URL;
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
            if(payload !== null && ['POST', 'PUT'].indexOf(method.toUpperCase()) >= 0) {
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
                    return response.text();
                }
            ).then(text => {
                    if(text !== '') {
                        try {
                            return JSON.parse(text);
                        } catch(e) {console.log('exception', e);
                            throw new Error(Translation.instance._('Response from server can not be correctly interpreted'));
                        }
                    }
                    return text;
                }
            ).then(json => {
                if(typeof allActions.success === 'function') {
                    if(typeof json === 'string') {
                        json = {};
                    }
                    dispatch(allActions.success(
                        {...json, _responseData: responseObj, _requestPayload: payload}
                    ));
                }
            }).catch(error => {
                if(typeof allActions.error === 'function') {
                    const newError = error;
                    newError._requestPayload = payload;
                    dispatch(allActions.error(newError));
                }
            });
        }
    }

    static get(resource, succesCode = 200, payload = null, actions = null, token = null) {
        return Requester.request(resource, 'GET', succesCode, payload, actions, token);
    }

    static post(resource, successCode = 200, payload = null, actions = null, token = null) {
        return Requester.request(resource, 'POST', successCode, payload, actions, token);
    }

    static put(resource, successCode = 200, payload = null, actions = null, token = null) {
        return Requester.request(resource, 'PUT', successCode, payload, actions, token);
    }

    static delete(resource, successCode = 200, payload = null, actions = null, token = null) {
        return Requester.request(resource, 'DELETE', successCode, payload, actions, token);
    }
}


export default Requester;
