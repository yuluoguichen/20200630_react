import { SET_PRODUCT, SET_PRODUCT_DETAIL,SET_PRODUCT_ONLINE } from '../actionContants'

const defaultState = {
    list: [],
    detailList:{}
};


export default (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_PRODUCT:
            return {
                ...state,
                ...payload,
            }
        case SET_PRODUCT_DETAIL: {
            console.log(SET_PRODUCT_DETAIL,payload)
            const newState = Object.assign({},{
                ...state,
                detailList:JSON.parse(JSON.stringify(payload)),
            })
            return newState
        }
        case SET_PRODUCT_ONLINE: {
            console.log('5.开始执行上下架reducer')
            return {
                ...state,
                ...payload,
            }
        }
        default:
            return state;

    }

}