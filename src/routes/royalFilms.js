const scraper = require("../services/scraper");
const puppeteer = require("puppeteer");

async function get(req, res) {
  try {
    const browser = await puppeteer.launch();
    const pageTitle = await scraper.getPageTitle(
      "https://royal-films.com/cartelera/barranquilla",
      browser
    );
    const Urls = await scraper.getAllURLMovies(
      "https://royal-films.com/cartelera/barranquilla",
      browser
    );
    let JSONFile,
      Identi;
    let Mov = [];
    for (var i = 0; i < Urls.length; i++) {
      Identi = String(Urls[i]);
      Identi = Identi.replace(
        "https://royal-films.com/pelicula/barranquilla/",
        ""
      );
      Identi = Identi.substring(0, Identi.indexOf("/"));
      JSONFile = await scraper.getAllFetchMovies(Identi, browser);
      Movie = {
		originalTitle: JSONFile.data.original,
        title: JSONFile.data.title,
		synopsis: JSONFile.data.synopsis,
        starred: JSONFile.data.starred,
        director: JSONFile.data.director,
        posterPhoto: JSONFile.data.poster_photo,
        trailer:
          "https://youtube.com/watch?v=" + JSONFile.data.youtube+ "/",
      };
      Mov.push(Movie);
    }
    res.writeJSONResponse(
      { data: { pageTitle: pageTitle, allMoviesDetails: Mov } },
      200
    );
  } catch (err) {
    console.log(err);
    res.writeJSONResponse({ data: null, err: err.message }, 500);
  }
}

module.exports = {
  get,
};
