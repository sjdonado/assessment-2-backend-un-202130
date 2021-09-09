const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const links = await scraper.getLinksMovies('https://royal-films.com/cartelera/barranquilla');
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const MoviesDetails=[];
		for (link of links){
			MoviesDetails.push(await scraper.getMovieDetails(link));
		}

		//let allMoviesDetails =  await Promise.all(MoviesDetails);


		res.writeJSONResponse({ data: { pageTitle,allMoviesDetails:MoviesDetails} }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

module.exports = {
	get,
};
