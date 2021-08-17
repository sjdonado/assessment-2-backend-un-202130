const http = require('http');

const { PORT, HOSTNAME } = require('./src/config');

const app = require('./src/app');

const server = http.createServer((req, res) => {
  app.initialize(req, res);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});