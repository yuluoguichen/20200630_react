export const LOGIN = 'login';
export const RECEIVE_USER = 'login_receive_user';

//品类模块
export const QUERY_CATEGORY = 'query_category';


//商品类型
//saga action
export const QUERY_PRODUCT = 'query_product';
export const QUERY_PRODUCT_DETAIL = 'query_product_detail';
export const UPDATE_PRODUCT_ONLINE = 'update_product_online';
export const UPDATE_PRODUCT_ONLINE_FUN = (payload) => {
    console.log(payload);
    return {
        type:UPDATE_PRODUCT_ONLINE,
        payload:{
            ...payload
        }
    } 
}

//reducer
export const SET_PRODUCT = 'set_product';
export const SET_PRODUCT_DETAIL = 'set_product_detail';
export const SET_PRODUCT_ONLINE = 'set_product_online'