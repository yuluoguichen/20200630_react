import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Admin from './pages/admin'
import Login from './pages/login'


import { Button } from 'antd'

function App() {
  return (
    <BrowserRouter>
      <Button type='primary'>aasda</Button>
      <Switch> {/*只匹配其中一个*/}
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
