// components/w-item-menu/w-item-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataJsonSet: {
      type: Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemNum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    minusItemNum: function()
    {
      this.setData({
        itemNum: this.data.itemNum - 1
      })
    },

    addItemNum: function()
    {
      this.setData({
        itemNum: this.data.itemNum + 1
      })
    }
  }
})
