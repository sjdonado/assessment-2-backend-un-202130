const { writeJSONResponse } = require('./utils');

const { royalFilmsRoute } = require('./routes');

async function listener(req, res) {
  if (req.method !== 'GET') {
    res.writeJSONResponse({ data: null, err: 'Method not allowed' }, 405);
    return;
  }
  switch (req.url) {
    case '/royal-films/barranquilla':
      await royalFilmsRoute.get(req, res);
      break;
    default:
      res.writeJSONResponse({ data: null, err: 'Route not found' }, 404);
      break;
  }
};

async function initialize(req, res) {
  Object.assign(res, { writeJSONResponse: writeJSONResponse.bind(res) });
  await listener(req, res);
}

module.exports = {
  initialize,
};
