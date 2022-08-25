const crypto = require('crypto')

exports.createPasswordHash = (value) => {
   const algo = crypto.createHash("sha256")
   const hashed_password = algo.update(value).digest('base64')
   return hashed_password;
}

exports.generateToken = () => {
   return crypto.randomBytes(30).toString('hex')
}

exports.calculateOrderTotal = (total,element) => {
   return element.net_total + total
 }
 