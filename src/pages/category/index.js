/*
 * @Author: 许峰博
 * @Date: 2020-07-06 23:05:22
 * @LastEditTime: 2020-07-12 13:51:28
 * @LastEditors: 许峰博
 * @Description: 
 * @FilePath: \20200630_react\src\pages\category\index.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import React, { Component } from 'react'
import {
    Table,
    Button,
    Card,
    Modal,
    message
} from 'antd'

import {
    PlusOutlined,
} from '@ant-design/icons';

import { reqCategory, reqAddCategory } from '../../api/category'
import AddForm from './AddForm'

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lodaing: false,
            table: {
                dataSource: [],
                current: 1,
                pageSize: 10,
                total: 0

            },
            showStatus: 0,
        }
    }

    componentDidMount() {
        reqCategory();
    }

    AddFormBindRef = (ref = {}) => {
        this.AddFormBindRef = ref;
    }

    showAdd = () => {
        console.log('showAdd')
        this.setState({
            showStatus: 1
        })
    }

    hideMoal = () => {
        this.setState({
            showStatus: 0
        })
    }

    handleAddFormConfirm = () => {
        
    }


    updateTable = (
        current = this.state.table.current,
        pageSize = this.state.table.pageSize
    ) => {
        this.changeTable({ current, pageSize });
    }

    changeTable = (params) => {
        const { table } = this.state;
        this.setState({ table: { ...table, ...params } });
    }

    render() {
        const { showStatus } = this.state;
        const columns = [

            {
                title: '分类的名称',
                dataIndex: 'name', // 显示数据对应的属性名
            },
            {
                title: '操作',
                width: 300,
                render: (category) => ( // 返回需要显示的界面标签
                    <span>
                        {/* <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton> */}
                        {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
                        {/* {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null} */}

                    </span>
                )
            }
        ];

        const pagination = {
            current: this.state.table.current,
            pageSize: this.state.table.pageSize,
            total: this.state.table.total,
            showSizeChanger: true,
            showTotal: (total) => {
                return `共 ${total} 条`;
            },
            onChange: (page, pageSize) => {
                this.updateTable(page, pageSize);
            },
            onShowSizeChange: (current, pageSize) => {
                this.updateTable(current, pageSize);
            },
        }

        const TableProps = {
            columns,
            bordered: true,
            dataSource: this.state.table.dataSource,
            pagination,

        }

        const addBtn = (<Button icon={<PlusOutlined />} type='primary' onClick={this.showAdd}>添加</Button>);
        const cardProps = {
            title: '一级分类列表',
            extra: addBtn
        }

        const AddFormModalProps = {
            title: '添加分类',
            visible: showStatus === 1,
            onCancel: this.hideMoal,
            onOk: this.handleAddFormConfirm
        }
        const AddFormProps = {
            onRef : this.AddFormBindRef
        }
        return (
            <Card {...cardProps}>
                <Table {...TableProps}></Table>
                <Modal {...AddFormModalProps} >
                    <AddForm {...AddFormProps}></AddForm>
                </Modal>
            </Card>

        )
    }
}
