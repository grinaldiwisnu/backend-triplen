const { create, get, update, getId, deleteId } = require('./board.service')
const { payloadCheck } = require('./../../middleware/payload.middleware')
const { ERROR, SUCCESS } = require('./../../utils/constants')

let payload

module.exports = {
  createBoard: (req, res) => {
    payload = {
      idUser: 0,
      name: '',
    }

    const verify = payloadCheck(req.body, payload, ['idUser', 'name'])
    if (!verify.status) return ERROR(res, 400, false, verify.message)

    create(req.body, (error, result) => {
      if (error) return ERROR(res, 400, false, error)

      return SUCCESS(res, 200, true, 'Success create board', result)
    })
  },

  getBoards: (req, res) => {
    get({ idUser: req.decoded.user.id }, (error, result) => {
      if (error) return ERROR(res, 400, false, error)

      return SUCCESS(res, 200, true, 'Success fetch board', result)
    })
  },

  updateBoard: (req, res) => {
    payload = {
      idUser: 0,
      idBoard: 0,
      name: '',
      status: 0,
    }

    const verify = payloadCheck(req.body, payload, ['idUser', 'idBoard', 'name', 'status'])
    if (!verify.status) return ERROR(res, 400, false, verify.message)

    update(req.body, (error, result) => {
      if (error) return ERROR(res, 400, false, error)

      return SUCCESS(res, 200, true, 'Success update board', result)
    })
  },

  getBoardId: (req, res) => {
    payload = {
      id: '',
    }

    const verify = payloadCheck(req.params, payload, ['id'])
    if (!verify.status) return ERROR(res, 400, false, verify.message)

    getId({
      id: req.params.id,
      idUser: req.decoded.user.id,
    }, (error, result) => {
      if (error) return ERROR(res, 400, false, error)

      if (result.length === 0) return ERROR(res, 400, false, 'Board not found')

      return SUCCESS(res, 200, true, `Success get board with id ${req.params.id}`, result)
    })
  },

  deleteBoard: (req, res) => {
    payload = {
      id: '',
    }

    const verify = payloadCheck(req.params, payload, ['id'])
    if (!verify.status) return ERROR(res, 400, false, verify.message)

    deleteId({
      id: req.params.id,
      idUser: req.decoded.user.id,
    }, (error, result) => {
      if (error) return ERROR(res, 400, false, error)

      return SUCCESS(res, 200, false, `Success delete board with id ${req.params.id}`, result)
    })
  },
}
