import React, { Component } from 'react'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
class Test extends Component {
  render() {
    return(
      <WingBlank>
        <Button>default</Button><WhiteSpace />
        <Button disabled>default disabled</Button><WhiteSpace />
    
        <Button type="primary">primary</Button><WhiteSpace />
        <Button type="primary" disabled>primary disabled</Button><WhiteSpace />
      </ WingBlank>
    )
  }
}


export default Test