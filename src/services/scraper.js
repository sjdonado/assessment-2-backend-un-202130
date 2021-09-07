const puppeteer = require("puppeteer");

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });
    const title = await page.evaluate(
      () => document.querySelector("head > title").innerText
    );

    await browser.close();

    return title;
  } catch (e) {
    console.log(e);
  }
}

async function getMoviesIds(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const movieList = await page.evaluate(async () => {
      const moviesUrl =
        "https://royal-films.com/api/v1/movies/city/barranquilla/billboard?time=" +
        new Date().getTime();
      const movies = await fetch(moviesUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        mode: "cors",
      });
      return movies.json();
    });

    allIds = [];
    movieList.data.forEach((m) => {
      allIds.push(m.id);
    });

    await browser.close();
    return allIds;
  } catch (e) {
    console.log(e);
  }
}

async function getMovieDetails(id, url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const movieUrl =
      "https://royal-films.com/api/v1/movie/" +
      id +
      "/barranquilla?time=" +
      new Date().getTime();

    const movieDetails = await page.evaluate(async (movieUrl) => {
      const movie = await fetch(movieUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        mode: "cors",
      });
      return movie.json();
    }, movieUrl);

    await browser.close();
    return {
      originalTitle: movieDetails.data.original.replace(/\n/g, ""),
      title: movieDetails.data.title.replace(/\n/g, ""),
      synopsis: movieDetails.data.synopsis.replace(/\n/g, ""),
      starred: movieDetails.data.starred.replace(/\n/g, ""),
      director: movieDetails.data.director.replace(/\n/g, ""),
      posterPhoto: movieDetails.data.poster_photo,
      trailer: "https://youtube.com/watch?v=" + movieDetails.data.youtube,
    };
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getPageTitle,
  getMoviesIds,
  getMovieDetails,
};
