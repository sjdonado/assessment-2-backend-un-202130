const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const rawData = await scraper.getRawData("https://royal-films.com/api/v1/movies/city/barranquilla/billboard");
		const allMoviesDetails = getRawDataDetails(rawData)
		res.writeJSONResponse({ data: { pageTitle, allMoviesDetails } }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}

function getRawDataDetails(rawData){
	return rawData.map((movie)=>{
		return {
			originalTitle: movie.original,
			title: movie.title,
			synopsis: movie.synopsis,
			starred: movie.starred,
			director: movie.director,
			posterPhoto: movie.poster_photo,
			trailer: `https://www.youtube.com/watch?v=${movie.youtube}`
		}
	});
}

module.exports = {
	get,
};
