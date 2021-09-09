const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.Get_Page_Title('https://royal-films.com/cartelera/barranquilla');
        const Get_Links = await scraper.Get_Links('https://royal-films.com/cartelera/barranquilla');

        const datos=[]
        let i=0
        while(i<Get_Links.length){
            j = scraper.Get_Data(Get_Links[i])
		    datos.push(j)
            i++;
        }
          let prom = await Promise.all(datos);
        const Json = {pageTitle: pageTitle,allMoviesDetails:prom}
        res.writeJSONResponse({ data: Json }, 200);
    } catch(err) {
        res.writeJSONResponse({ data: null, err: err.message }, 500);
    }
}

module.exports = {
    get,
};
