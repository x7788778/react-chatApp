import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'  //
import  thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom' //都引出去了
import App from './app'
import reducers from './reducer'
import './config'
import './index.css'
// import VConsole from 'vconsole' //import vconsole

// let vconsole = new VConsole()



const store = createStore(reducers, compose(
  applyMiddleware(thunk),//将thunk中间件传进creatStore里面
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))


ReactDOM.hydrate(
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
