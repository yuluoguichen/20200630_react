import { QUERY_CATEGORY } from '../actionContants';


const defaultState = {
    categoryList: [],
}

export default (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'QUERY_CATEGORY':
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}
