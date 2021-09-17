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

async function getAllMovieDetails(url) {

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('[class=movie-box]');

	const enlaces = await page.evaluate(() => {
		const elements = document.querySelectorAll('a.movie-box');
		const links = [];
		for (let element of elements) {
			id = element.href;
			id = id.substr(46, 4);
			var link = 'https://royal-films.com/api/v1/movie/' + id + '/barranquilla?';
			links.push(link);
		}

		return links;
	});

	var allMovieDetails = [];

	for (let enlace of enlaces) {

		await page.goto(enlace);

		const movieDetails = await page.evaluate(async (enlace) => {
			const movie = await fetch(enlace);
			return movie.json();
		}, enlace);

		objMovieDetails = {
			originalTitle: movieDetails.data['original'],
			title: movieDetails.data['title'],
			synopsis: movieDetails.data['synopsis'],
			starred: movieDetails.data['starred'],
			director: movieDetails.data['director'],
			posterPhoto: movieDetails.data['poster_photo'],
			trailer: "https://youtube.com/watch?v=" + movieDetails.data.youtube
		};

		allMovieDetails.push(objMovieDetails);
	}

	await browser.close();

	return allMovieDetails;
}

module.exports = {
	getPageTitle,
	getAllMovieDetails,
};