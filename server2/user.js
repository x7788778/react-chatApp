//跟用户相关的express接口全部在这里，保持入口文件的精简
const express = require('express')
const utils = require('utility') //密码加密算法  md5
const Router = express.Router() 

const model = require('./model')//只获取到user数据
const User = model.getModel('user') //获取user数据模型
const Chat = model.getModel('chat') //获取chat数据模型

const _filter = {'passWord':0, '__v':0} //findOne第二个参数，隐藏密码字段显示

// Chat.remove({},function(err,doc){

// })

//使用路由对象进行挂载
Router.get('/info', function(req, res){
  //校验cookie
    //res是一个对象里面方法超多，有少数作者可以用
  const {userid} = req.cookies  //拿到用户的cookie

  if(!userid) { //没有就返回状态1
    return res.json({code:1})
  }
  User.findOne({_id:userid}, _filter ,function(err, doc){//第一个参数干嘛的
    if (err) {
      return res.json({code:1,msg:'后端出错了'})
    }
    if (doc) {
      return res.json({code:0, data:doc})
    }
  })
})

//用户调试列表
Router.get('/list', function(req, res){
  // User.remove({},function(e,d){})    //清除用户数据
  User.find({}, function(err, doc){//查询用户列表
    return res.json({code:0,data:doc})
  // User.find({type}, function(err, doc){//查询用户列表
  //   return res.json({code:0,data:doc})
  })
  
})
// Router.get('/list', function(req, res){
//   const { type } = req.query //注意点：post请求用body获取，get请求用query获取
//   // User.remove({},function(e,d){})    //清除用户数据
//   User.find({}, function(err, doc){//查询用户列表
//     return res.json({code:0,data:doc})
//   // User.find({type}, function(err, doc){//查询用户列表
//   //   return res.json({code:0,data:doc})
//   })
  
// })
//我创建了新分支

Router.get('/getmsgList',function(req,res){
  const user = req.cookies.userid
  User.find({},function(e, userdoc){//用户名信息和头像信息
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){//聊天信息
      if(!err){
        return res.json({code:0,msgs:doc, users:users})
      }
    })
  })
})


Router.post('/readmsg',function(req,res){
  const userid = req.cookies.userid//登陆id
  const {from} = req.body
  Chat.update(
    {from,to:userid},//更新数据
    {'$set':{read:true}},//修改
    {'multi':true},//全部
    function(err,doc){
    // console.log(doc)//doc是update修改情况展示
    if(!err){
      return res.json({code:0,num:doc.nModified})
    }
    return res.json({code:1,msg:'修改失败'})
  })//因为操作的是未读消息，from是对方的，to是自己。
})

//更新的接口
Router.post('/update',function(req,res){//在打开updata的同时可能另一个窗口也打开了info，所有这里也要校验cookie
  const {userid} = req.cookies
  if(!userid) {
    return res.json({code:1})//???json.dumps是啥
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err,doc){//接口别写错
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type,  
    },body)//因为node里没有es6，所有需要es5的方法合并一下
    return res.json({code:0, data})
  })//查找并且更新

})

function md5pwd (passWord) { //两层md5加盐
  let salt="dksadkhsk$%^$&HH*&YIHHUO(U(~~>><"
  return utils.md5(utils.md5(passWord+salt))
}

Router.post('/login',function(req,res){ //这是express后端直接请求/login
  const {user, passWord} = req.body  //获取用户信息
  User.findOne({user,passWord:md5pwd(passWord)}, _filter ,function(err,doc){  //两个参数，第一个是查询的数据，第二个是请求后执行的操作
    if (!doc) {
      return res.json({code:1,msg:'用户名密码必须输入'})
    }
    res.cookie('userid', doc._id)//保存登陆状态，
    return res.json({code:0,data:doc})
  })
})

//安装body-parser插件来专门接收post参数
Router.post('/register', function(req, res){

  const {user, passWord, type} = req.body
  User.findOne({user},function(err, doc){
    if (doc) {
      return res.json({code:1, msg:'用户名重复'})
    }
    const userModel = new User({user,type,passWord:md5pwd(passWord),})//新建一个模型
    userModel.save(function(e,d){//存进去
      if(e) {
        return res.json({code:1,msh:'后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)  //返回cookie，这样注册之后也会跳到bossifo
      // console.log(d, '注册信息')
      return res.json({code:0, data:{user, type, _id}})
    })
    // User.create({user,type,passWord:md5pwd(passWord),}, function(err,doc){ //入库的时候进行md5加密密码,create拿不了id
    //   if(err){
    //     return res.json({code:1, msg:'后端出错了'})
    //   }
    //   return res.json({code:0})
    // })
  })
})

module.exports = Router



//User.find(),User.create(),User.findOne

// 该Object.assign()方法用于将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
// Object.assign（target，... sources）