const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);
	await browser.close();
	return title;
}

/**
 * Go to url api/v1/movies/city/barranquilla/billboard 
 * and return the urls by fetch api
 * @param {string} url
 * @returns {Array}
 */
async function getIDs(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	const fetch_movies = await page.evaluate(async () => {
		const all_movies = await fetch("api/v1/movies/city/barranquilla/billboard", {
			method: "GET",
		});
		const all_movies_json = await all_movies.json();
		return all_movies_json;
	});
	const list_movies = fetch_movies.data;
	await browser.close();
	let urls_movies_api = [];
	for (c of list_movies) {
		urls_movies_api.push("api/v1/movie/" + c.id + "/barranquilla");
	}
	return urls_movies_api;
}

/**
 * Go to url api/v1/movies/city/barranquilla/billboard
 * and its path to colect the information needed
 * and finally return the information collected to make the json array
 * @param {string} url
 * @param {string} path
 * @returns {JSON-Array}
 */

async function getDataMovie(url, path) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	const fetch_movie = await page.evaluate(async (path) => {
		const movie = await fetch(path, {
			method: "GET",
		});
		const info_page = await movie.json();
		return info_page;
	}, path);
	const details_movie = fetch_movie.data;
	await browser.close();
	return {
		originalTitle: details_movie.original,
		title: details_movie.title,
		synopsis: details_movie.synopsis,
		starred: details_movie.starred,
		director: details_movie.director,
		posterPhoto: "/" + details_movie.poster_photo + "/",
		trailer: "https://youtube.com/watch?v=" + details_movie.youtube + "/",
	}
}
module.exports = {
	getPageTitle, getIDs, getDataMovie
};