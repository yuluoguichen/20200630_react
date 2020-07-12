/*
 * @Author: 许峰博
 * @Date: 2020-07-11 15:17:27
 * @LastEditTime: 2020-07-12 13:50:56
 * @LastEditors: 许峰博
 * @Description: 添加品类
 * @FilePath: \20200630_react\src\pages\category\AddForm.js
 * @可以输入预定的版权声明、个性签名、空行等
 */ 
import React, { Component } from 'react'
import {
    Form,
    Select,
    Input
  } from 'antd'

export default class AddForm extends Component {
    constructor(props){
        super(props);
        console.log(props)
        props.onRef(this);
    }
    render() {
        return (
            <div>
                AddForm
            </div>
        )
    }
}

