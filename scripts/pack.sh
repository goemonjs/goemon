## rebuild app
node ./node_modules/gulp/bin/gulp clean
node ./node_modules/gulp/bin/gulp build:production
# If the directory, `dist`, doesn't exist, create `dist`
stat dist || mkdir dist
# Archive artifacts
zip dist/deploy.zip -r build package.json package-lock.json .npmrc bin config
