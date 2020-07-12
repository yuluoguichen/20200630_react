import axios from 'axios';
import { message } from 'antd'
import jsonp from 'jsonp'

export const ajax = (url, data = {}, type) => {
    return new Promise((resolve, reject) => {
        let promise;
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
            // return axios.get(url,{params:data});
        } else {
            promise = axios.post(url, data)
        }
        promise.then(res => {
            console.log(res);
            resolve(res.data);
        }).catch(e => {
            console.log(e)
            // reject(e)
            message.error('请求出错了', e)
        })
    })

}

export const Jsonp = ({url,params})=>{
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(err,data)=>{
            console.log('jsonp()', err, data)
            if(err){
                message.error('天气请求出错了', err)
            }else{
                resolve(data);
            }
        })
    })
}