const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		//const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
    const pageInfo = await scraper.getPageInfo('https://royal-films.com/cartelera/barranquilla');
		res.writeJSONResponse(pageInfo, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
