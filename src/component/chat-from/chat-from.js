import React from 'react'


export default function chatFrom(Comp) {
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state={}
      this.handdleChange=this.handdleChange.bind(this)
    }
    handdleChange(key, val) {
      console.log(key,val)
      this.setState({
        [key]:val
      })
    }
    render(){
      console.log(this.props,'chat-from')
      return (
        <Comp handdleChange={this.handdleChange} state={this.state} {...this.props}></Comp>
      )
    }
  }
}