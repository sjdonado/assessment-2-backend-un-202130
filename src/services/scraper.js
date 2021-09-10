const puppeteer = require('puppeteer');
let browser;
let page;
init = async () =>{
	browser = await puppeteer.launch();
}
/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
	browser = await puppeteer.launch();
	page = await browser.newPage();

  	await page.goto(url, { waitUntil: 'networkidle0' });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);

	return title;
}
/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {JSON}
 */
 var detallespeliculas=[];
async function getPageMovies(url) {
  	await page.goto(url, { waitUntil: 'networkidle0' });
	var bodyMovies = await page.evaluate(() => {return JSON.parse(document.querySelector('body').innerText)});


	for (let i = 0; i < bodyMovies.data.length; i++) {
		var url='https://royal-films.com/api/v1/movie/'+bodyMovies.data[i].id+'/barranquilla?time=1631241126093';
		await page.goto(url, { waitUntil: 'networkidle0' });
		var detalles = await page.evaluate(() => {return JSON.parse(document.querySelector('body').innerText)});
		detallespeliculas.push(detalles.data);
	}
	await browser.close();
	return detallespeliculas;
}

var formatodetalles=[];
async function getformat(detallespeliculas){
	for (let i = 0; i < detallespeliculas.length; i++) {
		var trailer = 'https://youtube.com/watch?v='+detallespeliculas[i].youtube
		var pelicula={
				originalTitle: detallespeliculas[i].original,
				title: detallespeliculas[i].title,
				synopsis: detallespeliculas[i].synopsis,
				starred: detallespeliculas[i].starred,
				director: detallespeliculas[i].director,
				posterPhoto: detallespeliculas[i].poster_photo,
				trailer: trailer
		}	
		formatodetalles.push(pelicula);
	}
	return formatodetalles;
}

module.exports = {
	getPageTitle,
	getPageMovies,
	getformat
};
