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

async function getPageInfo(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('.movie-box') // wait for the element
	let element = await page.$$('.movie-box') // return all the elements with the class style given
	let urls = [];
	for (const x of element) {//  pathway taken by the elements 
		urls.push('https://royal-films.com/' + await page.evaluate(el => el.getAttribute('href'), x))
	}
	console.log(urls)
	return urls

}


module.exports = {
	getPageTitle, getPageInfo,
};