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
var toLaxTitleCase = require('titlecase').toLaxTitleCase;
const spawn = require('child_process').spawn;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    // Returns the first parenthetical match, or null.
    var extractRegexMatchFromFile = function(path, regex) {
      if (this.fs.exists(path)) {
        var file = this.fs.read(path);
        var m;
        if ((m = regex.exec(file)) !== null) {
          return m[1];
        }
        return null;
      }
    }.bind(this);

    // For each prompt, try to find the default for an existing repo,
    // then try to generate the default for a new repo.

    this.defaultRepoName = path.basename(this.destinationRoot());

    this.defaultName = extractRegexMatchFromFile(
      this.destinationPath('AUTHORS'),
      /^# This is the list of (.+?) authors for copyright purposes\./
    );
    if (!this.defaultName) {
      this.defaultName = toLaxTitleCase(this.appname); // Base on folder name
    }

    var suffix = this.defaultRepoName.split('-').slice(-1)[0];

    if (this.fs.exists('build.gradle')) {
      this.defaultType = 'android';
    } else if (this.fs.exists('.clang-format')) {
      if (suffix == 'swift') {
        this.defaultType = 'swift';
      } else {
        this.defaultType = 'objc';
      }
    }
    if (!this.defaultType) {
      if (suffix === 'android') {
        this.defaultType = 'android';
      } else if (suffix === 'objc') {
        this.defaultType = 'objc';
      } else if (suffix === 'swift') {
        this.defaultType = 'swift';
      }
    }

    this.defaultPackage = extractRegexMatchFromFile(
      this.destinationPath('library/src/main/AndroidManifest.xml'),
      /package="(.+?)"/
    );
    if (!this.defaultPackage) {
      this.defaultPackage =
        'com.google.android.material.motion.'
        + this.defaultRepoName
          .replace(/^material-motion-/, '')
          .replace(/-android$/, '')
          .replace(/-/, '.');
    }
  },

  prompting: function() {
    // Add new prompts here.
    // Platform-specific prompts should use `when: isType()`.
    // All required `type: input` prompts should either have `default:` set,
    // or use `validate: isNotEmpty()`.

    var prompts = [];
    var isType = function(types) {
      if (typeof types === 'string') {
        types = [types];
      }
      return function(answers) {
        for (var index in types) {
          if (answers.type === types[index]) {
            return true;
          }
        }
        return false;
      };
    };
    var isNotEmpty = function(str) {
      if (!str || !str.length) {
        return "Cannot be empty."
      }
      return true;
    };

    prompts.push({
      type: 'input',
      name: 'repoName',
      message: 'Github repo name:',
      validate: isNotEmpty,
      default: this.defaultRepoName,
    });

    prompts.push({
      type: 'input',
      name: 'repoOwner',
      message: 'Github repo owner:',
      validate: isNotEmpty,
      default: 'material-motion',
    });

    prompts.push({
      type: 'input',
      name: 'name',
      message: 'Project name:',
      validate: isNotEmpty,
      default: this.defaultName,
    });

    prompts.push({
      type: 'list',
      name: 'type',
      message: 'Choose the type of repo:',
      choices: ['basic'].concat(
        fs.readdirSync(this.sourceRoot()).filter(function(file) {
          return file.substr(0, 1) != '.' && file != 'basic';
        })
      ),
      default: this.defaultType,
    });

    prompts.push({
      type: 'input',
      name: 'componentName',
      message: 'Component name (no prefix, e.g. Runtime):',
      validate: isNotEmpty,
      when: isType(['objc', 'swift']),
    });

    prompts.push({
      type: 'input',
      name: 'package',
      message: 'Java package name:',
      validate: isNotEmpty,
      default: this.defaultPackage,
      when: isType('android'),
    });

    return this.prompt(prompts).then(function(answers) {
      this.type = answers.type;

      // Store prompt answers to `this.mapping` to be used in templates like <%= name %>.
      this.mapping = {
        repoName: answers.repoName,
        repoOwner: answers.repoOwner,
        name: answers.name,
        componentName: answers.componentName,
        package: answers.package,
      }

      // Calculate derivative values.
      if (this.type == 'android') {
        this.mapping.packagePath = this.mapping.package.replace(/\./g, '/');
      }
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
          var absoluteFilePath = start + '/' + name;
          var filename = absoluteFilePath.substr(base_path.length + 1);

          binarySafeCopy(
            absoluteFilePath,
            this.destinationPath(templatizedFilename(filename))
          );
        }, this);
      }.bind(this));
    }.bind(this);

    if (this.type != 'basic') {
      copyAll('basic');
    }
    copyAll(this.type);

    var arcconfig = this.fs.readJSON(this.destinationPath('.arcconfig'));
    arcconfig.load = arcconfig.load.sort();
    this.fs.writeJSON(this.destinationPath('.arcconfig'), arcconfig);
  },

  install: function() {
    var submodules = {
      'basic': {
        'third_party/arc-proselint': 'https://github.com/google/arc-proselint.git',
        'third_party/arc-hook-conphig': 'https://github.com/material-foundation/arc-hook-conphig.git',
        '.arc-hooks/post-diff/arc-hook-github-issues': 'https://github.com/material-foundation/arc-hook-github-issues.git'
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
