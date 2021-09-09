const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageInfo(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	const title = await page.evaluate(() => document.querySelector('head > title').innerText);
	await page.waitForSelector('.movie-box') // wait for the element
	let elements = await page.$$('.movie-box') // return all the elements with the class style given
	let urls = [];
	for (const x of elements) {//  pathway taken by the elements 
		urls.push('https://royal-films.com' + await page.evaluate(el => el.getAttribute('href'), x))
	}
	async function getMoviesDetails(url) {
		const browser = await puppeteer.launch();
		const movie_page = await browser.newPage();
		await movie_page.goto(url, { waitUntil: 'networkidle0' });
		await movie_page.waitForSelector('td') // wait for the element
		let elements = await movie_page.$$('td') // return all the elements with the class style given
		let data = []
		for await (const x of elements) {//  pathway taken by the elements 
			data.push(await movie_page.evaluate(el => el.textContent, x))
		}
		await movie_page.waitForSelector('.synopsis') // wait for the element
		let x = await movie_page.$('.synopsis') // return all the elements with the class style given
		let syn1 = await movie_page.evaluate(el => el.textContent, x)
		let synopsis = syn1.trim()
		synopsis = synopsis.split('\n');
		let content = synopsis[0];
		content = content.replace(/\./g, '');
		data.push(content);
		let dicc = await {
			originalTitle: data[1],
			title: data[0],
			synopsis: data[4],
			starred: data[2],
			director: data[3],
		}
		console.log(dicc);
	}

	// contentArray = [];
	// for await (const x of urls) {
	// 	contentArray.push(await getMoviesDetails(x.toString()))
	// }
	await getMoviesDetails(urls[0]);
	// console.log(contentArray);

	await browser.close();
	return { title, urls };
}

module.exports = {
	getPageInfo,
};