/*
 * @Author: 许峰博
 * @Date: 2020-07-24 16:06:29
 * @LastEditTime: 2020-08-17 15:42:37
 * @LastEditors: 许峰博
 * @Description: 商品品类
 * @FilePath: \20200630_react\src\pages\product\ProductHome.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import React, { Component } from 'react'
import { Card, Table, Button } from '../../../node_modules/antd/lib/index'
import LinkButton from '../../components/link-button'
import { connect } from 'react-redux'
import {QUERY_PRODUCT,QUERY_PRODUCT_DETAIL,UPDATE_PRODUCT_ONLINE,UPDATE_PRODUCT_ONLINE_FUN} from '../../store/actionContants'
import {PromiseSaga} from '../../utils/sagaUtils'
import { resolve } from 'path'
import { rejects } from 'assert'
const querystring = require('querystring');


class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      table: {
        dataSource: [],
        pageSize: 10,
        current: 1,
        total: 0,
      }
    }
  }


  //生命周期
  async componentDidMount(){
    await this.initDataSource();
  }
  //数据初始化
  initDataSource = async (payload = {}) => {
    const {dispatch} = this.props;
    await dispatch({
      type:QUERY_PRODUCT,
      payload:{
        ...payload
      }
    })
    const {productReducer} = this.props;
  }


  updateTable = (
    current = this.state.table.current,
    pageSize = this.state.table.pageSize,) => {
    this.changeTable({ current, pageSize });
    const page = {
      current,
      pageSize,
    };
    this.initDataSource({ page });

  }

  changeTable = (params) => {
    const { table } = this.state;
    this.setState({ table: { ...table, ...params } });
  }

  //添加商品
  handleAddProduct = ()=>{
    const {history} = this.props;
    const pathname = '/product/addupdate/create';
    history.push({
      pathname,
    });
  }

  //查看 / 修改 详情 
  handleUpdateProduct = async (product,operation)=>{
    const {dispatch} = this.props;
    // 处理数据，放入url中
    // 如果数据量过大  会报错
    /* const data = querystring.stringify(
      {product:encodeURIComponent(JSON.stringify(product)),}
    );

    const pathname = '/product/addupdate/'+operation;

    this.props.history.push({
      pathname,
      product
      // search:data
    })
 */
const pathname = '/product/addupdate/'+operation;
    PromiseSaga(dispatch,QUERY_PRODUCT_DETAIL,{_id:product._id}).then(res=>{
      console.log(res)
      this.props.history.push(pathname)
    })
    // () => this.props.history.push('/product/addupdate', product)
    /* console.log('执行dispatch开始')
    await dispatch({
      type:QUERY_PRODUCT_DETAIL,
      payload:{
        _id:product._id
      }
    })
    console.log('执行dispatch结束')
    this.props.history.push('/product/addupdate', {isUpdate:true}) */


  }
  updateStatusPromise = (payload)=>{
    const {dispatch} = this.props;
      return new Promise((resolve,reject)=>{
        dispatch(UPDATE_PRODUCT_ONLINE_FUN({...payload,resolve,reject}))
      })
    // }
  }
  updateStatus = async (_id,newStatus)=>{
    
    const {dispatch} = this.props;
    PromiseSaga(dispatch,UPDATE_PRODUCT_ONLINE,{productId:_id,status:newStatus}).then(res=>{
      // console.log(res);
      console.log('8.结束执行上下架')
      this.updateTable()
    }).catch(err=>{
      console.log(err);
    })
    /* this.updateStatusPromise({productId:_id,status:newStatus}).then(res=>{
      console.log(res);
      this.updateTable()
    }).catch(err=>{
      console.log(err);
    })
     */
    /* const {dispatch} = this.props;
    console.log('1.开始执行上下架')
    await dispatch({
      type:UPDATE_PRODUCT_ONLINE,
      payload:{
        productId:_id,
        status:newStatus
      }
    })
    console.log('8.结束执行上下架')
    this.updateTable() */

  }

  test = ()=>{
  }
  render() {
    const {productReducer : {list:productList},productReducer} = this.props;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 200,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
          const { status, _id } = product
          const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <LinkButton
                type='primary'
                onClick={() => this.updateStatus(_id, newStatus)}
              >
                {status === 1 ? '下架' : '上架'}
              </LinkButton>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 200,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick={() => this.handleUpdateProduct(product,'view')}>详情</LinkButton>
              <LinkButton onClick={()=> this.handleUpdateProduct(product,'update')}>修改</LinkButton>
            </span>
          )
        }
      },
    ];
    const pagination = {
      current: this.state.table.current,
      total: this.state.table.total,
      showQuickJumper: true, //快速跳转某页
      onChange: (page, pageSize) => {
        this.updateTable(page, pageSize);
      }
    }
    const tableProps = {
      columns,
      bordered: true,
      rowKey: '_id',
      pagination,
      dataSource:productList || [],
    }

    const extra = (
      <Button type='primary' onClick={this.handleAddProduct}>添加商品</Button>
    );
    const cardProps = {
      title: this.state.title,
      extra,
    }
    return (
      <Card {...cardProps}>
        
        <Table {...tableProps}></Table>
      </Card>
    )
  }
}

const mapStateToProps = ({productReducer}) => ({
  productReducer
})

const mapDispatchToProps = (dispatch) => {
 return{
     dispatch
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductHome)


