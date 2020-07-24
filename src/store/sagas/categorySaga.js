
import {reqCategory,reqAddCategory,reqUpdateCategory} from '../../api/category'
import {call, put } from 'redux-saga/effects';
import {QUERY_CATEGORY} from '../actionContants';

function* reqCategoryList(action){
    const result = yield call(reqCategory,action.payload);
    try {
        if(result.status === 0){
            yield put({type:'QUERY_CATEGORY',payload:{categoryList:result.data}})
        }
    } catch (error) {
        console.log(result);
    }
    
}

export default {
    reqCategoryList
}

