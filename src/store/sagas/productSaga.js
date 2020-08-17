import { reqGetProducts,reqUpdateProductOnline } from '../../api/product';
import { call, put } from 'redux-saga/effects';
import { SET_PRODUCT, SET_PRODUCT_DETAIL, SET_PRODUCT_ONLINE } from '../actionContants'  //reducer
import { QUERY_PRODUCT, QUERY_PRODUCT_DETAIL, UPDATE_PRODUCT_ONLINE } from '../actionContants' //saga
import { resolveOnChange } from 'antd/lib/input/Input';
//获取商品品类
function* GetProducts(action) {
    // console.log('product运行saga')
    const result = yield call(reqGetProducts, action.payload);
    if (result.status === 0) {
        yield put({
            type: SET_PRODUCT,
            payload: result.data
        })
    }
}


//获取商品品类详情

function* getProductDetail(action) {
    console.log(action);
    // console.log('执行商品品类详情查询');
    const{resolve,reject,...rest} = action.payload;
    const result = yield call(reqGetProducts, {...rest});
    // console.log('详情明细',result)
    if (result.status === 0) {
        yield put({
            type: SET_PRODUCT_DETAIL,
            payload: result.data,
        })
        resolve(result);
        // return result;
    }else{
        reject();
    }
}

//上下架商品
function* updateProductOnline(action) {
    console.log(action)
    const{resolve,reject} = action.payload
    //api
    console.log('2.开始执行上下架saga')
    const result = yield call(reqUpdateProductOnline, action.payload);
    console.log('3.结束执行上api')
    if (result) {
        if (result.status === 0) {
            console.log('4.开始执行上下架redux')
            yield put({
                type: SET_PRODUCT_ONLINE,
                payload: result.data
            })
            resolve(result);
            console.log('6.结束执行上下架reducer')
        }else{
            reject();
        }
    }
    console.log('7.结束执行上下架saga')
    return result;
}

export default [
    { action: QUERY_PRODUCT, fun: GetProducts },
    { action: QUERY_PRODUCT_DETAIL, fun: getProductDetail },
    { action: UPDATE_PRODUCT_ONLINE, fun: updateProductOnline }
]