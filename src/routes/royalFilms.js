const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.getPageTitle('https://royal-films.com/cartelera/barranquilla');
        const Cartelera = await scraper.getMoviesURL('https://royal-films.com/cartelera/barranquilla');
        //Sacamos la informacion y enviamos a nueva variable 
        let MoviesInfo = await Promise.all(Cartelera);
        //Guargar en const Info_JSon 
        const Info_JSon = {
            pageTitle: pageTitle,
            allMoviesDetails: MoviesInfo
        }
        
        res.writeJSONResponse({ data: Info_JSon }, 200);
    } catch(err) {
        res.writeJSONResponse({ data: null, err: err.message }, 500);
    }
}

module.exports = {
    get,
};