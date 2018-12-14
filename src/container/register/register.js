//注册页面

import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { regisger } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import chatFrom from '../../component/chat-from/chat-from'



@connect( //为啥要react-redux引入，直接引入register不行么，再想想react-redux
  state=>state.user,
  {regisger}
)
@chatFrom
class Register extends Component {
  constructor(props) {
    super(props)
    this.handdleRegister = this.handdleRegister.bind(this) 
    //在constructor里bind（this）的好处就是每次渲染如果状态不变的话不会走一边这个代码。而在render里面会每次走一边。稍微节省性能一点
  }
  
  componentDidMount(){
    this.props.handdleChange('type','genius')
  }

  handdleRegister() {
    console.log(this.state)
    this.props.regisger(this.props.state)
  }
  
  render() {
    console.log(this.props.redirectTo,'注册成功跳转')
    
    return (
      <div style={{backgroundColor:'#FFF'}}>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}  {/**注册成功跳转 */}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem
            onChange={val=>this.props.handdleChange('user',val)}
          >用户名</InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={val=>this.props.handdleChange('passWord',val)}
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
            type='password'
            onChange={val=>this.props.handdleChange('repeatPassWord',val)}
          >确认密码</InputItem>
          <WhiteSpace />
          <WhiteSpace />
          <Button 
          type='primary'
          onClick={this.handdleRegister}
          >注册</Button>
        </List>
      </div>
    )
  }
}

export default Register