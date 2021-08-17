const { writeJSONResponse } = require('./utils');

const start = (req, res) => {
  Object.assign(res, { writeJSONResponse: writeJSONResponse.bind(res) });
  res.writeJSONResponse({ message: 'Hello world' }, 200);
};

module.exports = {
  start
}