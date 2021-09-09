const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitleUrls(url) {
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

	const movie_page = await browser.newPage();
	await movie_page.goto(urls[0], { waitUntil: 'networkidle0' });
	await movie_page.waitForTimeout('5000');
	await movie_page.waitForSelector('td') // wait for the element
	let elements_m = await movie_page.$$('td') // return all the elements with the class style given
	let datos = []
	for (let x of elements_m) {//  pathway taken by the elements 
		// console.log(x);
		datos.push(await movie_page.evaluate(el => el.textContent, x));
	}
	console.log(datos);

	await movie_page.waitForSelector('.synopsis') // wait for the element
	let x = await movie_page.$('.synopsis') // return all the elements with the class style given
	let syn1 = await movie_page.evaluate(el => el.textContent, x)
	let synopsis = await syn1.trim()
	synopsis = synopsis.split('\n');
	let content = synopsis[0];
	content = content.replace(/\./g, '');
	datos.push(content);
	let dicc = await {
		originalTitle: datos[1],
		title: datos[0],
		synopsis: datos[4],
		starred: datos[2],
		director: datos[3],
	}
	console.log(dicc);



	await browser.close();

	return { title, dicc };
}

// async function getMoviesDetails(url) {
// 	const browser = await puppeteer.launch();
// 	const movie_page = await browser.newPage();
// 	await movie_page.goto(url, { waitUntil: 'networkidle0' });
// 	await movie_page.waitForTimeout('5000');
// 	await movie_page.waitForSelector('td') // wait for the element
// 	let elements = await movie_page.$$('td') // return all the elements with the class style given
// 	let datos = []
// 	for (let x of elements) {//  pathway taken by the elements 
// 		// console.log(x);
// 		datos.push(await movie_page.evaluate(el => el.textContent, x));
// 	}
// 	// await movie_page.waitForSelector('.synopsis') // wait for the element
// 	// let x = await movie_page.$('.synopsis') // return all the elements with the class style given
// 	// let syn1 = await movie_page.evaluate(el => el.textContent, x)
// 	// let synopsis = await syn1.trim()
// 	// synopsis = synopsis.split('\n');
// 	// let content = synopsis[0];
// 	// content = content.replace(/\./g, '');
// 	// data.push(content);
// 	// let dicc = await {
// 	// 	originalTitle: data[1],
// 	// 	title: data[0],
// 	// 	synopsis: data[4],
// 	// 	starred: data[2],
// 	// 	director: data[3],
// 	// }
// 	// console.log(dicc);
// 	console.log("Finisheeeeeeddddd")
// 	console.log(datos);
// 	return datos;
// }

module.exports = {
	getPageTitleUrls,
};