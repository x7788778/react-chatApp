import React from 'react'
import { connect } from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'



@connect(
  state=>state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    const alert = Modal.alert
    alert('退出', '确认退出登陆吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid')  //清除id
        // window.location.href =  window.location.href //刷新页面因为没有cookie会退出页面，但是没有考虑redux
        this.props.logoutSubmit()
      } },
    ])
  }

  render () {
    console.log(this.props)
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief

    return props.user ? (
      <div className='user'>
        <Result 
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:70}} alt=''/>}
          title={this.props.user}
          message={props.email}
        />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {props.gender === 'male'? '🚹' : '🚺'}
            {props.school?<Brief>学校:{props.school}</Brief>:null}
            {props.company?<Brief>公司:{props.company}</Brief>:null}
            {this.props.desc.split('\n').map(v=>(
              <Brief key={v}>{v}</Brief>
            ))}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo} />
  }//有用户数据，渲染页面，没有用户数据定向到/login
}

export default User 