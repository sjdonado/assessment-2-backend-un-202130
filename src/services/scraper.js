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

async function getLinkM(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
  
  await page.waitForSelector('[class=movie-box]')
  const Pelis = await page.evaluate(() => { 

	const $movies = document.querySelectorAll('[class="movie-box"]')
	const urls = []
	
	$movies.forEach(($movies) => {
	  link= $movies.getAttribute("href")
	  const num = link.split("/")
      complete="https://royal-films.com/api/v1/movie/"+num[num.length-2]+"/barranquilla?"
	  urls.push(complete)
	  })
	return urls	
  })
    await browser.close();
	return Pelis;   
  }

 async function getMovies(url){
	 try{
		 const browser=await puppeteer.launch();
		 const page = await browser.newPage();
		 await page.goto(url);
		 const movieData= await page.evaluate(async(url)=>{
			 const movie=await fetch(url,{
				 headers:{
					 "Content-Type":"application/json",
				 },
				 method:"GET",
				 mode:"cors",
			 });
			 return movie.json();
		 },url);
		 await browser.close();

		 return{
			 originalTitle:movieData.data['original'],
			 title:movieData.data['title'],
			 synopsis:movieData['synopsis'],
			 starred:movieData.data['starred'],
			 director: movieData.data['director'],
			 posterPhoto: movieData.data['poster_photo'],
			 trailer: "https://youtube.com/watch?v="+movieData.data.youtube+"/",
		 }

	 }catch(error){
         //console.error();
	 }
 }



module.exports = {
	getPageTitle,
	getLinkM,
	getMovies,
};
