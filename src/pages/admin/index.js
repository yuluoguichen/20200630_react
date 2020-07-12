import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import Headers from '../../components/header';
import NavLeft from '../../components/nav-left';
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found'
import Order from '../order'

const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    constructor(props){
        super(props);
    }

    render() {
        // console.log(this.props)
        if (!memoryUtils.user || !memoryUtils.user._id) {
            return (<Redirect to='/login'></Redirect>)
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <NavLeft />
                </Sider>
                <Layout>
                    <Headers />
                    <Content style={{margin: 20, backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/user' component={User} />
                            <Route path='/role' component={Role} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/order" component={Order} />
                            <Redirect to='/home'></Redirect>
                        </Switch>

                    </Content>
                    <Footer>Footer</Footer>
                </Layout>

            </Layout>
        )
    }
}
