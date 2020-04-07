// components/w-search/w-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    default_content:{
      type: String,
      value: ""
    },
    search_width:{
      type: Number,
      value: 100
    },
    disable:{
      type: Boolean,
      value: false
    },
    isOnlyImageBtn:{
      type: Boolean,
      value: false,
      observer: function (newv, old)
      {
        console.log(old);
        console.log(newv);
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isInput: false,
    inputValue:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      console.log("跳转到搜索页面");
    }
  }
})
