const { create, getAll, getFiltered, update, getId, deleteId, getHistory } = require('./board.service')
const { payloadCheck } = require('./../../middleware/payload.middleware')
const { ERROR, SUCCESS } = require('./../../utils/constants')

let payload

module.exports = {
  createBoard: (req, res) => {
    payload = {
      idUser: 0,
      name: '',
      date: '',
    }

    const verify = payloadCheck(req.body, payload, ['idUser', 'name'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    create(req.body, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 201, true, 'Success create board', result)
    })
  },
  getBoards: (req, res) => {
    if (req.params.status === null) {
      getAll({ idUser: req.decoded.user.id }, (error, result) => {
        if (error) return ERROR(res, 500, false, error)

        return SUCCESS(res, 200, true, 'Success fetch board', result)
      })
    } else {
      getFiltered({
        idUser: req.decoded.user.id,
        status: req.params.status,
      }, (error, result) => {
        if (error) return ERROR(res, 500, false, error)

        return SUCCESS(res, 200, true, 'Success fetch board', result)
      })
    }
  },
  getBoardsHistory: (req, res) => {
    getHistory({ idUser: req.decoded.user.id }, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 200, true, 'Success fetch board history', result)
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
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    update(req.body, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 202, true, 'Success update board', result)
    })
  },

  getBoardId: (req, res) => {
    payload = {
      id: '',
    }

    const verify = payloadCheck(req.params, payload, ['id'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    getId({
      id: req.params.id,
      idUser: req.decoded.user.id,
    }, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 200, true, `Success get board with id ${req.params.id}`, result)
    })
  },

  deleteBoard: (req, res) => {
    payload = {
      id: '',
    }

    const verify = payloadCheck(req.params, payload, ['id'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    deleteId({
      id: req.params.id,
      idUser: req.decoded.user.id,
    }, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 200, true, `Success delete board with id ${req.params.id}`, result)
    })
  },
}
