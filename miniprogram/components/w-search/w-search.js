// components/w-search/w-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    default_content:{     // 默认内容
      type: String,
      value: ""
    },
    search_width:{        // 长度
      type: Number,
      value: 100
    },
    disable:{             // 禁用
      type: Boolean,
      value: false
    },
    isOnlyImageBtn:{      // 显示只有按钮
      type: Boolean,
      value: false,
      observer: function (newv, old)
      {
        console.log(old);
        console.log(newv);
      }
    },
    auto_width:{          // 自动长度
      type: Boolean,
      value: false
    },
    isBackPage:{          // 回退上一页面
      type: Boolean,
      value: false
    },
    hasUserInfo:{         // 是否有玩家信息
      type: Boolean,
      value: false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isInput: false,
    isFocus: false,
    inputValue:'',
    searchImgPath:'/asserts/images/search/search.png',
    searchCrossOutImgPath:'/asserts/images/search/cross_out.png',
    showDialog: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 打开登录提示框
    tapDialog: function(e)
    {
      this.setData({
        showDialog: !this.data.showDialog
      })
    },

    tapDialogButton: function(e)
    {
      this.setData({
        showDialog: !this.data.showDialog
      })
    },

    // 焦点在input上,用来判别区分显示搜索页面和搜索结果
    focusInput: function(e)
    {
      console.log("focusInput=",e)
      this.triggerEvent("focusInput",{})
    },

    // 更新历史记录信息, 并且跳转到搜索结果页面
    searchAndUpdateInfo: function(e)
    {
      this.triggerEvent("updateInfo",{searchInfo:e.detail.value})
    },

    // 显示清空搜索内容按钮
    showSearchClear: function(e)
    {
      let content = e.detail.value
      console.log(content);
      if(content !== "")
      {
        this.data.isInput = true;
      }else{
        this.data.isInput = false;
      }

      this.setData({
        isInput: this.data.isInput 
      });
    },

    setInputData: function(data)
    {
      let tmpIsInput = data ===''?false:true;
      this.setData({
        inputValue: data,
        isInput: tmpIsInput
      });
    },

    // 清空搜索内容
    clearInputData: function(e)
    {
      this.setData({
        inputValue:'',
        isInput: false
      });
    },

    skipToSearchPage: function(e)
    {
      if(this.properties.hasUserInfo)
      {
        console.log("跳转到搜索页面");
        wx.navigateTo({
          url: '/pages/search/search',
        })
      }
      
    }
  }
})
