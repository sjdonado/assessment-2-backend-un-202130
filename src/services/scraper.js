const puppeteer = require('puppeteer');
let browser;
async function init() {
	 browser = await puppeteer.launch();
}
/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
	await init();
	const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);

	await page.close();
	return title;
}
/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {JSON}
 */
async function getPageMovies(url) {
	const page = await browser.newPage();
  	await page.goto(url, { waitUntil: 'networkidle0' });
	var bodyMovies = await page.evaluate(() => {return JSON.parse(document.querySelector('body').innerText)});

	await page.close();
	return bodyMovies;
}
var detallespeliculas=[];
var formatodetalles=[];
async function getDetallesPeliculas(bodyMovies) {

	const page = await browser.newPage();
	
	for (let i = 0; i < bodyMovies.data.length; i++) {
		var url='https://royal-films.com/api/v1/movie/'+bodyMovies.data[i].id+'/barranquilla?time=1631241126093';
		await page.goto(url, { waitUntil: 'networkidle0' });
		var detalles = await page.evaluate(() => {return JSON.parse(document.querySelector('body').innerText)});
		detallespeliculas.push(detalles.data);
	}
	await browser.close();
	return detallespeliculas;
}
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
	getDetallesPeliculas,
	getformat
};
