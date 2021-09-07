const appMock = require('../mocks/app');

// const royalFilmsResponse = JSON.parse(process.env.ROYAL_FILMS_RESPONSE);

describe('GET /royal-films/barranquilla', () => {
  let res;
  beforeEach(async () => {
    res = await appMock.request('GET', '/royal-films/barranquilla');

    expect(res.statusCode).toBe(200);
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).not.toBeNull();
  });

  it('Should return the page title', () => {
    expect(res.body.data.pageTitle).not.toBeUndefined();
    expect(res.body.data.pageTitle).not.toBeNull();
    // expect(res.body.data.pageTitle).toBe(royalFilmsResponse.data.pageTitle);
  });

  it('Should return allMoviesDetails array', () => {
    expect(res.body.data.allMoviesDetails).not.toBeUndefined();
    expect(res.body.data.allMoviesDetails).not.toBeNull();
    expect(res.body.data.allMoviesDetails.length).toBeGreaterThan(0);
  });

  it('Should return a valid allMoviesDetails shape', () => {
    expect(res.body.data.allMoviesDetails).not.toBeUndefined();
    expect(res.body.data.allMoviesDetails).not.toBeNull();
    expect(res.body.data.allMoviesDetails.length).toBeGreaterThan(0);

    res.body.data.allMoviesDetails.forEach((movie) => {
      Object.keys(movie).forEach((key) => {
        expect(movie[key]).not.toBeUndefined();
        expect(movie[key]).not.toBeNull();
      });
    });
  });

  it('Should return a valid posterPhoto', () => {
    res.body.data.allMoviesDetails.forEach((movie) => {
      expect(movie.posterPhoto).toMatch(/https:\/\/royal-films.com\/assets\/covers\/.*/);
    });
  });

  it('Should return a valid trailer', () => {
    res.body.data.allMoviesDetails.forEach((movie) => {
      expect(movie.trailer).toMatch(/https:\/\/youtube.com\/watch\?v=.*/);
    });
  });

  // it('Should match with royalFilmsResponse values', () => {
  //   res.body.data.allMoviesDetails.forEach((movie, index) => {
  //     Object.keys(movie).forEach((key) => {
  //       expect(movie[key]).toBe(royalFilmsResponse.data.allMoviesDetails[index][key]);
  //     });
  //   });
  // });
});
