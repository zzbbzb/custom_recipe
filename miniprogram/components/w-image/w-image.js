// components/w-image/w-image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    del_img_path: "/asserts/images/add_image/del_add.png",
    imgPath: "",
    isShowImg: false,
    isShowDelImg: false,
    dialogDelShow: false 
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 更新是否要显示删除图片弹窗
    updataShowDelDialog:function()
    {
      this.setData({
        dialogDelShow: !this.data.dialogDelShow
      })
    },

    // 点击弹窗的确定或者取消按钮
    tapDialogDelButton: function(res)
    {
      console.log(res.detail.index)
      let selectIndex = res.detail.index
      this.updataShowDelDialog();
      if(selectIndex == 1) // 确认删除
      {
        this.setData({
          imgPath: "",
          isShowImg: !this.data.isShowImg,
          isShowDelImg:!this.data.isShowDelImg
        })
        
        // 通知修改成功
        this.triggerEvent('imgChange', { imgPath: this.data.imgPath }, {})
      }

    },

    // 选择图片
    tapImage: function()
    {
      wx.chooseImage({
        success: (res) => {
          console.log(res);
          console.log(res.tempFilePaths.length)
          if (res.tempFilePaths.length > 0)
          {
            this.setData({
              imgPath: res.tempFilePaths[0],
              isShowImg: !this.data.isShowImg,
              isShowDelImg: !this.data.isShowDelImg
            });

            // 通知修改成功
            this.triggerEvent('imgChange', { imgPath: this.data.imgPath }, {})
          }
        },
      })
    }
  }
})
