// pages/index/index.js

const app = getApp()
const config = require("../../utils/config.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_default_content: "请输入要查找的菜谱名称",
    tab_title: ["菜谱", "菜单"],
    tabs: [],
    menu_tab_title: ["今日", "历史"],
    menu_tabs:[],
    hasUserInfo: app.globalData.hasUserInfo,
    showDialog: false,
    recipeList: [],
    swiperHeight: 150,
    userInfo: {},
    focusNum: 0,
    fansNum: 0,
    activeTab: 1
  },

  addNewMenu: function () {
    if (this.data.hasUserInfo) {
      wx.navigateTo({
        url: '/pages/add/add',
      })
    } else {
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
    this.getUserInfoOperate(e)

  },

  // 获得玩家信息的操作
  async getUserInfoOperate(e) {
    if ('userInfo' in e.detail) {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.hasUserInfo = true;
      this.setData({
        hasUserInfo: true
      })

      console.log("写入数据库 UserInfo")
      // 写入数据库 UserInfo
      await this.addUserInfo();

      // 查找菜谱 todo
      console.log("查找菜谱")
      await this.getRecipes();
    }
  },

  async getRecipes() {
    await wx.cloud.callFunction({
      name: "queryData",
      data: {
        "dataBaseName": config.DATA_BASE_NAME.RECIPE,
        "whereObject": {
          "_openid": app.globalData.openId,
          "dataJsonSet.edit_type": config.EDIT_TYPE.FINISH
        },
      }
    }).then(res => {
      const findList = res.result.data
      console.log("getRecipes=", findList)
      this.setData({
        recipeList: findList
      })
    })
  },

  // 写入userInfo数据库
  async addUserInfo() {
    await wx.cloud.callFunction({
      name: "addData",
      data: {
        "dataBaseName": config.DATA_BASE_NAME.USER_INFO,
        "dataJsonSet": {
          "userInfo": app.globalData.userInfo
        },
        "delBeforeAdd": true
      }
    }).then(res => {
      console.log(res)
    })
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },

  onMenuTabCLick(e) {
    const index = e.detail.index
    this.setData({
      menu_activeTab: index
    })
  },

  onMenuChange(e) {
    const index = e.detail.index
    this.setData({
      menu_activeTab: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("onLoad")

    const tabs = this.data.tab_title.map(item => ({
      title: item
    }))

    const menu_tabs = this.data.menu_tab_title.map(item => ({
      title: item
    }))

    this.setData({
      tabs,
      menu_tabs
    })

    if (app.globalData.userInfo) {
      console.log("onLoad app.globalData.userInfo")
      this.updataUserInfoAndGetOtherInfo()
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("app.userInfoReadyCallback")
      console.log("app", app.globalData.userInfo)

      app.userInfoReadyCallback = res => {
        this.updataUserInfoAndGetOtherInfo()
      }
    }

    this.updateSwiperHeight()
  },

  // 更新swiper的高度
  async updateSwiperHeight() {
    let systemInfo = wx.getSystemInfoSync();
    let windowHeight = systemInfo.windowHeight;
    let statusBarHeight = 0;

    const query = wx.createSelectorQuery()
    query.select('.statusBar').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.select('.userDetails').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      console.log("res=", res)
      console.log("height=", res[0].height)
      statusBarHeight = res[0].height
      console.log("windowHeight=", windowHeight.toFixed(2))
      console.log("statusBarHeight=", statusBarHeight.toFixed(2))

      let userDetailsHeight = res[2].height
      console.log("userDetailsHeight=", userDetailsHeight.toFixed(2))
      let swiperHeight = windowHeight.toFixed(2) - statusBarHeight.toFixed(2) - userDetailsHeight.toFixed(2) - 28;
      console.log("swiperHeight=", swiperHeight)
      this.setData({
        swiperHeight: swiperHeight
      })
    })
  },

  async updataUserInfoAndGetOtherInfo() {
    app.globalData.hasUserInfo = true;
    console.log("app.globalData.hasUserInfo=", app.globalData.hasUserInfo)
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo,
      userInfo: app.globalData.userInfo
    })

    await this.getRecipes()
    console.log("getRecipes end")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
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