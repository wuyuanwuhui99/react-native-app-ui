import store from '../store';
import {getToken} from '../store/actions';
import StorageUtil from "../utils/StorageUtil";

export default class HttpUtil {

    /**
     * 利用 Promise 的 get 方式请求
     * @param url
     * @returns {Promise}
     */
    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":store.getState().token
                }
            })
                .then(response => response.json())
                .then((result) => {
                    if (result.token) {
                        store.dispatch(getToken(result.token));
                        StorageUtil.set("token",result.token)
                    }
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    /**
     * 利用 Promise 的 post 方式请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    static post(url, params) {
        console.log(store.getState().token)
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":store.getState().token
                },
                body: JSON.stringify(params),
            })
                .then(response => response.json())
                .then((result) => {
                    if (result.token) {
                        store.dispatch(getToken(result.token));
                        StorageUtil.set("token",result.token)
                    }
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    /**
     * 利用 Promise 的 put 方式请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    static put(url, params) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":store.getState().token
                },
                body: JSON.stringify(params),
            })
                .then(response => response.json())
                .then((result) => {
                    if (result.token) {
                        store.dispatch(getToken(result.token));
                        StorageUtil.set("token",result.token)
                    }
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    /**
     * 利用 Promise 的 put 方式请求
     * @param url
     * @param params
     * @returns {Promise}
     */
    static delete(url, params) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":store.getState().token
                },
                body: JSON.stringify(params),
            })
                .then(response => response.json())
                .then((result) => {
                    if (result.token) {
                        store.dispatch(getToken(result.token));
                        StorageUtil.set("token",result.token)
                    }
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }
}
