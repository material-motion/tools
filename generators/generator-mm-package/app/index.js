/*
 Copyright 2016-present The Material Motion Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var generators = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var async = require('async');
var file = require('file');
const spawn = require('child_process').spawn;

function titleCase(word) {
  return word.substr(0, 1).toUpperCase() + word.substr(1);
}

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    this.defaultSlug = path.basename(this.destinationRoot());
    this.defaultExportName = this.defaultSlug.split('-').map(titleCase).join('');
    this.defaultPackageName = 'material-motion-' + this.defaultSlug;
    this.defaultName = this.defaultPackageName.split('-').map(titleCase).join(' ');
    this.defaultDescription = '';
  },

  prompting: function() {
    // Add new prompts here.
    // Platform-specific prompts should use `when: isType()`.
    // All required `type: input` prompts should either have `default:` set,
    // or use `validate: isNotEmpty()`.

    var prompts = [];

    var isNotEmpty = function(str) {
      if (!str || !str.length) {
        return "Cannot be empty."
      }
      return true;
    };

    prompts.push({
      type: `input`,
      name: `name`,
      message: `What name would you like to appear in the README?`,
      default: this.defaultName,
    });

    prompts.push({
      type: `input`,
      name: `slug`,
      message: `What's the name of this folder`,
      default: this.defaultSlug,
    });

    prompts.push({
      type: `input`,
      name: `packageName`,
      message: `What name will this package be published under on NPM?`,
      default: this.defaultPackageName,
    });

    prompts.push({
      type: `input`,
      name: `description`,
      message: `Please provide a description for NPM.`,
      default: this.defaultDescription,
    });

    prompts.push({
      type: `input`,
      name: `exportName`,
      message: `Which variable would you like to export from index.ts?`,
      default: this.defaultExportName,
    });

    return this.prompt(prompts).then(function(answers) {
      // Store prompt answers to `this.mapping` to be used in templates like <%= name %>.
      this.mapping = {
        slug: answers.slug,
        exportName: answers.exportName,
        packageName: answers.packageName,
        name: answers.name,
        description: answers.description,
      };
    }.bind(this));
  },

  writing: function() {
    var copyAll = function(type) {
      // Replace instances of __TEMPLATE__<key>__ with the corresponding `this.mapping` value.
      var templatizedFilename = function(filename) {
        Object.keys(this.mapping).forEach(
          key => {
            var regex = new RegExp("__TEMPLATE__" + key + "__", "g");
            filename = filename.replace(regex, this.mapping[key]);
          }
        );
        return filename;
      }.bind(this);

      // Will only templatize non-blacklisted files.
      var binarySafeCopy = function(sourcePath, destinationPath) {
        if (sourcePath.endsWith('.jar') || sourcePath.endsWith('.png')) {
          this.fs.copy(sourcePath, destinationPath, this.mapping);
        } else {
          this.fs.copyTpl(sourcePath, destinationPath, this.mapping);
        }
      }.bind(this);

      var base_path = this.templatePath(type);

      file.walkSync(base_path, function(start, dirs, names) {
        names.forEach(function(name) {
          if (name === '.DS_Store')
            return;

          var absoluteFilePath = start + '/' + name;
          var filename = absoluteFilePath.substr(base_path.length + 1);

          binarySafeCopy(
            absoluteFilePath,
            this.destinationPath(templatizedFilename(filename))
          );
        }, this);
      }.bind(this));
    }.bind(this);

    copyAll('typescript');
  },

  install: function() {
    const done = this.async();
    // TODO: run yarn on completion
    // spawn('yarn').on('close', done);
  }
});
