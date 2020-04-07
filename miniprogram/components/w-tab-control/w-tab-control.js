// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab_title:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    curIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTabTitle: function(e)
    {
      let selectedIndex = e.currentTarget.dataset.index;
      console.log(e)
      this.setData({
        curIndex: selectedIndex
      });
    }
  }
})
