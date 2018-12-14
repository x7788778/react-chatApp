import React from 'react'
import {Card, WhiteSpace} from 'antd-mobile'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
// import { width } from 'window-size';

@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: propTypes.array.isRequired
  }
 
  handlerClick(v){
    this.props.history.push(`/chat/${v._id}`)//
  }
  render () {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <div>
        {this.props.userlist.map(v=>(
          v.avatar?(
            <Card 
              key={v._id} 
              onClick={()=>this.handlerClick(v)}//进入聊天页面
              >
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  thumbStyle={{width:50}}
                  extra={<span>{v.title}</span>}
                ></Header>
                <Body>
                  {v.type==='boss' ? <div>公司:{v.company}</div>:null}
                  {v.desc.split('\n').map(d=>(
                    <div key={d}>{d}</div>
                  ))}
                  {v.type==='boss' ? <div>薪资:{v.money}</div>:null}
                </Body>
              </Card>
              ):null
        ))}
        <WhiteSpace></WhiteSpace>
      </div>
    )
  }
}

export default UserCard