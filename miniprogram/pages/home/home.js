// pages/home/home.js
const app = getApp()
Page({

  data: {
    floorstatus: false,
    goodList:[]
  },
  getData(dataBaseName = "goodList", skipNumber = 0, needNumber = 9){
    wx.cloud.callFunction({
      name:"getDataFromGoodLists",
      data:{
        databaseName:dataBaseName,
        skipNumber:skipNumber,
        needNumber:needNumber
      },
      success:_res=>{
        console.log("调用商品信息成功",_res)
        var oldGoodList = this.data.goodList
        var newGoodList = oldGoodList.concat(_res.result.data)
        this.setData({
          goodList:newGoodList
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  onLoad: function () {
    this.getData()
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    Toast('搜索' + this.data.value);
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData("goodList",this.data.goodList.length,3)
    console.log(this.data.goodList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})