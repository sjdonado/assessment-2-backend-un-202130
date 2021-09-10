const puppeteer = require("puppeteer");

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {Promise<{pageTitle: string, movies: any[]}>}
 */
async function getMoviesInfo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  const pageTitle = await page.evaluate(
    () => document.querySelector("head > title").innerText
  );

  const moviesDataPromises = await page.evaluate(() => {
    const movieslinks = Array.from(
      document.querySelectorAll(".movie-box"),
      (element) => element.href
    );
    const movieIds = movieslinks.map(
      (link) => new URL(link).pathname.split("/")[3]
    );
    const movies = movieIds.map((movieId) =>
      fetch(`https://royal-films.com/api/v1/movie/${movieId}/barranquilla`)
        .then((res) => res.json())
        .then((res) => res.data)
    );

    return Promise.all(movies);
  });

  const allMoviesDetails = await moviesDataPromises.map((movie) => ({
    originalTitle: movie.original,
    title: movie.title,
    synopsis: movie.synopsis,
    starred: movie.starred,
    director: movie.director,
    posterPhoto: movie.poster_photo,
    trailer: `https://youtube.com/watch?v=${movie.youtube}`,
  }));

  await browser.close();

  return { pageTitle, allMoviesDetails };
}

module.exports = {
  getMoviesInfo,
};
