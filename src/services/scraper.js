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
 * Go to an URL with JSON response and return raw JSON
 * @param {strig} url 
 * @returns {JSON}
 */
async function getRawData(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url);
	var initData = await page.evaluate(() => {
		return JSON.parse(document.querySelector("body").innerText);
	});


	var rawData = [];
	for (let index = 0; index < initData.data.length; index++) {
		await page.goto(`https://royal-films.com/api/v1/movie/${initData.data[index].id}/barranquilla`);
		var movies = await page.evaluate(() => {
			return JSON.parse(document.querySelector("body").innerText);
		});
		rawData.push(movies.data);
	}

	await browser.close();

	return rawData;
}


module.exports = {
	getPageTitle,
	getRawData
};
