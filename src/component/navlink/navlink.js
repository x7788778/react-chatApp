//导航列表


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(
  state=>state.chat
)
@withRouter//获取跟路由相关的信息
class NavLinkBar extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render () {
    // const navList = this.props.data.filter(v=>!v.hide)//保留已经隐藏的属性
    const navList = this.props.data//保留已经隐藏的属性
    const {pathname} = this.props.location
    return (
      <div>
        <TabBar>
          {navList.map(v=>(
            <TabBar.Item
              badge={v.path === '/msg'? this.props.unread:null}
              key={v.path}//保证每个key是唯一的就可以了
              title={v.text}
              icon={{uri: require(`./img/${v.icon}.png`)}}//图标
              selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}//点击切换选中图标
              selected={pathname===v.path}//
              onPress={()=>{
                this.props.history.push(v.path)//跳转
              }}
            >

            </TabBar.Item>
          ))}
        </TabBar>
      </div>
    ) 
  }
}

export default NavLinkBar