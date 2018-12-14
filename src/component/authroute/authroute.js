//这个authroute组件就是单纯的检测路由是否ok

import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom' 
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter  //不是路由组件，可以使用withRouter装饰器包裹
@connect(
  null,
  { loadData }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login','/register']
    // console.log(this.props)
    const pathName = this.props.location.pathname//获取当前页面路径
    if(publicList.indexOf(pathName) > -1) {//如果当前页面是'/login'或'/register'，不执行操作，返回null
      return null
    }
    axios.get('user/info')//获取用户信息，通过配置的proxy发送到9093端口请求后端数据
      .then(res=>{
        if(res.status === 200) {
          if (res.data.code === 0) {//有登录信息
            this.props.loadData(res.data.data)//这些相应对象最后需要整明白
          } else {//没有登录信息,通过history.push跳转到登录页面（路由组件都有路由方法可以操作）
            this.props.history.push('/login')
          }
          // console.log(res.data)
        }
        
      })
    // 跳转逻辑
    // 1是否登陆。
    // 2现在的url地址，login不需要跳转。

    // 3用户的type是boss还是牛人。
    // 4用户是否完善信息（选择头像，个人简介）。 
  }
  render() {
    return null
  }
}

export default AuthRoute