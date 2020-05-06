// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

let db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  let dataBaseName = event.dataBaseName
  let dataJsonSet = event.dataJsonSet
  let waitFlag = false
  if("waitFlag" in event)
  {
    waitFlag = event.waitFlag
  }

  const { OPENID } = cloud.getWXContext()
  const db_database = db.collection(dataBaseName)

  // 删除数据
  db_database.where({
    _openid: OPENID
  }).remove();

  // 添加数据
  if (waitFlag) {
    return await db_database.add({
      data:{
        _openid: OPENID,
        "dataJsonSet": dataJsonSet
      }
    })
  } else {
    return db_database.add({
      data: {
        _openid: OPENID,
        "dataJsonSet": dataJsonSet
      }
    })
  }
}