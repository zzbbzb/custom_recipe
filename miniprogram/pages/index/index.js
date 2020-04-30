// pages/index/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_default_content: "请输入要查找的菜谱名称",
    tab_title: ["菜谱", "收藏", "兑换"],
    hasUserInfo: app.globalData.hasUserInfo,
    showDialog: false
  },

  addNewMenu: function()
  {
    if(this.data.hasUserInfo)
    {
      wx.navigateTo({
        url: '/pages/add/add',
      })
    }
    else{
      console.log("没有用户信息")
      this.setData({
        showDialog: !this.data.showDialog
      })
    }
  },

  tapDialogButton: function (e) {
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  getUserInfo: function (e) {
    console.log("getUserInfo")
    console.log(e)
    if('userInfo' in e.detail)
    {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.hasUserInfo = true;
      this.setData({
        hasUserInfo: true
      })
      // 写入数据库 UserInfo todo
      console.log("写入数据库 UserInfo todo")
     
      this.tt();
      
      // 查找菜谱 todo
    }
    
  },

  async tt()
  {
    await wx.cloud.callFunction({
      name: "addData",
      data: {
        "dataBaseName": "UserInfo",
        "dataJson": {
          "userInfo": app.globalData.userInfo
        },
        "waitFlag": true
      }
    }).then(console.log)
    console.log("查找菜谱")
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log("onLoad app.globalData.userInfo")
      app.globalData.hasUserInfo = true;
      this.setData({
        hasUserInfo: app.globalData.hasUserInfo
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("app.userInfoReadyCallback")
      console.log("app", app.globalData.userInfo)

      app.userInfoReadyCallback = res => {
        app.globalData.hasUserInfo = true;
        console.log("app.globalData.hasUserInfo=", app.globalData.hasUserInfo)
        this.setData({
          hasUserInfo: app.globalData.hasUserInfo
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