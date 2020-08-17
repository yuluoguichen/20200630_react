/*
 * @Author: 许峰博
 * @Date: 2020-07-11 15:17:27
 * @LastEditTime: 2020-08-07 15:00:48
 * @LastEditors: 许峰博
 * @Description: 添加品类
 * @FilePath: \20200630_react\src\pages\category\AddForm.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import React, { Component } from 'react'
import { DEFAULT_LAYOUT,DEFAULT_ITEM_LAYOUT } from '@/config/formConfig'
import {
    Form,
    Select,
    Input
} from 'antd'
const { Item } = Form;
export default class AddForm extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        props.onRef(this);
        this.formRef = React.createRef();
    }
    render() {
        const {parentId,parentName,currentId,currentName,status} = this.props;
        console.log(this.props);
        console.log(status === 1,status)
        return (
            <div>
                <Form {...DEFAULT_LAYOUT} ref={this.formRef}>
                    <Item label={status === 1 ? "parentId" : 'categoryId'} name={status === 1 ? "parentId" : 'categoryId'}  initialValue={status === 1 ? parentId : currentId} > 
                        <Input></Input>
                    </Item>
                    <Item label='categoryName' name="categoryName" initialValue={currentName}>
                        <Input placeholder='请输入分类名称' />
                    </Item>
                </Form>
            </div>
        )
    }
}

