import React, { Component } from 'react';
import { Form } from "antd";
import { connect } from "react-redux";

import './login.scss';
import Logo from './images/logo.png'

export default class Login extends Component {
    render() {
        return (
            <div className='login'>
                <header className="login-header">
                    <img src={Logo} alt="logo"/>
                    <h1>React: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登陆</h2>
                
                </section>
            </div>
        )
    }
}

