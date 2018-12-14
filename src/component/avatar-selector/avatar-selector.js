import React,{Component} from 'react'
import { Grid, List } from 'antd-mobile'
import  PropTypes  from 'prop-types'

class AvatarSelector extends Component {
  static propTypes = {  //必填参数
    selectAvatar: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state={
    }
  }
  
  render(){
    const avatarList = '黑猫,红猫,黄猫,大彩蝶,杰尼龟,可达鸭,六尾狐,妙蛙种子,皮卡丘,睡觉袍子,小火龙,皮皮,蓝泥马,粉泥马,绿泥马'
                          .split(',').map(v=>({icon:require(`../img/${v}.png`),text:v}))//头像列表
    const gridHeader = this.state.icon 
                        ? (<div>
                          <span>已选择头像</span>
                          <img style={{width:`${100}px`,paddingLeft:`${50}px`}} src={this.state.icon} alt=''/>
                        </div>)
                        :"请选择头像"
                        
    return(
        <div>
          <List renderHeader={()=>gridHeader}>
            <Grid //网格放置头像
              data={avatarList}
              columnNum={5}
              onClick={elm=>{
                this.setState(elm)
                this.props.selectAvatar(elm.text)  //此处需要属性验证PropTypes组件
              }}
            /> 
          </List>
        </div>
      )
  }
}



export default AvatarSelector