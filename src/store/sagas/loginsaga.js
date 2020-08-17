import { reqLogin } from '@/api/index.js';
import { call, put } from 'redux-saga/effects';
import storageUtils from '../../utils/storageUtils';
import { RECEIVE_USER } from '../actionContants'

function* login(action) {
    console.log('执行登录saga')
    try {
        const result = yield call(reqLogin, action.payload);
        console.log(result);
        if(result.status === 0){
            const user = result.data;
            storageUtils.saveUser(user)
            yield put ({type:RECEIVE_USER,user:user});
        }
    } catch (e) {
        yield put ({type:'loginFailure',message:e});
    }
    /*  try {
         // yield put ({type:'requestLogin'});
         const result = yield call(reqLogin,action.payload);
         if(result.status === 0){
             const user = result.data
             // 保存local中
             storageUtils.saveUser(user)
             // yield put ({type:'loginSuccess',result});
             yield put ({type:RECEIVE_USER,user});
         }else{
             yield put ({type:'loginFailure',message:result.msg});
         }
         
     }catch(e){
         yield put ({type:'loginFailure',message:e});
     } */
}


export default {
    login
}