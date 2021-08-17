function writeJSONResponse(data = {}, statusCode = 500) {
  this.statusCode = statusCode;
  this.setHeader('Content-Type', 'application/json');
  this.end(JSON.stringify({ data }));
}

module.exports = {
	writeJSONResponse,
};
