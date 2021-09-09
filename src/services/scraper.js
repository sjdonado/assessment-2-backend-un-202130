const puppeteer = require('puppeteer');

let browser;

const initBrowser = async () => {
  if (browser === undefined) {
    browser = await puppeteer.launch();
  }
}

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {Promise<{title: string, movies: any[]}>}
 */
async function getMoviesInfo(url) {
  await initBrowser();

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
  const title = await page.evaluate(() => document.querySelector('head > title').innerText);

  const moviesDataPromises = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll('.movie-box')).map(el => el.href);
    const movieIds = links.map(link => (new URL(link).pathname.split('/')[3]));

    return await Promise.all(movieIds.map(async (movieId) => {
      const resp = await fetch(`https://royal-films.com/api/v1/movie/${movieId}/barranquilla`);
      return await resp.json();
    }));
  });

  const moviesData = (await moviesDataPromises).map(movie => ({
    originalTitle: movie.data.original,
    title: movie.data.title,
    synopsis: movie.data.synopsis,
    starred: movie.data.starred,
    director: movie.data.director,
    posterPhoto: movie.data.poster_photo,
    trailer: `https://youtube.com/watch?v=${movie.data.youtube}`,
  }));

  await page.close();

  return { title, moviesData };
}

if (process.env.NODE_ENV !== 'test') {
  initBrowser();
}

module.exports = {
  getMoviesInfo,
};
