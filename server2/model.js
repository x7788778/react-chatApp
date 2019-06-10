
//mongodb相关的代码(操作数据库)

const mongoose = require('mongoose')
//链接mongo 并使用imooc这个集合
const DB_URL = "mongodb://localhost:27017/imooc-chat" //端口后面字段可直接建立后端文档
mongoose.connect(DB_URL,{useMongoClient: true}) //链接上mongodb

//定义用户文档模型的模型
const models = {
  user:{//用户信息，自己建的模型要记住
    'user':{'type':String, "require":true},
    'passWord': {'type':String,"require":true,},
    'type': {'type':String,"require":true,},
    //对象跟容易扩展配置，如果只有String一条的话可以直接加
    'avatar': {'type':String},
    //个人简介或职位简介
    'personalProfile': {'type':String},
    //职位名称
    'title': {'type':String},
    //如果是boss还有下面字段
    'company': {'type':String},
    'desc': {'type':String},
    'school':{'type':String},
    'gender':{'type':String},
    'email':{'type':String},

  },
  //聊天信息
  chat:{//用户发送数据的时候走一下数据库
    'chatid':{'type':String,"require":true},//每一个聊天都有一个id，最后拼成完整聊天信息
    'from':{'type':String,"require":true},//谁发过来的信息
    'to':{'type':String,"require":true},//发给谁
    'read':{'type':Boolean,"default":false},//已读未读，只对to有效
    'content':{'type':String,"require":true,"default":''},//发的内容是什么
    'create_time':{'type':Number,"default":new Date().getTime()},//什么时候发的
  },
}
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))//注册文档user和文档chat为Schema类型的文档
}
// mongoose.model(Object.keys(models), new mongoose.Schema(models[Object.keys(models)]))

module.exports = { //使用的时候传key返回数据库对应的值
  getModel:function(name) {
    return mongoose.model(name)
  }
}
//module模块， model模型，不要搞混


// 数据库使用
// 1、链接mongdb数据库 
// 2、建立数据模型