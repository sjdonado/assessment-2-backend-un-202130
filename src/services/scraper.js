const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {Promise<{title: string, movies: any[]}>}
 */
async function getMoviesInfo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
  const title = await page.evaluate(() => document.querySelector('head > title').innerText);

  const moviesDataPromises = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.movie-box')).map(el => el.href);
    const movieIds = links.map(link => (new URL(link).pathname.split('/')[3]));
    const resp = movieIds.map(movieId => fetch(`https://royal-films.com/api/v1/movie/${movieId}/barranquilla`).then(res => res.json()));

    return Promise.all(resp);
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

  await browser.close();

  return { title, moviesData };
}

module.exports = {
  getMoviesInfo,
};
