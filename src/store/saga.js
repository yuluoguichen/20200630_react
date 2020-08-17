import {call, put , takeEvery} from 'redux-saga/effects';
import * as actionContants from './actionContants'
import login from './sagas/loginsaga'
import categorySaga from './sagas/categorySaga'
import productSaga from './sagas/productSaga'

//生成器函数

export default function *MySaga(){
    yield takeEvery(actionContants.LOGIN,login.login);
    yield takeEvery(actionContants.QUERY_CATEGORY,categorySaga.reqCategoryList);
    console.log(productSaga)
    for(let i = 0;i< productSaga.length;i++){
        yield takeEvery(productSaga[i].action,productSaga[i].fun)
        // yield (i)=>  takeEvery(productSaga[i].action,productSaga[i].fun)
    }
}