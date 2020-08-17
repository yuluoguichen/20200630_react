// 封装一层promise 进行saga异步提交

/**
 * @description: 
 * @param {
 *  dispatch:触发saga
 *  submitAction:action对应参数
 *  payload:请求参数
 * 
 * } 
 * @return {type} 
 */
export function PromiseSaga(dispatch, submitAction, payload) {
    return new Promise((resolve, reject) => {
        dispatch(getAction(submitAction, { ...payload, resolve, reject }))
    })
}

export function getAction(submitAction,payload) {
    return {
        type: submitAction,
        payload: {
            ...payload
        }
    }
}