//web框架
import express from 'express'
import userRouter from './user'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'//只获取到user数据
import path from 'path'//变成绝对路径
import csshook from 'css-modules-require-hook/preset' // 钩子, https://github.com/css-modules/css-modules-require-hook
import assethook from 'asset-require-hook' //识别扩展的钩子
assethook({
  extensions:['png']
})

import React from 'react'
import { renderToString, renderToStaticNodeStream } from 'react-dom/server'//react组件 => html （解析jsx）
import { createStore, applyMiddleware, compose } from 'redux'
import  thunk from 'redux-thunk'
import {StaticRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from '../src/reducer'
import App from '../src/app'
import staticPath from '../build/asset-manifest.json'

//work with express. 
const app = express()
const Chat = model.getModel('chat') //获取chat数据模型
const server = require('http').Server(app) //进一步使用这个http的server模块
const io = require('socket.io')(server)//关联express和socket.io
// const io = require('socket.io')  如果不合并express，只要这条

io.on('connection',function(socket){//穿进来的socket是当前的连接，socket.io是全局的连接,看下面如何监听↓
  socket.on('sendmsg',function(data){
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')//双方id拼成chatid
    Chat.create({chatid, from, to, content:msg}, function(err,doc){
      io.emit('recvmsg', Object.assign({},doc._doc)) //接受信息广播
    })
    // console.log(data,'server')
    // io.emit('recivemsg',data)
  })//参数data：服务器端emit过来的数据
})

const port = 9093

app.use(cookieParser()) //让它可以解析cookie
app.use(bodyParser.json()) //让它可以解析post过来的json
app.use('/user', userRouter) //开启一个中间件

// 上线：购买域名，
app.use(function(req, res, next){
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){//设置白名单
    return next()
  } 
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)//将thunk中间件传进creatStore里面
    ))
    res.write(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <link rel="manifest" href="manifest.json">
            <link rel="shortcut icon" href="favicon.ico">
            <title>React App</title>
            <link rel="stylesheet" href="/${staticPath['main.css']}">
          </head>
          <body>
            <noscript>
              You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">
    `)

  let context = {}
  const markupStream = renderToStaticNodeStream((<Provider store={store}>
    <StaticRouter
      location={req.url}
      context={context}//跳转方面
    >
      <App></App>
    </StaticRouter>
  </Provider>
  ))
  markupStream.pipe(res,{end:false})
  markupStream.on('end',()=>{
    res.write(`
          </div>
          <script src="${staticPath['main.js']}"></script>
          </body>
      </html>
    `)
    res.end()
  })
})

app.use('/', express.static(path.resolve('build')))//   /开头都设置为静态资源地址，通过中间件设置白名单，



server.listen(port, function(){
  console.log(`Node app is listening on port ${port}`)
})

//因为post请求参数再request.body中，所以需要一个插件来让express支持解析post请求，那就是body-parser