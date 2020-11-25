//app.js
wx.cloud.init()
const userList = wx.cloud.database().collection("user")
App({
  onLaunch: function () {
    var that = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    wx.getSetting({
      success: res =>{
        if(!res.authSetting['scope.userInfo'])
        {
          wx.redirectTo({
            url: '/pages/login/login',
          })
          console.log("用户未授权")
        }else{
          console.log("用户已授权")
          wx.cloud.callFunction({
            name:'myLogin',
            data:{},
            success:res =>{
              userList.where({
                _openid:res.result.openid
              }).get({
                success:res =>{
                  that.globalData.openId = res.data[0]._openid
                  that.globalData.userInfo = res.data[0].userInfo
                  that.globalData.userInfo.openId = that.globalData.openId
                  console.log("获取用户信息成功", that.globalData)
                },
                fail:err =>{
                  console.log("获取失败",err)
                }
              })
              console.log("调用myLog云函数成功",res.result)
            },
            fail: err =>{
              console.log("调用云函数失败")
            }
          })
        }
      }
    })
  },
  globalData:{
    openId:'',
    userInfo:{}
  }
})
