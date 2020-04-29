// pages/index/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_default_content: "请输入要查找的菜谱名称",
    tab_title: ["菜谱", "收藏", "兑换"],
    hasUserInfo: false
  },

  addNewMenu: function()
  {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  getUserInfo: function (e) {
    console.log("getUserInfo")
    console.log(e)
    if('userInfo' in e.detail)
    {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        hasUserInfo: true
      })
      // 写入数据库 UserInfo todo
      console.log("写入数据库 UserInfo todo")
    }
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log("onLoad app.globalData.userInfo")
      this.setData({
        hasUserInfo: true
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("app.userInfoReadyCallback")
      console.log("app", app.globalData.userInfo)

      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
      }
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})