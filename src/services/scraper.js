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
async function getMoviesDetails(url){
	const browser = await puppeteer.launch({headless: false});
  	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.waitForSelector('.movie-box');
	const urls = await page.evaluate(()=>{
		const elements=document.querySelectorAll('.movie-box');
		const links=[]
		for(let element of elements){
			links.push(element.href);
		}
		return links;
	})
	const movies=[]
	for( let a of urls){
		await page.goto(a);
		await page.waitForTimeout('3000')
		await page.click('[class="img gaussian"]')
		const data = await page.evaluate(()=>{
			const details={}
			details.originalTitle=document.querySelector('.people > tbody > tr:nth-child(2) > td').innerText
			details.title=document.querySelector('.people tbody tr:nth-child(1) td').innerText
			const p1=document.querySelector('.synopsis').innerText
			const p2=document.querySelector('.synopsis > span:nth-child(2)').innerText
			const end = p2.indexOf('\n\n')
			details.synopsis=p1.substring(0,p1.length - 11) + p2.substring(0, end)
			details.starred=document.querySelector('.people tbody tr:nth-child(3) td').innerText
			details.director=document.querySelector('.people tbody tr:nth-child(4) td').innerText
			details.postherPhoto=document.querySelector('#movie > div > div > div.col-xl-3.col-lg-4.col-md-5.col-sm-12 > div > span').style.backgroundImage.slice(4, -1).replace(/"/g, "")
			const trailer=document.getElementById('player').children[0].children[0].src
			details.trailer='https://www.youtube.com/watch?v='+trailer.substring(30,trailer.indexOf('?'))

			return details
		})
		movies.push(data)
	}
	console.log(movies)
	await browser.close();
	return movies;
	  
}


module.exports = {
	getPageTitle,
	getMoviesDetails,
};
