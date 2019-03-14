module.exports = {
  options: {},
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Enter a name for the new project (i.e.: myProject): ',
      validate: function (input) {
        const done = this.async();
        if (!input.match("^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$")) {
          done('Project name is invalid!');
          return;
        }
        done(null, true);
      }
    },
    {
      type: 'input',
      name: 'version',
      message: 'Enter version (i.e.: 1.0.0): ',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter description: ',
    }
  ],
  filesToRender: [
    'package.json',
  ],
};
