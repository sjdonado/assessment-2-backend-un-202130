const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageData = await scraper.getPageData('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse({ data: pageData}, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
