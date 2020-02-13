const jwt = require('jsonwebtoken')
const { checkUser } = require('../modules/user/user.service')

module.exports = {
  checkBearer: (req, res, next) => {
    let token = req.get('Authorization')
    if (!token) {
      return res.status(400).json({
        status: false,
        message: 'Not allowed, user not authenticated',
        data: null,
      })
    }
    // slice token auth from Bearer key
    token = token.slice(7)
    jwt.verify(token, process.env.APP_KEY, { algorithms: ['HS256'] },
      (err, decoded) => {
        if (err) {
          return res.status(400)
            .json({
              status: false,
              message: 'Bearer token invalid',
              data: err,
            })
        }
        checkUser({ id_google: decoded.user.id_google }, (error, result) => {
          if (error) {
            return res.status(400)
              .json({
                status: false,
                message: error,
                data: null,
              })
          }
          if (!result) {
            return res.status(400)
              .json({
                status: false,
                message: 'User with auth key not found',
                data: null,
              })
          }

          req.decoded = decoded
          next()
        })
      })
  },
}
