// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var databaseName = event.databaseName
  var skipNumber = Number(event.skipNumber)
  var needNumber = Number(event.needNumber)
  var goodList = db.collection(databaseName).skip(skipNumber).limit(needNumber).get({
    success:res=>{
      console.log("成功",res)
    },
    fail:err=>{
      console.log(err)
    }
  })
  return goodList
}