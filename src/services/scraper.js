const puppeteer = require('puppeteer');
const axios = require('axios')

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(page) {
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);
	return title;
}

async function getAllData(url){
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('.movie-box');

	const pageTitle = await getPageTitle(page)
	const allMoviesDetails = await getAllMoviesDetails(page)
	const result = {
		pageTitle,
		allMoviesDetails
	}
	await browser.close();
	return result
}

async function getAllMoviesDetails(page) {
	const links = await page.evaluate(() => {
		const atags = document.querySelectorAll('.movie-box');
		const hrefs = [];
		for (let atag of atags) {
			hrefs.push(atag.href);
		}
		return hrefs;
	});
	result = [];
	for(let link of links){
		result.push(getInfoFromUrlMovie(link))
	}
	return await Promise.all(result)
}

async function getInfoFromUrlMovie(url) {
	let movieId = url.split('/')[5];
	let link = "https://royal-films.com/api/v1/movie/"+movieId+"/barranquilla";
	const apiResp = await axios.get(link);
	let movieInfo = {
		originalTitle: apiResp.data.data.original,
		title: apiResp.data.data.title,
		synopsis: apiResp.data.data.synopsis,
		starred: apiResp.data.data.starred,
		director: apiResp.data.data.director,
		posterPhoto: apiResp.data.data.poster_photo,
		trailer: `https://youtube.com/watch?v=${apiResp.data.data.youtube}`,
	}
	return movieInfo
}

module.exports = {
	getPageTitle,
	getAllData
};
