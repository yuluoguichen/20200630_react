import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import {EditorState,  //富文本state 
    convertToRaw,  //编译富文本内容 
    ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html' //将内容装换为 html格式
import htmlToDraft from 'html-to-draftjs'  // 将html内容转换为draft格式
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
    constructor(props){
        super(props);
        const {detail:html} = props;
        let editorState ={};
        if(html){
            //将html格式文档反编译为编辑对象
            const contentBlock = htmlToDraft(html);  //
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState)
        }else{
            editorState = EditorState.createEmpty()
        }
        this.state = {
            editorState,
        }
    }

    get getDetail(){
        //返回输入数据对应的html格式文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    //固定格式   输入过程中实现的回调  存储内容
    onEditorStateChange =(editorState)=>{
        this.setState({
            editorState
        })
    }

    render() {
        const {editorState} = this.state;
        return (
            <div>
                {/* <button onClick={this.text}></button> */}
                <Editor
                    editorState={editorState}
                    wrapperStyle={{border:'1px solid black',minHeight: 200,}}   //富文本编辑器样式 添加边框以及最小高度
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )
    }
}
