const puppeteer = require('puppeteer');
const axios = require('axios')

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

async function getUrls(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('.movie-box');
	const links = await page.evaluate(() => {
		const atags = document.querySelectorAll('.movie-box');
		const hrefs = [];
		for (let atag of atags) {
			hrefs.push(atag.href);
		}
		return hrefs;
	});
	await browser.close();
	const resp = await getInfoFromUrlMovie(links[0]);
	return resp;
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
		trailer: `https://www.youtube.com/watch?v=${apiResp.data.data.youtube}`,
	}
	return movieInfo
}

module.exports = {
	getPageTitle,
	getUrls,
};
