import React ,{Component} from 'react'
import { connect } from 'react-redux'
import { getUserListAll } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state=>state,
  { getUserListAll }
)
class UserPage extends Component {
  componentDidMount(){
    this.props.getUserListAll()
  }

  render(){
    const userlist = this.props.chatuser.userlist.filter(v=>v.user !== this.props.user.user) //除自己
    return (
      <UserCard userlist={userlist}></UserCard>
    )
  }
}

export default UserPage