const { createSubscription, getDetailSubscription, getSubscriptions } = require('./subscription.service')

const { ERROR, SUCCESS } = require('../../utils/constants')

module.exports = {
  subscribe: (req, res) => {
    createSubscription(req.body, (error, result) => {
      if (error) return ERROR(res, 401, false, error)

      return SUCCESS(res, 201, true, 'Success subscribe package', result)
    })
  },
}
