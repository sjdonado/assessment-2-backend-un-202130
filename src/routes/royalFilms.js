const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const Movedetails= await scraper.getMoviesDetails('https://royal-films.com/cartelera/barranquilla')
		let moviesInfo= await Promise.all(Movedetails)
		const Info ={
			pageTitle: pageTitle,
			allMoviesDetails: moviesInfo
		}
		res.writeJSONResponse({ data:Info}, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
