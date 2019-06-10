import axios from 'axios'
import io from 'socket.io-client'
// import { Socket } from 'dgram';
const socket = io('ws://localhost:9093')//如果不跨域不需要传参 ws即websocket
// const socket = io()//如果不跨域不需要传参 ws即websocket

//action,获取聊天列表
const MSG_LIST = "MSG_LIST"
//读取信息
const MSG_RECV = "MSG_RECV"
//标识已读
const MSG_READ ="MSG_READ"

const initState = {
  chatmsg:[],//聊天信息
  users:{},
  unread:0,//未读信息数量
}

export function chat (state=initState, action) {
  switch(action.type){
    case MSG_LIST:
      return {
        ...state, 
        chatmsg: action.payload.msgs, 
        users:action.payload.users,
        unread: action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length
      }
    case MSG_RECV:
      const n = action.payload.to==action.userid?1:0
      return {
        ...state,
        chatmsg:[...state.chatmsg, action.payload],
        unread:state.unread + n
      }
    case MSG_READ:
      return {
        ...state,
        chatmsg:state.chatmsg.map(v=>({...v,read:true})),
        unread: state.unread - action.payload.num
      }
    default:
      return state

  }
}
//action
function msgList(msgs, users, userid){
  return {type:'MSG_LIST', payload:{msgs,users,userid}}
}

function msgRecv(msg,userid){
	return {userid, type:MSG_RECV, payload:msg}
}
function msgRead({from, userid, num}){
  return {type:MSG_READ, payload:{from, userid, num}}
}
//async优化之后
export function readMsg(from){
  return async(dispatch, getState)=>{
    const res = await axios.post('/user/readmsg',{from})
    const userid = getState().user._id
    if(res.status === 200 && res.data.code===0){
      dispatch(msgRead({from, userid, num:res.data.num}))
    }
  }
}
//async之前
// export function readMsg(from){
//   return (dispatch, getState)=>{
//     axios.post('/user/readmsg',{from})
//       .then(res=>{
//         const userid = getState().user._id
//         if(res.status === 200 && res.data.code===0){
//           dispatch(msgRead({from, userid, num:res.data.num}))
//         }
//       })
//   }
// }
//接收信息
export function recvMsg(){
  return (dispatch,getState)=>{
    socket.on('recvmsg',function(data){
      const userid = getState().user._id
      dispatch(msgRecv(data,userid))
    })    
  }
}
//操作，获取聊天列表
export function getMsgList() {
  return (dispatch,getState)=>{
    axios.get('/user/getmsgList')
      .then(res=>{
        if(res.status===200 && res.data.code===0){
          const userid = getState().user._id  //当前用户id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}

// 发送信息
export function sendMsg({from, to, msg}){
  return dispatch=>{
    socket.emit('sendmsg',{from, to, msg})
    
  }

}