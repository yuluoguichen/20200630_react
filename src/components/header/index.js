import React, { Component } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { reqWeather } from '../../api/index'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import storageUtils from '../../utils/storageUtils'

import './index.less';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: moment(Date.now()).format('YYYY-MM-DD HH:MM:ss'),
            dayPictureUrl: null,
            weather: null,
            // title:null,

        };
        this.title = null;
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:MM:ss');
            this.setState({ currentTime })
        }, 500);
    }

    getWeather = async () => {
        const weatherData = await reqWeather('齐齐哈尔');
        const { dayPictureUrl, weather } = weatherData.results[0].weather_data[0];
        this.setState(
            {
                dayPictureUrl,
                weather
            }
        )
    }

    //获取当前路由title
   /*  getTitle = () => {
        const {location:{pathname}} = this.props;
        const title = null;
        menuList.forEach(item=>{
            if(item.key === pathname){
                title = item.title
            }else if (item.children){
                item.children.forEach(cItem=>{
                    getTitle()
                })
            }
        })

    } */
    getTitle = (menuList) => {
        const {location:{pathname}} = this.props;
        menuList.forEach(item=>{
            if(item.key === pathname){
                this.title = item.title;
            }else if (item.children){
                this.getTitle(item.children)
            }
        })

    }

    handleLogout = () => {
        storageUtils.removeUser();
    }

    componentDidMount() {
       
        // 获取当前的时间
        // this.getTime()
        // 获取当前天气
        this.getWeather()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
        
    }
    render() {
        //获取标题
        this.getTitle(menuList)
        const { currentTime, dayPictureUrl, weather } = this.state;
        return (
            <div className='header'>
                {/* Header */}
                <div className="header-top">
                    <span>欢迎</span>
                    <Button className='logo-out-btn' onClick={this.handleLogout}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {this.title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="dayPictureUrl" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Header);