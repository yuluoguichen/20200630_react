/*
 * @Author: 许峰博
 * @Date: 2020-07-06 23:05:22
 * @LastEditTime: 2020-07-20 22:16:57
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
    message,
    Breadcrumb, //面包屑
} from 'antd'

import {
    PlusOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux'



import { reqCategory, reqAddCategory ,reqUpdateCategory} from '../../api/category'
import AddForm from './AddForm'
import { QUERY_CATEGORY } from '../../store/actionContants'


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            table: {
                dataSource: [],
                current: 1,
                pageSize: 10,
                total: 0
            },
            showStatus: 0,
            parentId: '0',
            parentName: '一级分类列表',
            currentName: '',
            categoryTitleList: [
                {
                    parentId: '0',
                    parentName: '一级分类列表',
                }
            ],
        }
    }

    //onRef
    handleAddFormBindRef = (ref = {}) => {
        this.AddFormBindRef = ref;
    }

    //get 方法区
    //获取titlelist 面包屑展示
    get TitleBreadcrumb() {
        const { categoryTitleList } = this.state;
        // const Breadcrumb = ''
        /* const Breadcrumb = categoryTitleList.map(item => {
            return (<Breadcrumb.Item onClick={() => { this.SetParentMessage(item.parentId, item.parentName) }}>Application Center</Breadcrumb.Item>)
        }
        ) */

        return (<Breadcrumb >{categoryTitleList.map((item, index) => (<Breadcrumb.Item key={item.parentId} onClick={() => { this.SetParentMessage(item.parentId, item.parentName, index) }}>{item.parentName}</Breadcrumb.Item>))}</Breadcrumb >);

    }

    componentDidMount() {
        this.initDataSource();

    }

    //获取品类列表
    initDataSource = async () => {
        /*  this.setState({
             loading: true,
         })
         reqCategory({parentId:this.state.parentId}).then(res => {
             this.setState({
                 loading: false,
             })
             if (res.status === 0) {
                 this.setState((pre) => ({
                     table: { ...pre.table, dataSource: res.data }
                 }))
             }
         });
         console.log('获取品类列表initDataSource',) */

        const { dispatch } = this.props;
        try {
            await dispatch({
                type: QUERY_CATEGORY,
                payload: {
                    parentId: this.state.parentId
                }
            })
            console.log(this.props)
        } catch (error) {
            console.log(error)
        }


    }

    SetParentMessage = (parentId = '0', parentName = '一级分类列表', ListIndex = 0) => {
        const { categoryTitleList } = this.state;
        const length = categoryTitleList.length;
        for (let index = ListIndex + 1; index < length; index++) {
            categoryTitleList.pop();

        }

        this.setState((pre) => ({
            parentId,
            parentName,
        }), () => {
            this.initDataSource()
        })
    }

    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    hideMoal = () => {
        this.setState({
            showStatus: 0
        })
    }


    //查看子分类
    showSubCategorys = (val, record) => {
        const { categoryTitleList } = this.state;
        categoryTitleList.push({
            parentId: val,
            parentName: record.name,
        });
        this.setState((pre) => ({
            categoryTitleList,
            parentId: val,
        }), () => {
            this.initDataSource()
        })
    }

    //修改分类
    showUpdate = (val, record) => {
        console.log(record);
        this.setState({
            showStatus: 1,
            currentName: record.name,
            currentId: record._id,

        })
    }

    handleAddFormConfirm = () => {
        const { formRef: { current } } = this.AddFormBindRef;
        const { getFieldsValue } = current;
        console.log(getFieldsValue());
        reqUpdateCategory(getFieldsValue()).then(res => {
            if (res.status === 0) {
                message.info('保存成功')
                this.hideMoal();
            }
            this.initDataSource();
        })

    }


    updateTable = (
        current = this.state.table.current,
        pageSize = this.state.table.pageSize
    ) => {
        this.changeTable({ current, pageSize });
        const page = {
            current,
            pageSize,
        }
        this.initDataSource(page);
    }

    changeTable = (params) => {
        const { table, } = this.state;
        this.setState({ table: { ...table, ...params } });
    }

    render() {
        const { showStatus, loading, parentName, parentId } = this.state;
        console.log(this.props)
        const { categoryReducer: { categoryList } } = this.props;
        const columns = [

            {
                title: '分类的名称',
                dataIndex: 'name', // 显示数据对应的属性名
            },
            {
                title: '操作',
                width: 300,
                dataIndex: '_id',
                render: (val, record) => ( // 返回需要显示的界面标签
                    <span>
                        {/* <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton> */}
                        <Button type='text' onClick={() => this.showUpdate(val, record)} >修改分类</Button>
                        {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
                        <Button type='text' onClick={() => this.showSubCategorys(val, record)}>查看子分类</Button>


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
            loading,
            // dataSource: this.state.table.dataSource,
            dataSource: categoryList,
            pagination,
            rowKey: '_id'

        }

        const addBtn = (<Button icon={<PlusOutlined />} type='primary' onClick={this.showAdd}>添加</Button>);
        const cardProps = {
            title: this.TitleBreadcrumb,
            extra: addBtn
        }
        const AddFormModalProps = {
            title: '添加分类',
            visible: showStatus === 1,
            onCancel: this.hideMoal,
            onOk: this.handleAddFormConfirm,
            destroyOnClose: true,
        }
        const AddFormProps = {
            onRef: this.handleAddFormBindRef,
            parentId: this.state.parentId,
            parentName: this.state.parentName,
            currentName: this.state.currentName,
            currentId:this.state.currentId,
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

const mapStateToProps = ({ categoryReducer }) => ({
    categoryReducer
})

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)