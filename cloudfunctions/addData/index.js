// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-qjl9w'
})

let db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  let dataBaseName = event.dataBaseName
  let dataJson = event.dataJson
  let waitFlag = true;
  if("waitFlag" in event)
  {
    waitFlag = event.waitFlag
  }
  // if (waitFlag) {
    return await db.collection(dataBaseName).add({
      data: dataJson
    })
  // } else {
  //   return db.collection(dataBaseName).add({
  //     data: dataJson
  //   })
  // }
}