const GraphqlGenerator = require('graphql-code-generator');

GraphqlGenerator.generate({
    schema: 'http://127.0.0.1:3000/gapi/guest',
    overwrite: true,
    generates: {
      [process.cwd() + '/src/routes/impl/gapi/guest/gtypes.d.ts']: {
        plugins: ['typescript-common', 'typescript-server']
      }
    }
  },
  true
);

GraphqlGenerator.generate({
    schema: 'http://127.0.0.1:3000/gapi/member',
    overwrite: true,
    generates: {
      [process.cwd() + '/src/routes/impl/gapi/member/gtypes.d.ts']: {
        plugins: ['typescript-common', 'typescript-server']
      }
    }
  },
  true
);

GraphqlGenerator.generate({
    schema: 'http://127.0.0.1:3000/gapi/admin',
    overwrite: true,
    generates: {
      [process.cwd() + '/src/routes/impl/gapi/admin/gtypes.d.ts']: {
        plugins: ['typescript-common', 'typescript-server']
      }
    }
  },
  true
);
