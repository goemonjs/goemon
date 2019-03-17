import * as app from '../../app';
import * as supertest from 'supertest';

describe('/hello test', () => {

  let agent: supertest.SuperTest<supertest.Test>;

  test('/hello', (done) => {
    const request = supertest.agent(app.createApp());
    const query = {
      query: `
        query {
          hello,
          plus(a: 1, b: 2)
        }
      `
    };

    const expected = {
      hello: 'Hello world!',
      plus: 3
    };

    request.post('/hello')
    .set('Accept', 'application/json')
    .send(query)
    .then(res => {
      expect(res.body.data).toEqual(expected);
      done();
    })
    .catch(err => {
      done(err);
    });
  });
});
