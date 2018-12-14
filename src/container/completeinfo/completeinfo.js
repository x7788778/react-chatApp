//boss信息页
import React,{Component} from 'react'
import {NavBar, InputItem, TextareaItem, Button, Radio, DatePicker, List} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)
class CompleteInfo extends Component {
  constructor(props){
    super(props)
    this.state={
      gender:'male',
      title:'',
      company:'',
      school:'',
      email:'',
      desc: '',
      birthday:'',
    }
  }

  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    const RadioItem = Radio.RadioItem
    return(
        <div>
          {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> : null}
          <NavBar mode="dark">信息完善页面</NavBar>
          <AvatarSelector 
            selectAvatar={(imgname)=>{
              this.setState({
                avatar:imgname
              })
            }}
          ></AvatarSelector>
          <RadioItem 
          checked={this.state.gender==='male'}
          onChange={()=>this.onChange('gender', 'male')}
          >男</RadioItem>
          <RadioItem
          checked={this.state.gender==='female'}
          onChange={()=>this.onChange('gender', 'female')}
          >女</RadioItem>
          <InputItem onChange={(v)=>this.onChange('company', v)}>公司</InputItem>
          <InputItem onChange={(v)=>this.onChange('school', v)}>学校</InputItem>
          <InputItem onChange={(v)=>this.onChange('email', v)}>邮箱</InputItem>
          <DatePicker
          mode="date"
          title="选择日期"
          extra="选项"
          value={this.state.birthday}
          onChange={(v)=>this.onChange('birthday',v )}
        >
          <List.Item arrow="horizontal">生日</List.Item>
        </DatePicker>
          <TextareaItem 
            onChange={(v)=>this.onChange('desc', v)}
            rows={3}
            autoHeight
            title='个人说明'
            placeholder='介绍一下自己吧~'
            ></TextareaItem>
            <Button 
              type="primary"
              onClick={()=>{
                this.props.update(this.state)
              }
              }
              >保存</Button>
        </div>
      )
  }
}



export default CompleteInfo