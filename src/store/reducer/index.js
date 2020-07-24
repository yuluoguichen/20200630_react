import {combineReducers} from 'redux';
import loginRedecer from './loginRedecer';
import categoryReducer from './categoryReducer'

export default combineReducers({
    loginRedecer:loginRedecer,
    categoryReducer:categoryReducer
})