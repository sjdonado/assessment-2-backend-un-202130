const appMock = require('../mocks/app');

const royalFilmsResponse = process.env.ROYAL_FILMS_RESPONSE;

describe('GET /royal-films/barranquilla', () => {
  it('Should response 200', async () => {
    const res = await appMock.request('GET', '/royal-films/barranquilla');

    expect(res.statusCode).toBe(200);
    expect(res.response.data).toMatchObject(royalFilmsResponse);
  });
});
