/**
 * Created by kakachan on 16/12/11.
 */
const config = require('../config');

const API_PATH = config.cgi_config.host;

function _param(obj = {}) {
    let _ = encodeURIComponent
    return Object.keys(obj).map(k => `${_(k)}=${_(obj[k])}`).join('&')
}

function _networkDone(res) {
    if (!res['err_code']) {
        return res
    } else {
        return Promise.reject(res)
    }
}
function _networkFail(...args) {
    return Promise.reject(null)
}
function _fetch(url, data, method) {
    return fetch(url, {
        body: JSON.stringify(data),
        method,
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' //记得加上这行，不然bodyParser.json() 会识别不了
        },
    })
}

export function ajax({url, query, data, method = 'GET'}) {
    url = API_PATH + url + '?' + _param(query)

    let promise = _fetch(url, data, method)
    let success = _networkDone.bind(this)
    let failure = _networkFail.bind(this)

    return promise.then(resp => resp.ok ? resp.json().then(success) : failure(resp))
}
