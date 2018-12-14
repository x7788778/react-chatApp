
import React from 'react'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'

import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import CompleteInfo from './container/completeinfo/completeinfo';

import {Route, Switch } from 'react-router-dom'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      hasError:false
    }
  }
  componentDidCatch(err,info){
    console.log(err,info)
    this.setState({
      hasError:true
    })
  }

  render(){
    return this.state.hasError 
    ?
    <h2>页面出错了</h2>
    :(
      <div>
        <AuthRoute></AuthRoute>  {/**检验路由是否ok--axios检验 */}
        <Switch> {/**命中第一个匹配到的路由，否则没有path的都会命中 */}
          <Route path='/completeinfo' component={CompleteInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          {/* ↓ 登陆完成后有boss genius me msg四个页面 */}
          <Route component={DashBoard}></Route>
        </Switch>
      </div>

    )
  }
}

export default App