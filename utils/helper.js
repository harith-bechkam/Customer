const _ = require('lodash')
exports.getReqValues = (req) => {
  return _.pickBy(_.extend(req.body, req.params, req.query), _.identity);
}