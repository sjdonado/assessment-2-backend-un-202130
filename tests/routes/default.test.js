const appMock = require('../mocks/app');

describe('GET /*', () => {
  it('Should return 404', async () => {
    const res = await appMock.request('GET', '/');
    expect(res.statusCode).toBe(404);
  });
});
