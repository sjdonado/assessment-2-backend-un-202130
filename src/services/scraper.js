const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);

	await browser.close();

	return title;
}
/**
 * Go to url and return the page title
 * @param {string} url
 * @returns  {ArrayConstructor}
 */
async function getAllMoviesDetails(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
  
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a');
	const links = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a');
		const links = [];
        for (let link of elements) {
			const url =link.href.split("/"); //split link to get appi url
			const urlvalue = url[5]; //get appi index value
            links.push("https://royal-films.com/api/v1/movie/"+urlvalue+"/barranquilla"); //get info from appi
        }
        return links;
    });

  
	  await browser.close();

	  const allMoviesDetails = [];

	  try {
          for(let link of links){
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(link, { waitUntil: 'networkidle0' });
            const detailsMovie = await page.evaluate(async (link) => {
            //Get Json from urls
            const req = await fetch(link);
            const detailsMovie = await req.json();
            //Set Json
            return detailsMovie;
            },link);
            await browser.close();
			//Add Moviedata to all movie details
            allMoviesDetails.push({
                originalTitle: detailsMovie.data['original'],
                title: detailsMovie.data['title'],
                synopsis: detailsMovie.data['synopsis'],
                starred: detailsMovie.data['starred'],
                director: detailsMovie.data['director'],
                posterPhoto: detailsMovie.data['poster_photo'],
                trailer: "https://youtube.com/watch?v="+detailsMovie.data.youtube
            }); 
          }
                  
      } catch (error) {
          console.log(error);
      }
  
	  return allMoviesDetails;
  }
//   /**
//  * format raw data and convert it into the requirements
//  * @param {Array} Data 
//  * @returns {Array}
//  */
//   function getDetails(Data){
// 	return Data.map((movie)=>{
// 		return {
// 			originalTitle: movie.original,
// 			title: movie.title,
// 			synopsis: movie.synopsis,
// 			starred: movie.starred,
// 			director: movie.director,
// 			posterPhoto: movie.poster_photo,
// 			trailer: `https://www.youtube.com/watch?v=${movie.youtube}`
// 		}
// 	});
// }


module.exports = {
	getPageTitle,
	getAllMoviesDetails,
	//getDataDetails,
};
