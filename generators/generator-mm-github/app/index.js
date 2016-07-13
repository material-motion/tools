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
var fs = require('fs');
var async = require('async');
var toLaxTitleCase = require('titlecase').toLaxTitleCase;
const spawn = require('child_process').spawn;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    var authorsPath = this.destinationPath('AUTHORS');
    if (this.fs.exists(authorsPath)) {
      var authors = this.fs.read(authorsPath);

      var re = /^# This is the list of (.+?) authors for copyright purposes\./;
      var m;
      if ((m = re.exec(authors)) !== null) {
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
        this.oldName = m[1];
      }
    }
  },

  prompting: function () {
    // Add new prompts here.
    // Platform-specific prompts should use `when: isType()`.
    // All required `type: input` prompts should either have `default:` set,
    // or use `validate: isNotEmpty()`.

    var prompts = [];
    var isType = function(type) {
      return function(answers) {
        return answers.type === type;
      };
    };
    var isNotEmpty = function(str) {
      if (!str || !str.length) {
        return "Cannot be empty."
      }
      return true;
    };

    if (!this.oldName) {
      this.oldName = this.appname; // Default to current folder name
    }

    prompts.push({
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: this.oldName,
    });

    prompts.push({
      type: 'list',
      name: 'type',
      message: 'Choose the type of repo:',
      choices: function() {
        return ['basic'].concat(
          fs.readdirSync(this.sourceRoot()).filter(function(file) {
            return file.substr(0, 1) != '.' && file != 'basic';
          })
        );
      }.bind(this)(),
    });

    prompts.push({
      type: 'input',
      name: 'package',
      message: 'Package name:',
      validate: isNotEmpty,
      when: isType('android'),
    });

    prompts.push({
      type: 'input',
      name: 'owner',
      message: 'Github owner:',
      default: 'material-motion',
      when: isType('android'),
    });

    return this.prompt(prompts).then(function (answers) {
      // Store prompted fields from answers to `this` to be used later.
      if (answers.name) {
        this.name = toLaxTitleCase(answers.name);
      }
      this.type = answers.type;
      this.package = answers.package;
      this.owner = answers.owner;
    }.bind(this));
  },

  writing: function () {
    var copyAll = function(type) {
      // Add fields to the mapping to use in templates like <%= name %>.
      var mapping = {
        name: this.name,
        package: this.package,
        owner: this.owner,
      };

      // Template all non-jar/png files.
      this.fs.copyTpl(
        this.templatePath(type + '/**/!(*.jar|*.png)'),
        this.destinationPath(''),
        mapping
      );
      this.fs.copyTpl(
        this.templatePath(type + '/.**'),
        this.destinationPath(''),
        mapping
      );

      // Copy all jar/png files.
      this.fs.copy(
        this.templatePath(type + '/**/{*.jar,*.png}'),
        this.destinationPath('')
      );
    }.bind(this);

    if (this.type != 'basic') {
      copyAll('basic');
    }
    copyAll(this.type);

    if (this.type === 'android') {
      // Moves the file located in parent/ to parent/packagePath/
      var moveToPackagePath = function(parent, file, packagePath) {
        this.fs.move(
          // Globbing does not work with this.fs.move() despite documentation.
          this.destinationPath(parent + '/' + file),
          this.destinationPath(parent + '/' + packagePath + '/' + file)
        );
      }.bind(this);

      var packagePath = this.package.replace(/\./g, "/");
      moveToPackagePath(
        'library/src/androidTest/java', 'ApplicationTest.java', packagePath);
      moveToPackagePath(
        'library/src/main/java', 'Library.java', packagePath);
      moveToPackagePath(
        'sample/src/main/java', 'MainActivity.java', packagePath + "/sample");
    }
  },

  install: function () {
    var submodules = {
      'basic': {
        'third_party/arc-proselint': 'https://github.com/google/arc-proselint.git'
      },
      'objc': {
        'third_party/clang-format-linter': 'https://github.com/vhbit/clang-format-linter.git',
        'third_party/arc-jazzy-linter': 'https://github.com/google/arc-jazzy-linter.git',
        'third_party/arc-xcode-test-engine': 'https://github.com/google/arc-xcode-test-engine.git'
      }
    };

    spawn('git', ['init']).on('close', function(code) {
      spawn('git', ['submodule', 'init']).on('close', function(code) {
        var installModules = function(type, cb) {
          var modules = submodules[type];

          async.eachOfSeries(modules, function(module, path, callback) {
            spawn('git', [
                'submodule',
                'add',
                module,
                path
            ]).on('close', function(code) {
              callback();
            });
          }, function(err) {
            if (cb) {
              cb(err);
            }
          });
        }.bind(this);

        if (this.type != 'basic') {
          installModules('basic');
        }
        const done = this.async();
        installModules(this.type, done);
      }.bind(this));

    }.bind(this));
  }
});
