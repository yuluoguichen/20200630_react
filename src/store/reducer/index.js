import {combineReducers} from 'redux';
import loginRedecer from './loginRedecer';
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'

export default combineReducers({
    loginRedecer:loginRedecer,
    categoryReducer:categoryReducer,
    productReducer,
})