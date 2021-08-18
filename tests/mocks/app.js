const app = require('../../src/app');

async function request(method, url) {
  const req = {
    url,
    method,
  };

  const res = {
    statusCode: null,
    body: null,
    headers: [],
    setHeader: function (key, value) {
      this.headers.push({ [key]: value });
    },
    end: function (response) {
      this.body = JSON.parse(response);
    },
  };

  res.setHeader = res.setHeader.bind(res);
  res.end = res.end.bind(res);

  await app.initialize(req, res);

  return res;
}

module.exports = {
	request,
};
