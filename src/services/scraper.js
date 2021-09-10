const puppeteer = require("puppeteer");
const axios = require("axios");
/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */

async function getPageTitle(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  const head = await page.evaluate(() => [
    document.querySelector("head > title").innerText,
  ]);
  const pageTitle = head[0];
  await page.waitForSelector('[class="movie-box"]');

  const moviesLink = await page.evaluate(() => {
    const movies = document.querySelectorAll('[class="movie-box"]');
    const links = [];
    for (let link of movies) {
      links.push(link.href);
    }
    return links;
  });

  const moviesIds = [];
  moviesLink.forEach((element) => {
    moviesIds.push(
      "https://royal-films.com/api/v1/movie/" +
        element.split("/")[5] +
        "/barranquilla"
    );
  });
  const allMoviesDetails = [];
  for (let movieId of moviesIds) {
    const reto = await axios.get(movieId);
    const retorno = reto.data;
    allMoviesDetails.push({
      originalTitle: retorno.data["original"],
      title: retorno.data["title"],
      synopsis: retorno.data["synopsis"],
      starred: retorno.data["starred"],
      director: retorno.data["director"],
      posterPhoto: retorno.data["poster_photo"],
      trailer: "https://youtube.com/watch?v=" + retorno.data.youtube,
    });
  }
  await browser.close();

  return { pageTitle, allMoviesDetails };
}

module.exports = {
  getPageTitle,
};
