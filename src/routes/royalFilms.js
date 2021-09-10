const scraper = require('../services/scraper');

async function get(req, res) {
	try {
		const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
		const Urls = await scraper.getAllURLMovies('https://royal-films.com/cartelera/barranquilla');
		let originalTitle,title,synopsis,starred,director,posterPhoto,trailer,JSONFile,Identi;
		let Mov = [];
		for(var i = 0; i < Urls.length; i++){
			Identi = String(Urls[i]);
			Identi = Identi.replace('https://royal-films.com/pelicula/barranquilla/','');
			Identi = Identi.substring(0,Identi.indexOf("/"));
			JSONFile = await scraper.getAllFetchMovies(Identi);
			title = String(JSONFile.data['title']);
			originalTitle = String(JSONFile.data['original']);
			starred = String(JSONFile.data['starred']);
			director = String(JSONFile.data['director']);
			posterPhoto = String(JSONFile.data['poster_photo']);
			trailer = String("https://www.youtube.com/watch?v="+JSONFile.data['youtube']+"/");
			Mov.push({originalTitle ,title, synopsis ,starred,director,posterPhoto,trailer});
			
		};

		let AllMovieInfo = await Promise.all(Mov);
		res.writeJSONResponse({ data: { 'pageTitle' : pageTitle, 'AllMovieInfo' : AllMovieInfo} }, 200);
	} catch(err) {
		res.writeJSONResponse({ data: null, err: err.message }, 500);
	}
}


module.exports = {
	get,
};
