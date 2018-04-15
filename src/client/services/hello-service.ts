const { createApolloFetch } = require('apollo-fetch');

export default class HelloService {

  public static hello(url) {
    return new Promise((resolve, reject) => {
      const fetch = createApolloFetch({
        uri: url
      });

      fetch({
        query: '{ hello }',
      }).then(res => {
        if ( res.data === undefined ) {
          reject('Failed to call hello');
        }
        resolve(res.data.hello);
      }).catch( err => {
        reject(err);
      });
    });
  }
}
