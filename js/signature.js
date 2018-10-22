const crypto = require('crypto')
const encryptString = `${JSON.stringify(data)}|${CONSTANT.youdunSecretKey}`
const md5 = crypto.createHash('md5')
const signature = md5.update(encryptString).digest('hex')