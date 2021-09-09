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
	return links;
}

module.exports = {
	getPageTitle,
	getUrls,
};
