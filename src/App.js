import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { notification } from 'antd';

import Admin from './pages/admin'
import Login from './pages/login'


import { Button } from 'antd'


notification.config({
  placement: 'bottomRight',

});
function App() {
  return (
      <BrowserRouter>
      {/* <Button type='primary'>aasda</Button> */}
      <Switch> {/*只匹配其中一个*/}
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
