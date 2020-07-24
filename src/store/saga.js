import {call, put , takeEvery} from 'redux-saga/effects';
import * as actionContants from './actionContants'
import login from './sagas/loginsaga'
import categorySaga from './sagas/categorySaga'

//生成器函数

export default function *MySaga(){
    yield takeEvery(actionContants.LOGIN,login.login);
    yield takeEvery(actionContants.QUERY_CATEGORY,categorySaga.reqCategoryList);
}