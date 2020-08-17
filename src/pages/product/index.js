import React, { Component } from 'react'
import { Card } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'
import ProductHome from './ProductHome'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact></Route>
                <Route path='/product/addupdate/:operation' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}
