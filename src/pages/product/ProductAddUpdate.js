/*
 * @Author: 许峰博
 * @Date: 2020-07-24 16:06:43
 * @LastEditTime: 2020-08-17 15:44:41
 * @LastEditors: 许峰博
 * @Description: 
 * @FilePath: \20200630_react\src\pages\product\ProductAddUpdate.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { Input, Card, Form, InputNumber, Cascader, notification } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { DEFAULT_LAYOUT, DEFAULT_ITEM_LAYOUT } from '../../config/formConfig'
import { Button } from '../../../node_modules/antd/lib/index';
// import UploadBtn from '../../components/upload'
import PicUpload from './picUpload'
import { reqCategory } from '../../api/category'
import { reqAddProducts, reqUpdateProducts } from '../../api/product'
import { connect } from 'react-redux'
import { TITLE,CREATE,UPDATE,VIEW } from './contants'
import RichTextEditor from './rich-text-editor'

const querystring = require('querystring');
const { Item } = Form;
class ProductAddUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            title: '商品详情',
            operation:UPDATE,
        }
        this.uploadRef = React.createRef();
        this.formRef = React.createRef();
        this.editorRef = React.createRef();

    }

    componentDidMount() {
        //获取品类
        this.getCategorys('0');

        //设置名称
        // console.log(TITLE)
        const { match: { params } } = this.props;
        const pageTitle = TITLE[params.operation];
        this.setState({
            title: pageTitle,
            operation:params.operation
        })
    }

    //获取品类
    getCategorys = async (parentId) => {
        const result = await reqCategory({ parentId });
        if (result.status === 0) {
            const categorys = result.data;
            if (parentId === '0') {
                this.initOptions(categorys)
            } else { // 二级列表
                return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }

    //父级品类
    initOptions = async (categorys) => {
        const options = categorys.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: false, // 不是叶子
        }))
        this.setState({
            options
        })
    }

    handleLoadData = async (selectedOptions) => {
        const { value } = selectedOptions[selectedOptions.length - 1]; // 获取父级Id
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const subCategorys = await this.getCategorys(value)
        targetOption.loading = false
        if (!!subCategorys && subCategorys.length > 0) {
            const childOpt = subCategorys.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: false
            }))
            targetOption.children = childOpt;

        } else {
            targetOption.isLeaf = true;
        }

        //更新options
        this.setState({
            options: [...this.state.options]
        })

    }

    //保存提交
    handleSubmit = async () => {
        const { match: { params } } = this.props;

        /*
            1.获取上传图片list
            2.获取富文本编辑框内容
            3.获取form表单数据
        */
        //    1.获取图片集合
        const { getImgList } = this.uploadRef.current;
        //    2.获取form表单数据
        const { getFieldsValue } = this.formRef.current;

        const formData = getFieldsValue();
        const { categoryIds, ...rest } = formData;

        //处理商品类别
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
            pCategoryId = '0'
            categoryId = categoryIds[0]
        } else {
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
        }

        // 3.获取商品详情描述
        const detail = this.editorRef.current.getDetail;
        
        // this.submitValidate();
        const { _err, message } = await this.submitValidate();
        if (_err) {
            notification.error({
                message
            })
            return;
        }

        //调用保存接口
        const product = { ...rest, pCategoryId, categoryId, imgs: getImgList,detail }

        const result = params.operation === 'update' ? await reqUpdateProducts({
            product
        }) : await reqAddProducts({
            product
        });

        if (result.status === 0) {
            notification.success({
                message: '保存成功'
            })
        } else {
            notification.error({
                message: '保存失败'
            })
        }

    }

    submitValidate = async () => {
        let _err = false;
        let message = '';
        const { validateFields } = this.formRef.current;
        await validateFields().then(values => {
        }).catch(e => {
            _err = true;
            message = '校验不通过';
        })

        return { _err, message };


    }

    formPriceValidate = (rule, value, callback) => {
        if (value > 0) {
            callback();
        } else {
            callback('价格必须大于0')
        }
    }

    render() {

        const { location: { search, product }, match: { params } } = this.props;
        const {operation} = this.state;
        const detail = {}
        // let detailList = {};
        const {productReducer:{detailList={}}} = this.props;
        console.log(this.props);
        /* if (params.operation !== CREATE) {
            detailList = product || {};
        } */
        const imgsList = [];
        const title = (<span>
            <LinkButton onClick={() => this.props.history.goBack()}><LeftOutlined />返回</LinkButton>
        <span>{this.state.title}</span>
        </span>)
        const cardPropd = {
            title,
        }

        const layout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        };
        const tailLayout = DEFAULT_ITEM_LAYOUT;

        const UploadBtnProps = {
            attachmentUUID: 'id',
            bucketName: 'productBN'
        }
        console.log(detailList);
        const disableConfig = operation === VIEW ? true : false;
        return (

            <div>
                <Card {...cardPropd}>
                    <Form {...layout} ref={this.formRef}>
                        <Item name='_id' initialValue={detailList._id} style={{ display: 'none' }}></Item>
                        <Item label='商品名称'
                            {...tailLayout}
                            initialValue={detailList.name}
                            name='name'
                            
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品名称'
                                }

                            ]}
                        >
                            <Input disabled={disableConfig}></Input>
                        </Item>
                        <Item label='商品描述'
                            name='desc'
                            {...tailLayout}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品描述'
                                }

                            ]}
                            initialValue={detailList.desc}
                        >
                            <Input disabled={disableConfig}></Input>
                        </Item>
                        <Item label='商品价格'
                            name='price'
                            {...tailLayout}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品价格'
                                },
                                {
                                    validator: this.formPriceValidate
                                }

                            ]}
                            initialValue={detailList.price}
                        >
                            <InputNumber disabled={disableConfig}></InputNumber>
                        </Item>
                        <Item label='商品分类'
                            name='categoryIds'
                            {...tailLayout}
                            initialValue={[detailList.categoryId]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品描述'
                                }
                            ]}
                        >
                            <Cascader
                                disabled={disableConfig}
                                options={this.state.options}
                                defaultValue={[detailList.categoryId]}
                                loadData={this.handleLoadData}
                            ></Cascader>
                        </Item>
                        <Item label='商品图片'
                        >
                            <PicUpload ref={this.uploadRef} imgsList={detailList.imgs} disabled={disableConfig}></PicUpload>
                        </Item>
                        <Item label='商品详情'  labelCol={{span: 2}} wrapperCol={{span: 20}}>
                            {disableConfig ? <div dangerouslySetInnerHTML = {{ __html: detailList.detail }} /> : <RichTextEditor ref={this.editorRef} detail={detailList.detail}></RichTextEditor>}
                            
                        </Item>
                        <Item>
                            <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                        </Item>
                    </Form>
                </Card>

            </div>
        )
    }
}


const mapStateToProps = ({ productReducer }) => ({
    productReducer
})

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddUpdate)


