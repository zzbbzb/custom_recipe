// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyDeleteImgPath:'/asserts/images/history_bar/delete.png',
    historyInfo:[],
    isFocus: true,
    hideCanel: false,
    findContent:[],
  },

  updataFocus: function()
  { 
    if (!this.data.isFocus)
    {
      this.setData({
        isFocus: !this.data.isFocus,
        hideCanel: false,
      })
    }
  },

  // 搜索历史文本
  searchHistoryItem: function(e)
  { 
    let info = e.currentTarget.dataset.search_info;
    this.setSearchValue(info);
    // 云内查找数据 同步
    console.log("查中数据")
    let findContent = [];

    // 显示


    this.setData({
      findContent: findContent,
      isFocus: false,
      hideCanel: true
    })
  },

  setSearchValue: function (data) {
    const search = this.selectComponent('.search');

    search.setInputData(data);
  },

  // 取消搜索
  canel: function()
  {
    if (this.data.findContent === undefined || this.data.findContent.length == 0)
    {
      // 直接回
      console.log("返回主页")
      wx.navigateBack({
        delta:1
      });
    }
    else
    {
      console.log("显示上次查找的东西")
      // 失去焦点, 显示上次查找的东西
      this.setData({
        isFocus: false,
        hideCanel: true
      })
    }
  },

  searchInfo: function(e)
  {
    this.setData({
      isFocus: false,
      hideCanel: true,
    })

    console.log("查找数据")

    this.updateHistoryInfo(e)
  },

  // 更新历史记录
  updateHistoryInfo: function(e)
  {

    let searchInfo = e.detail.searchInfo;
    let tmpHistoryInfo = this.data.historyInfo;
    let index = tmpHistoryInfo.indexOf(searchInfo);
    console.log(tmpHistoryInfo);
    console.log(index);
    if(index != -1)
    {
      console.log(tmpHistoryInfo.splice(index,1))
    }
    
    tmpHistoryInfo.unshift(searchInfo);
    if (tmpHistoryInfo.length > 6)
    {
      console.log("tmpHistoryInfo=", tmpHistoryInfo)
      tmpHistoryInfo.pop();
    }

    wx.setStorage({
      key: "SearchHistoryInfo",
      data: tmpHistoryInfo
    });

    this.setData({
      historyInfo: tmpHistoryInfo
    });
  },

  // 删除历史记录
  deleteHistory: function()
  {
    this.setData({
      historyInfo: []
    });
    wx.clearStorage("SearchHistoryInfo");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    try {
      var value = wx.getStorageSync("SearchHistoryInfo")
      if (value) {
        this.setData({
          historyInfo: value
        });
      }
    } catch (e) {
      // Do something when catch error
    }
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
  // onShareAppMessage: function () {

  // }
})