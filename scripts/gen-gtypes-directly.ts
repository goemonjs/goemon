import { generateTypeScriptTypes, GenerateTypescriptOptions } from 'graphql-schema-typescript';
import { makeExecutableSchema } from 'graphql-tools';
import glob from 'glob';

const generateGTypes = async (schemaDir: string, outputPath: string) => {
  const schemasPath = glob.sync(schemaDir + '/*.+(js|ts|jsx|tsx)');
  let typeDefs: string[] = [];
  schemasPath.forEach(function (schema) {
    typeDefs.push(require(schema));
  });

  const executableSchema = makeExecutableSchema({ typeDefs });
  const options: GenerateTypescriptOptions = {
    typePrefix: '',
    noStringEnum: true,
    smartTResult: true,
    asyncResult: true
  };

  await generateTypeScriptTypes(executableSchema, outputPath, options);
};

// Generate Guest Gtypes
generateGTypes(process.cwd() + '/src/routes/impl/gapi/guest/schema', process.cwd() + '/src/routes/impl/gapi/guest/gtypes.d.ts').then(() => {
  console.log('Complete generate Guest Gtypes.');
}).catch(err => {
  console.log(err);
});

// Generate Member Gtypes
generateGTypes(process.cwd() + '/src/routes/impl/gapi/member/schema', process.cwd() + '/src/routes/impl/gapi/member/gtypes.d.ts').then(() => {
  console.log('Complete generate Member Gtypes.');
}).catch(err => {
  console.log(err);
});

// Generate Admin Gtypes
generateGTypes(process.cwd() + '/src/routes/impl/gapi/admin/schema', process.cwd() + '/src/routes/impl/gapi/admin/gtypes.d.ts').then(() => {
  console.log('Complete generate Admin Gtypes.');
}).catch(err => {
  console.log(err);
});