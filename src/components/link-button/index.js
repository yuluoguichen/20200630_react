import React, { Component } from 'react'
import { Button } from '../../../node_modules/antd/lib/index'
import './index.less';
/* export default class LinkButton extends Component {
    render() {
        return (
            <React.Fragment>
                <Button {...props} className='link-button' ></Button>
            </React.Fragment>
        )
    }
}
 */
export default function LinkButton(props){
    return <Button {...props} className="link-button"></Button>
}