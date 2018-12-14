//渲染已经发起用户聊天的url里的参数，把他拿出来
import React from 'react'
// import io from 'socket.io-client'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';
import QueueAnim from 'rc-queue-anim'
// const socket = io('ws://loncalhost:9093')//如果不跨域不需要传参 ws即websocket



@connect(
  state=>state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text:'',
      msg:[],
      showEmoji:''
    }
  }
  
    componentDidMount(){
      if(!this.props.chat.chatmsg.length){
        this.props.getMsgList()
        this.props.recvMsg()
      }
    }
    componentWillUnmount(){//退出页面的时候
      const to = this.props.match.params.user  //match，history。location这些都是
      this.props.readMsg(to)//已读消息
    }
    fixCarousel(){
      setTimeout(function(){//修复emoji的bug，手动派发resize事件
        window.dispatchEvent(new Event('resize'))
      },0)
    }
    // socket.on('recivemsg',(data)=>{
    //   console.log(data,'后端发过来的')
    //   this.setState({
    //     msg:[...this.state.msg, data.text]
    //   })
    // })

  handlerSubmit(){
    // socket.emit('sendmsg',{text:this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    console.log(from, '111')
    this.props.sendMsg({from,to,msg})
    this.setState({
      text:'',
      showEmoji:false,
    })//发送完成后清空state
  }

  render(){
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
    const userid = this.props.match.params.user //当前url里匹配的user
    const Item = List.Item
    const users = this.props.chat.users
    if(!users[userid]){
      return null
    }
    const chatid = getChatId(userid,this.props.user._id)//聊天id，
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)//usercard与当前聊天id是否匹配

    return(
      <div id='chat-page'>
        <NavBar 
          mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={()=>{
            this.props.history.goBack()//history对象的一个方法，返回上一个页面
          }}
        >
          {users[userid].name}
        </NavBar>
          <QueueAnim delay={50}>
            {chatmsgs.map((v, index)=>{
              const avatar = require(`../img/${users[v.from].avatar}.png`)
              return (v.from === userid)? (
                <List key={v._id + index}>
                  <Item
                    thumb={avatar}
                  >{v.content}</Item>
                </List>//对方
              ):(
                <List key={v._id + index}>
                  <Item 
                    className='chat-me'
                    extra={<img src={avatar}/>}
                  >{v.content}</Item>
                </List>//自己
              )
            })}
          </QueueAnim>

        <div className='stick-footer'>
          <List>
            <InputItem
                placeholder = '请输入'
                value = {this.state.text}
                onChange={(v)=>{
                  this.setState({text:v})
                }}
                extra={
                  <div>
                    <span
                      onClick={()=>{
                        this.setState({
                          showEmoji:!this.state.showEmoji
                        })
                        this.fixCarousel()
                      }}
                    >😊 </span>
                    <span onClick={()=>this.handlerSubmit()}>发送</span>
                  </div>
                }//可以放文本也可以放jsx
            >
            信息
            </InputItem>
          </List>
          {this.state.showEmoji?<Grid 
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el=>{
                this.setState({
                  text:this.state.text + el.text
                })
              }}
          />:null}
          
          {/* <h2>chat with user:{this.props.match.params.user}</h2> */}
        </div>

      </div>
    )
  }
}

export default Chat