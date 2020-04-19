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
    updataShowDelDialog:function()
    {
      this.setData({
        dialogDelShow: !this.data.dialogDelShow
      })
    },
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
      }

    },
    GetImage: function()
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
          }
        },
      })
    }
  }
})
