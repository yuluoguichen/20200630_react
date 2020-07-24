import storageUtils from "../../utils/storageUtils"
import {RECEIVE_USER} from '../actionContants'
const defaultState = {
    isLogin: false,
    loading: false,
    error: '',
    ...storageUtils.getUser()
}
export default (state = defaultState, action) => {
    const { type } = action;
    switch (type) {
        case 'requestLogin':
            return {
                ...state,
                isLogin: false,
                loading: true,
                error: ''
            }
        case 'loginSuccess':
            return {
                ...state,
                isLogin: true,
                loading: false,
                error: ''
            }
        case 'loginFailure':
            return {
                ...state,
                isLogin: false,
                loading: false,
                error: action.message,
            }
        case RECEIVE_USER:
            return {
                ...state,
                ...action.user,
            }
        default:
            return state;

    }
}