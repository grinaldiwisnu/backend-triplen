const jwt = require('jsonwebtoken')
const { signIn, register, checkUserId } = require('./user.service')
const { payloadCheck } = require('./../../middleware/payload.middleware')
const { ERROR, SUCCESS } = require('./../../utils/constants')

let payload
module.exports = {

  signInUser: (req, res) => {
    payload = {
      id_google: '',
      email: '',
    }

    const verify = payloadCheck(req.body, payload, ['id_google', 'email'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    signIn(req.body, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      if (result.length === 0) return ERROR(res, 200, false, 'User not found')
      const data = result[0]
      data.token = jwt.sign({ user: data }, process.env.APP_KEY, {
        expiresIn: (60 * 60 * 24 * 7),
        algorithm: 'HS256',
      })

      return SUCCESS(res, 200, true, 'Sign in successful', data)
    })
  },
  createAccount: (req, res) => {
    payload = {
      id_google: '',
      email: '',
      name: '',
      no: 0,
    }

    const verify = payloadCheck(req.body, payload,
      ['id_google', 'email', 'name', 'notelp'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    register(req.body, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      if (!result) return ERROR(res, 500, false, 'Internal server error')

      checkUserId({ id: result.insertId }, (errors, results) => {
        if (errors) return ERROR(res, 500, false, errors)
        const data = results[0]
        data.token = jwt.sign({ user: data }, process.env.APP_KEY, {
          expiresIn: (60 * 60 * 24 * 7),
          algorithm: 'HS256',
        })

        return SUCCESS(res, 202, true, data)
      })
    })
  },
  checkBalance: (req, res) => {
    if (parseInt(req.params.idUser, 0) !== req.decoded.user.id) {
      return ERROR(
        res, 501, false, 'User with bearer not match',
      )
    }

    payload = {
      idUser: '',
    }

    const verify = payloadCheck(req.params, payload, ['idUser'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    checkUserId({ id: req.params.idUser }, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 200, true, result[0])
    })
  },
}
