import { createApolloFetch } from 'apollo-fetch';

export default class HelloService {

  public static async hello(url) {
      const fetch = createApolloFetch({
        uri: url
      });

      let res = await fetch({
        query: '{ hello }',
      });

      if ( res.data === undefined ) {
        throw new Error('Failed to call hello');
      }
      return res.data.hello;
  }
}
