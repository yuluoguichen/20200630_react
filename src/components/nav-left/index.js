import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less';
import logo from '../../assets/images/logo.png';
import MenuList from '../../config/menuConfig'

import { Menu } from 'antd';
import Icon from '@ant-design/icons';


const { SubMenu } = Menu;

class NavLeft extends Component {
    constructor(props) {
        super(props);
        this.openKey=null;
    }

    getMenuNodes_map = (MenuList) => {
        const { location: { pathname } } = this.props;
        return MenuList.map(item => {
            const Dicon = item.icon;
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon component={Dicon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {

                const cItem = item.children.find(cItem=> cItem.key === pathname)
               
                if(cItem){
                    this.openKey = item.key;
                }
                return (
                    <SubMenu
                        key={item.key}
                        icon={<Icon component={Dicon} />}
                        // <Icon component={MailOutlined} />
                        title={
                            <span>
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    componentDidMount() {
    }

    //第一次render之前调用
    componentWillMount(){
        this.menuNode = this.getMenuNodes_map(MenuList);
    }
    render() {
        const { location: { pathname } } = this.props;
        return (
            <div className='nav-left'>
                <Link to='/home' className='nav-left-top'>
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </Link>
                <Menu
                    selectedKeys={pathname}
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={[this.openKey]}
                >
                    {/* {this.getMenuNodes_map(MenuList)} */}
                    {this.menuNode}
                </Menu>
            </div>
        )
    }
}
// 使用withRouter  将路由信息传入组件
export default withRouter(NavLeft);
