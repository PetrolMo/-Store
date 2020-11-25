// pages/home/home.js
const app = getApp()
Page({

  data: {
    floorstatus: false,
    goodList: [],
    search_list: []
  },
  getData(dataBaseName = "goodList", skipNumber = 0, needNumber = 9) {
    wx.cloud.callFunction({
      name: "getDataFromGoodLists",
      data: {
        databaseName: dataBaseName,
        skipNumber: skipNumber,
        needNumber: needNumber
      },
      success: _res => {
        console.log("调用商品信息成功", _res)
        var oldGoodList = this.data.goodList
        var newGoodList = oldGoodList.concat(_res.result.data)
        this.setData({
          goodList: newGoodList
        })
      },
      fail: err => {
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
  goTop: function (e) { // 一键回到顶部
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
  onSearch() {
    //模糊搜索
    const db = wx.cloud.database()
    var that = this
    db.collection('goodList').where({
      //使用正则查询，实现对搜索的模糊查询
      title: db.RegExp({
        regexp: that.data.value,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      })
    }).get({
      success: res => {
        console.log(res)
        that.setData({
          search_list: res.data
        })
        let searchList = JSON.stringify(res.data)
        wx.navigateTo({
          url: '/pages/searchList/searchList?searchList=' + searchList,
        })
      }
    })
  },

  onChange(e) {
    console.log(e.detail)
    this.setData({
      value: e.detail,
    });
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData("goodList", this.data.goodList.length, 3)
    console.log(this.data.goodList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})