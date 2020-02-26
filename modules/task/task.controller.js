const { create, deleteId, getId, update, updateBudget } = require('./task.service')
const { payloadCheck } = require('./../../middleware/payload.middleware')
const { SUCCESS, ERROR } = require('./../../utils/constants')

let payload

module.exports = {
  createTask: (req, res) => {
    payload = {
      id: 0,
      name: '',
      location: '',
      latitude: '',
      longitude: '',
      date: '',
    }

    const verify = payloadCheck(req.body, payload,
      ['id', 'name', 'location', 'latitude', 'longitude', 'date'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    req.body.idUser = req.decoded.user.id
    create(req.body, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      getId({ id: result.insertId }, (errors, results) => {
        if (errors) return ERROR(res, 500, false, errors)

        return SUCCESS(res, 201, true, 'Success create task', results)
      })
    })
  },
  getTask: (req, res) => {
    payload = {
      id: '',
    }

    const verify = payloadCheck(req.params, payload, ['id'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    req.params.idUser = req.decoded.user.id
    getId(req.params, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 200, true, 'Success create task', result)
    })
  },
  deleteTask: (req, res) => {
    payload = {
      id: '',
    }

    const verify = payloadCheck(req.params, payload, ['id'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    req.params.idUser = req.decoded.user.id
    deleteId(req.params, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 200, true, `Success delete task with id ${req.params.id}`, result)
    })
  },
  updateTask: (req, res) => {
    payload = {
      id: 0,
      name: '',
      status: '',
    }

    const verify = payloadCheck(req.body, payload, ['id', 'name', 'status'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    getId({
      id: req.body.id,
      idUser: req.decoded.user.id,
    }, (error, result) => {
      if (error) return ERROR(res, 500, false, error)
      // eslint-disable-next-line camelcase
      const { id_user, location, latitude, longitude, date } = result[0]
      const data = {
        id: req.body.id,
        // eslint-disable-next-line camelcase
        idUser: req.body.idUser.is(null) ? id_user : req.body.idUser,
        name: req.body.name,
        location: req.body.location.is(null) ? location : req.body.location,
        latitude: req.body.latitude.is(null) ? latitude : req.body.latitude,
        longitude: req.body.longitude.is(null) ? longitude : req.body.longitude,
        status: req.body.status,
        date: req.body.date.is(null) ? date : req.body.date,
      }

      update(data, (errors, results) => {
        if (errors) return ERROR(res, 500, false, errors)

        return SUCCESS(res, 202, true, 'Success update task', results)
      })
    })
  },
  setBudget: (req, res) => {
    payload = {
      id: 0,
      budget: 0,
    }

    const verify = payloadCheck(req.body, payload, ['id', 'budget'])
    if (!verify.status) return ERROR(res, 501, false, verify.message)

    // eslint-disable-next-line max-len
    updateBudget({ id: req.body.id, idUser: req.decoded.user.id, budget: req.body.budget }, (error, result) => {
      if (error) return ERROR(res, 500, false, error)

      return SUCCESS(res, 202, true, 'Success set budget', result)
    })
  },
}
