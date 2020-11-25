// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const userCollection = db.collection('user')//选取数据库
  const thisID = userCollection.where({'_openid':event.user3.openId})
  thisID.update({
    data:{
      userInfo:event.user3
    },
    success:res=>{
      console.log("修改成功",res)
    },
    fail:err=>{
      console.log("修改失败",err)
    }
  })
  return

}