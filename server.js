const http = require('http');

const { PORT, HOSTNAME } = require('./src/config');

const app = require('./src');

const server = http.createServer((req, res) => {
  app.start(req, res);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});