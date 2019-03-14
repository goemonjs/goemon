'use strict';
const Generator = require('yeoman-generator');
const config = require('./config');
const glob = require('glob');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
  }

  prompting() {
    return this.prompt(config.prompts).then(answers => {
      this.name = answers.name;
      this.version = answers.version || '0.0.1';
      this.description = answers.description || '';
      this.destinationRoot(answers.name);
    });
  }

  writing() {
    const templateData = {
      name: this.name,
      version: this.version,
      description: this.description,
    };

    const copy = (input, output) => {
      this.fs.copy(
        this.templatePath(input),
        this.destinationPath(output)
      );
    };

    const copyTpl = (input, output, data) => {
      this.fs.copyTpl(
        this.templatePath(input),
        this.destinationPath(output),
        data
      );
    };

    const files = glob.sync(__dirname + '/templates' + '/**/*');

    files.forEach(file => {
      const route = file.slice((__dirname + 'templates').length + 2);

      config.filesToRender.forEach(fileToRender => {
        if (route.includes(fileToRender)) {
          // Render file
          copyTpl(route, route, templateData);
        } else {
          // Copy file
          copy(route, route);
        }
      })
    });
  }
};
