import React, { Component } from 'react'
import { Upload } from 'antd'
export default class UploadBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList:[]
        }
    }

    componentDidMount(){

    }

    
    uploadData = () =>{
        const {
            attachmentUUID = 1,
            bucketName = 2,
        } = this.props;
        let data = {
            attachmentUUID,
            bucketName
        };
        /* data = new FormData();
        data.append('attachmentUUID',3);
        data.append('bucketName',5)
        console.log(data); */
        return data;
    }

    render() {
        const {
            accept = 'image/*',
            listType = 'picture-card',
            ...rest 
        } = this.props;
        const {
            fileList
        } = this.state;
        const data = this.uploadData();
        console.log(data);
        return (
            <React.Fragment>
                <Upload
                    name='image'
                    accept={accept}
                    listType = {listType}
                    fileList = {fileList}
                    action="/manage/img/upload"
                    data={this.uploadData}
                    {...rest}
                >

                    添加
                </Upload>
                11
            </React.Fragment>
        )
    }
}
