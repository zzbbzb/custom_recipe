// pages/add/add.js

const app = getApp();
const config = require("../../utils/config.js");

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
    }],
    showDialog: false,
    backDelta: 1,
    validateFormState: false
  },

  // 提交表单内容
  submitForm: function () {

    this.validateFormData();

    if (this.data.validateFormState) {
      this.upLoadFormDataAndReturn();
    }
  },

  // 验证表单数据
  async validateFormData () {
    await this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message,
            validateFormState: false
          })

        }
      } else {
        // 校验通过
        this.setData({
          validateFormState: true
        })
      }
    })
  },

  // 更新表单数据并且返回主页面
  async upLoadFormDataAndReturn(editType) {
    console.log("formData = ", this.data.formData);
    await this.uploadFormData(editType);

    console.log("退出新建菜谱")

    wx.navigateBack({
      delta: this.data.backDelta
    });
  },

  // 更新form中的数据
  async uploadFormData(editType = config.EDIT_TYPE.FINISH) {
    let coverImgPath = this.data.formData[this.data.coverPic];
    // 创建时间
    let curTimeStamp = new Date().getTime();
    // 菜谱id
    let recipeId = app.globalData.openId + curTimeStamp;
    let lastEditTime = curTimeStamp;

    console.log("before editType=", editType);

    editType = editType;

    console.log("editType=", editType);

    let coverImageResult = await this.updataImg(coverImgPath, recipeId);

    if (!coverImageResult.result) {
      return;
    }

    console.log("coverImageResult 结束,")
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
        "dataBaseName": config.DATA_BASE_NAME.RECIPE,
        "dataJsonSet": {
          "recipe_id": recipeId,
          "edit_type": editType,
          "last_edit_time": lastEditTime,
          "create_time": curTimeStamp,
          "base_content": baseContent,
          "content_detail": contentDetail
        },
        "waitFlag": true
      }
    }).then(res => {
      console.log("菜谱成功保存,", res)
    })

    console.log("保存菜谱结束, 返回主页")
  },

  // 图片云存储
  async updataImg(imgPath, recipeId) {
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

    return {
      result: result,
      fileId: fileId
    }
  },

  // 图片路径变化赋值
  tapImgChange: function (e) {
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
  formTextAreaChange: function (e) {
    const {
      field
    } = e.currentTarget.dataset
    console.log(e)
    console.log("field=", field)
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  goBack: function (e) {
    console.log("goBack = ", e);
    this.setData({
      showDialog: !this.data.showDialog,
      backDelta: e.detail.delta
    })
  },

  tapDialogButton: function (e) {
    console.log("tag=", e)
    if (e.detail.index === 0) {
      this.setData({
        showDialog: !this.data.showDialog,
      })

      wx.navigateBack({
        delta: this.data.backDelta
      })
      return;
    }

    this.validateFormData();

    if (e.detail.index === 1) // 确认, 选择保存草稿箱
    {
      if(this.data.validateFormState)
      {
        this.upLoadFormDataAndReturn(config.EDIT_TYPE.DRAFT);
      }
      else{
        this.setData({
          showDialog: !this.data.showDialog,
        })
      }
    }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
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

  }
})