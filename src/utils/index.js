/**
 * Parse and write a JSON response
 * @param {object} payload
 * @param {number} statusCode
 */
function writeJSONResponse(payload = {}, statusCode = 500) {
  this.statusCode = statusCode;
  this.setHeader('Content-Type', 'application/json');
  this.end(JSON.stringify(payload));
}

module.exports = {
	writeJSONResponse,
};
