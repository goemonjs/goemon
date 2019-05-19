import todoResolvers from './todo';
import profileResolvers from './profile';

export default {
  Query: {
    ...todoResolvers.Query,
    ...profileResolvers.Query
  },

  Mutation: {
    ...todoResolvers.Mutation
  }
};
