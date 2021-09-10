const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const allData = await scraper.getAllData('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse({ data: allData }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
