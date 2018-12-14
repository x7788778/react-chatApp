import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import chatFrom from '../../component/chat-from/chat-from'


@connect(//state啥玩意
  state=>state.user,
  { login }
)
@chatFrom
class Login extends Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handdleLogin = this.handdleLogin.bind(this)
  }

  register() {
    //路由组件，可以跟路由直接绑定。
    console.log(this.props) //路由组件包含histoy，location，match参数，打印出来方便查询操作相关数据
    this.props.history.push('/register')
  }

  handdleLogin(){
    this.props.login(this.props.state) //这个login是redux里的,后来从高阶组件里传进来
  }
  render() {
    return (
      <div style={{backgroundColor:'#FFF'}}>
        {(this.props.redirectTo&&this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              onChange={val=>this.props.handdleChange('user',val)}
            >用户</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={val=>this.props.handdleChange('passWord',val)}
            >密码</InputItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button onClick={this.handdleLogin} type='primary'>登陆</Button>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
      </div>
    )
  }
}
//一个logo，两个输入框

export default Login 