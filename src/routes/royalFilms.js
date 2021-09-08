const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const Urls = await scraper.getAllURLMovies('https://royal-films.com/cartelera/barranquilla');
		let originalTitle,title,synopsis,starred,director,posterPhoto,trailer,Aux;
		let Mov = [];
		for(var i = 0; i < Urls.length; i++){
			console.log(Urls[i]);
			Aux = await scraper.getMovieTextInfo(Urls[i]);
			console.log(Aux);
			title = Aux[0];
			originalTitle = Aux[1];
			starred = Aux[2];
			director = Aux[3];
			synopsis = Aux[4];
			posterPhoto = await scraper.getImage(Urls[i]);
			trailer = await scraper.getVideo(Urls[i]);
			Mov.push({originalTitle ,title, synopsis ,starred,director,posterPhoto,trailer});
			
		};

		let AllMovieInfo = await Promise.all(Mov);
		res.writeJSONResponse({ data: { 'pageTitle' : pageTitle, 'AllMovieInfo' : AllMovieInfo} }, 200);




		/* console.log(Urls);
		const Aux = await scraper.getMovieTextInfo(Urls[0]);
		let originalTitle,title,synopsis,starred,director,posterPhoto,trailer;
		originalTitle = Aux[0];
		title = Aux[1];
		synopsis = Aux[2]
		starred = Aux[3]
		director = Aux[4]
		posterPhoto = await scraper.getImage(Urls[0]);
		trailer = await scraper.getVideo(Urls[0]);
		console.log("end");
		AllMovieInfo = {originalTitle,title,synopsis,starred,director,posterPhoto,trailer};
		res.writeJSONResponse({ data: { pageTitle, AllMovieInfo} }, 200);
 */
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}


module.exports = {
	get,
};
