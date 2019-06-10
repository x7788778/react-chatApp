import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'  //
import  thunk from 'redux-thunk' //redux中间件，解决redux异步获取状态。
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom' //都引出去了
import App from './app'
import reducers from './reducer'
import './config'
import './index.css'
// import VConsole from 'vconsole' //import vconsole

// let vconsole = new VConsole()



const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))

const renderMonth = module.hot ? ReactDOM.render : ReactDOM.hydrate
renderMonth(
  (<Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>
  ), 
  document.getElementById('root'));
  
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
