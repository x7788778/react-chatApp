//消息列表

import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'


@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const userinfo = this.props.chat.users
    const userid = this.props.user._id
    const Item = List.Item
    const Brief = Item.Brief
    // 按照聊天用户分组，根据chatid
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || [] //按照chatid分组
      msgGroup[v.chatid].push(v)
    })
    
    const chatList = Object.values(msgGroup).sort((a,b)=>{//未读消息页面排序
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })

    //eslint代码校验工具
    //react16特有的错误处理机制
    //react性能优化
    // ---------
    return(
        <div>
          <List>
            {chatList.map(v=>{
              const lastItem = this.getLast(v)
              const targetId = v[0].from === userid? v[0].to:v[0].from
              const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
              if(!userinfo[targetId]){
                return null
              }
              // const name = userinfo[targetId]?userinfo[targetId].name:''
              // const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
              
              return (
                <List 
                  key={lastItem._id}
                >
                  <Item 
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                    arrow='horizontal'//箭头
                    onClick={()=>{
                      this.props.history.push(`/chat/${targetId}`)
                    }}
                  >
                    {lastItem.content}
                    <Brief>{userinfo[targetId].name}</Brief>
                  </Item>
                </List>
              )
            })}
          </List>
        </div>
      )
  }
}

export default Msg

