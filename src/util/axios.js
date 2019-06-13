import axios from 'axios'
import { Message } from 'antd'
function fetch(url, type, data = {}, params = {}) {

    return axios({
        method: type,
        url: `${url}?v=${(new Date()).getTime()}`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-requested-with': 'XMLHttpRequest',
        },
        data:data,
        params: params
    })
        .then(response => response.data)
        .then(res => {
            if (!res) {
                return Promise.reject({ message: '对不起您没有权限' });
            }
            if (res.status === 1) {
                return res;
            } else {
                return Promise.reject({message:res.message});
            }
        })
        .catch(error => {
            Message.error(error.message)
            return Promise.reject(error);
        })
}
export { fetch }