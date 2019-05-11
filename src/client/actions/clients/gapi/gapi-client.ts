import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

class GApiClient {
  protected baseUrl: string = '';
  protected endPoint: string = '';
  protected authLink?: ApolloLink;
  protected credentials?: string;

  constructor({
    baseUrl,
    endPoint,
    credentials,
    token,
  }: {
    baseUrl: string;
    endPoint: string;
    credentials?: string;
    token?: string;
  }) {
    this.baseUrl = baseUrl;
    this.endPoint = endPoint;
    this.credentials = credentials;

    if (token) {
      this.authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `${token}` : '',
          }
        };
      });
    }
  }

  protected async doQuery<Q, V>(apiPath: string, query: string, variables?: V) {
    const uri = this.baseUrl + apiPath;

    try {
      const httpLink = createHttpLink({
        uri: uri,
        credentials: this.credentials, // for cookies
      });
      let link = httpLink;
      if (this.authLink) {
        link = this.authLink.concat(httpLink);
      }
      const client = new ApolloClient({ link: link, cache: new InMemoryCache() });
      const result = await client.query<Q, V>({ query: gql(query), variables });

      return result.data;
    }
    catch (error) {
      // if (this.debug) {
      //   const util = require('util');
      //   console.error(`DEBUG -> GAPI -> doQuery: ${uri}\nerror:\n${util.inspect(error, { showHidden: true, showProxy: true, depth: 10 })}`);
      // }
      // throwIfKnownError(error);
      throw new Error('Failed to call ' + uri + ' ' + query + ' : ' + error);
    }
  }

  protected async doMutate<Q, V>(apiPath: string, mutation: string, variables?: V) {
    const uri = this.baseUrl + apiPath;

    try {
      const httpLink = createHttpLink({
        uri: uri,
        credentials: this.credentials, // for cookies
      });
      let link = httpLink;
      if (this.authLink) {
        link = this.authLink.concat(httpLink);
      }
      const client = new ApolloClient({ link: link, cache: new InMemoryCache() });
      const result = await client.mutate<Q, V>({ mutation: gql(mutation), variables });

      return result.data;
    }
    catch (error) {
      throw new Error('Failed to call ' + apiPath + ' ' + mutation + ' : ' + error);
    }
  }
}

export default GApiClient;
