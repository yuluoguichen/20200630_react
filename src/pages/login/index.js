import React, { Component } from 'react'
import logo from './images/logo.png'
import './login.less'
import {
    Form,
    Icon,
    Input,
    Button,
    message
} from 'antd'
import { FormInstance } from 'antd/lib/form';
import { UserOutlined } from '@ant-design/icons';

const { Item } = Form;
export default class Login extends Component {

    formRef = React.createRef();
    
    validatePwd(rule,value,callback){
        console.log('validatePwd()', rule, value)
        if(!value) {
            callback('密码必须输入')
          } else if (value.length<4) {
            callback('密码长度不能小于4位')
          } else if (value.length>12) {
            callback('密码长度不能大于12位')
          } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
          } else {
            callback() // 验证通过
          }
    }

    handleSubmit = (values) => {
        
        console.log(values,this.formRef)
    }

    handleFinish = (e)=>{
        console.log(e)
    }
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        console.log(Form)
        return (
            <div className='login'>
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form className='login-form' 
                    ref = {this.formRef}
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
                                {validator:this.validatePwd}
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
