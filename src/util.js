//专门放工具函数,多个文件共享


export function getRedirectPath({avatar}){
  //根据用户信息（action.payload）跳转页面地址。
  // user.type ? /boss : /genius
  //user.avatar ? /bossinfo : geniusinfo  前缀一致
  let url = avatar ? '/userpage' : '/completeinfo'
  console.log('getRedirectPath',url)
  
  return url
}

//
export function getChatId(userId,targetId){
  return [userId, targetId].sort().join('_')
}