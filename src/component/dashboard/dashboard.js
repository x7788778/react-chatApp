//现在认为所有登陆成功后的页面都由dashboard来管理
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Redirect, Route} from 'react-router-dom'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import UserPage from '../../component/userpage/userpage'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'



@connect(
  state=>state,
  {getMsgList, recvMsg}
)
class DashBoard extends Component {//dashboard本身就是路由组件
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){//没有数据获取msg列表
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render(){
    const pathname = this.props.location.pathname //当前页面路径
    const navList =[
      {
        path:'/contacts',
        text:'通讯录',
        icon:'boss',
        title:'通讯录',
        component:UserPage,
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg,
      },
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User,
      }
    ]
    //让动画生效，只渲染一个router，根据当前path决定
    const page = navList.find(v=>v.path === pathname)
    return page?(
      <div>
        <NavBar className='fixd-header' mode='dard'>{page.title}</NavBar>
          <div style={{marginTop:45}}>
            
              <QueueAnim type="scaleX" duration={800}>
                <Route key={page.path} path={page.path} component={page.component}></Route>
              </QueueAnim>              
              
          </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    ):<Redirect to='./msg'></Redirect>
  }
}
export default DashBoard