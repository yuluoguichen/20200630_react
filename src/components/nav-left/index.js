import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.less';
import logo from '../../assets/images/logo.png';

import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class NavLeft extends Component {
    render() {
        return (
            <div className='nav-left'>
                <Link to='/home'  className='nav-left-top'>
                    <img src={logo} alt="logo"/>
                    <h2>后台管理系统</h2>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to='/home'>商品管理</Link> 
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                        Option 3
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="图表">
                        <Menu.Item key="5"><Link to='/charts/line'>折线图</Link> </Menu.Item>
                        <Menu.Item key="6"><Link to='/charts/pie'>饼状图</Link></Menu.Item>
                        <Menu.Item key="7"><Link to='/charts/bar'>柱状图</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
