import React, { Component } from 'react'
import logo from './images/logo.png'
import './login.less'
import {
    Form,
    Icon,
    Input,
    Button,
    notification
} from 'antd'
// import { FormInstance } from 'antd/lib/form';
import { UserOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api/index'
import { Redirect } from 'react-router-dom';

import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'

import { connect } from 'react-redux'

const { Item } = Form;

export class Login extends Component {

    formRef = React.createRef();

    validatePwd(rule, value, callback) {
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码长度不能小于4位')
        } else if (value.length > 12) {
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
        } else {
            callback() // 验证通过
        }
    }

    handleSubmit = (values) => {

        console.log(values, this.formRef)
    }

    handleFinish = async (e) => {
        const {dispatch} = this.props;
        //校验成功之后调用的函数，此处可以去调用ajax;
        try {
            // const res = await reqLogin(e);
            dispatch({
                type:'login',
                payload:{
                    ...e
                }
            })
            /* if (res.status === 1) {
                notification.info(
                    {
                        message: res.msg

                    }
                )
            } else {
                // 登录成功 记录登录状态 并且进行跳转
                // this.props.history.push('/admin')
                const user = res.data
                memoryUtils.user = user // 保存在内存中
                storageUtils.saveUser(user) // 保存到local中
                this.props.history.replace('/')
            } */
        } catch (e) {
            //封装错误信息  统一处理错误信息
            console.log('请求出错', e)
        }

    }
    render() {
        const {loginRedecer} = this.props;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const user = this.props.user
        if (loginRedecer && loginRedecer._id) {
            return <Redirect to='/' />
        }
        return (
            <div className='login'>
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form className='login-form'
                        ref={this.formRef}
                        onFinish={this.handleFinish}
                    >
                        <Item
                            label='用户名'
                            name='username'
                            {...layout}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            initialValue='admin'
                        >
                            <Input

                                prefix={<UserOutlined />}
                                placeholder="用户名"
                            >

                            </Input>
                        </Item>
                        <Item
                            label='密码'
                            name='password'
                            {...layout}
                            rules={[
                                { validator: this.validatePwd }
                            ]}
                        >
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />
                        </Item>
                        <Item>
                            <Button className='login-form-button' onClick={this.handleSubmit} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({loginRedecer}) => ({
    loginRedecer
})

const mapDispatchToProps = (dispatch) => {
   return{
       dispatch
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
