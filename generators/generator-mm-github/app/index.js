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
var toLaxTitleCase = require('titlecase').toLaxTitleCase;

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
        this.name = m[1];
      }
    }
  },

  prompting: function () {
    var prompts = [];
    if (!this.name) {
      prompts.push({
        type    : 'input',
        name    : 'name',
        message : 'Project name',
        default : this.appname // Default to current folder name
      });
    }
    return this.prompt(prompts).then(function (answers) {
      if (answers.name) {
        this.name = toLaxTitleCase(answers.name);
      }
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath(''),
      { name: this.name }
    );
    this.fs.copyTpl(
      this.templatePath('.*'),
      this.destinationPath(''),
      { name: this.name }
    );
  }
});
