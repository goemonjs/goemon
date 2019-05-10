import { generateTypeScriptTypes } from 'graphql-schema-typescript';
const path = require('path');

const generate = (schema, outputPath, options) => {
  generateTypeScriptTypes(schema, outputPath, options)
  .then(() => {
      console.log('DONE');
      process.exit(0);
  })
  .catch(err =>{
      console.error(err);
      process.exit(1);
  });
}

if (process.argv.length < 3) {
    console.error('Missing root folder');
} else {
    const args = process.argv.slice(2);

    const schemaFile = path.join(__dirname, '/../', args[0] + '/schema.graphql.ts');
    const typesFile = path.join(__dirname, '/../', args[0] + '/schema.ts');

    const schema = require(schemaFile).default;

    generate(schema, typesFile, {typePrefix: 'TP', noStringEnum: true, smartTResult: true, asyncResult: true})
}
