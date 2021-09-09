const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.Get_Page_Title('https://royal-films.com/cartelera/barranquilla');
		const pageInfo = await scraper.Get_INFORMATION('https://royal-films.com/cartelera/barranquilla');
        let prom = await Promise.all(pageInfo);
		const Json = {
			pageTitle: pageTitle,
			allMoviesDetails: prom
		}
		res.writeJSONResponse({ data: { Json } }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
