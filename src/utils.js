const { verify } = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId({ request }) {
    const Authorization = request.get('Authorization')

    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')
      const { userId } = verify(token, APP_SECRET)
      return userId
    }
  
    throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}