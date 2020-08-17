import React, { Component } from 'react'
import { Upload, Modal, notification } from 'antd';
import PropTypes from 'prop-types'

export default class PicUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false, // 标识是否显示大图预览Modal
            previewImage: '', // 大图的url
            fileList: [
                /* {
                    uid: '-1', // 每个file都有自己唯一的id
                    name: 'xxx.png', // 图片文件名
                    status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                    // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVsl
                } */
            ],

        }
    }

    //获取img list
    get getImgList() {
        return this.state.fileList;
    }
    static propTypes = {
        imgs: PropTypes.array
    }

    handleCancel = ()=>{
        this.setState({
            previewImage: '',
            previewVisible: false,
          });
    }

    //文件上传事件监听
    //prama  file: { /* ... */ },
    //   fileList: [ /* ... */ ],
    //   event: { /* ... */ },
    handleChange = async ({ file, fileList }) => {
        console.log('执行附件上传');
        // console.log(file, fileList)
        const { status, response: result } = file;
        
        if (status === 'done') {
            console.log(result);
            console.log(fileList);
            if (result.status === 0) {
                notification.success({
                    message: '上传成功'
                })
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                notification.error({
                    message: '上传失败'
                })
            }
        } else if (status === 'removed') { 
            //执行删除api
        }
        this.setState({ fileList })
    }

    handlePreview = file => {
        console.log('handlePreview',file);

        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
          });

    }

    componentDidMount (){
        const {imgsList = []} = this.props;
        console.log(imgsList)
        if(!!imgsList) {
            this.setState({
                fileList:imgsList
            })
        }
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const {disabled} = this.props;
        const uploadButton = (
            <div>
                {/* <Icon type="plus" /> */}
                <div>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    disabled={disabled}
                    action="/manage/img/upload" /*上传图片的接口地址*/
                    accept='image/*'  /*只接收图片格式*/
                    name='image' /*请求参数名*/
                    listType="picture-card"  /*卡片样式*/
                    fileList={fileList}  /*所有已上传图片文件对象的数组*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
