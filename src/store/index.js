import {createStore,applyMiddleware,combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import MySaga from './saga';
import allReducers from './reducer/index'; //引入redecer模块

//注册saga中间件
const sagaMiddleWare = createSagaMiddleware();

//添加reducer
/* const allReducers = combineReducers({
    login:loginRedecer,
});
 */
const store = createStore(allReducers,applyMiddleware(sagaMiddleWare));

// 2.中间件运行saga
sagaMiddleWare.run(MySaga);

export default store;
