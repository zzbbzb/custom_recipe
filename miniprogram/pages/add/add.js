// pages/add/add.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodName: 'foodName',
    foodPrice: 'foodPrice',
    coverPic: 'coverPic',
    error: '',
    formData: {

    },
    rules: [{
      name: 'foodName',
      rules: {
        required: true,
        message: '菜品名称必填'
      },
    }, {
      name: 'foodPrice',
      rules: [{
        required: true,
        message: '菜品价格必填'
      }, {
        isNum: true,
        message: '菜品价格要是数字'
      }],
    }]
  },

  // 提交表单内容
  submitForm: function() {
    this.selectComponent('#form').validate((valid, errors) => {
      // console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        // wx.showToast({
        //   title: '校验通过'
        // })
        // 校验通过, 把菜谱添加到数据库, 并且退出新建菜谱
        console.log("formData = ", this.data.formData);
        this.uploadFormData();
      }
    })
  },

  async uploadFormData() {
    let coverImgPath = this.data.formData[this.data.coverPic];
    // 创建时间
    let curTimeStamp = new Date().getTime();
    // 菜谱id
    let recipeId = app.globalData.openId + curTimeStamp;
    let lastEditTime = curTimeStamp;
    let editType = 1;

    let coverImageResult = await this.updataImg(coverImgPath, recipeId);

    if(!coverImageResult.result)
    {
      return;
    }

    console.log("coverImageResult 结束")
    let foodName = this.data.formData[this.data.foodName];
    let foodPrice = this.data.formData[this.data.foodPrice];

    // 基本内容
    let baseContent = {
      coverImageFileId: coverImageResult.fileId,
      foodName: foodName,
      foodPrice: foodPrice
    }

    // 细节(步骤, 注意事项)
    let contentDetail = {}

    // 保存菜谱进入数据库
    await wx.cloud.callFunction({
      name: "addData",
      data: {
        "dataBaseName": "Recipe",
        "dataJsonSet": {
          "recipe_id": recipeId,
          "edit_type": editType,
          "last_edit_time": lastEditTime,
          "create_time": curTimeStamp,
          "base_content": baseContent,
          "content_detail": contentDetail
        },
        waitFlag: true
      }
    }).then(res => {
      console.log("菜谱成功保存,",res)
    })

    console.log("保存菜谱结束")
  },

  // 图片云存储
  async updataImg(imgPath, recipeId){
    let result = false
    let fileId = ""
    // openId/recipe_id/.png
    let curTimeStamp = new Date().getTime();
    console.log(app)
    let cloudPath = app.globalData.openId + "/" + recipeId + "/" + curTimeStamp.toString() + ".png";
    console.log("cloudPath = ", cloudPath) 
    await wx.cloud.uploadFile({
      cloudPath: cloudPath, // 上传至云端的路径
      filePath: imgPath // 小程序临时文件路径
    }).then((res) => {
      console.log(res)
      console.log(res.fileID)
      result = true
      fileId = res.fileID
    }).catch((res) => {
      console.log(res)
    })

    return { result: result, fileId: fileId}
  },

  // 图片路径变化赋值
  tapImgChange: function(e) {
    console.log(e);
    let imagePath = e.detail.imgPath;

    const {
      field
    } = e.currentTarget.dataset

    this.setData({
      [`formData.${field}`]: imagePath
    })

  },

  // 表单中textArea组件内容发生变化
  formTextAreaChange: function(e) {
    const {
      field
    } = e.currentTarget.dataset
    console.log(e)
    console.log("field=", field)
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})