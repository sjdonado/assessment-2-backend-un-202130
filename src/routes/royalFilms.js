const scraper = require("../services/scraper");
require("events").EventEmitter.defaultMaxListeners = 15;

async function get(req, res) {
  try {
    const royalUrl = "https://royal-films.com/cartelera/barranquilla";
    const pageTitle = await scraper.getPageTitle(royalUrl);
    const movieIDs = await scraper.getMoviesIds(royalUrl);
    let movies = [];

    for (i of movieIDs) {
      let movie = scraper.getMovieDetails(i, royalUrl);
      movies.push(movie);
    }

    let values = await Promise.all(movies);

    const data = { pageTitle: pageTitle, allMoviesDetails: values };
    res.writeJSONResponse({ data }, 200);
  } catch (err) {
    res.writeJSONResponse({ data: null, err: err.message }, 500);
  }
}

module.exports = {
  get,
};
