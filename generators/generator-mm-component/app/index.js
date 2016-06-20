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
var mkdirp = require('mkdirp');
var file = require('file');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    return this.prompt([{
      type    : 'list',
      name    : 'type',
      message : 'Choose the type of component',
      choices : function() {
        return fs.readdirSync(this.sourceRoot()).filter(function(file) {
          return file.substr(0, 1) != '.';
        });
      }.bind(this)()
    }, {
      type    : 'input',
      name    : 'name',
      message : 'Component name (no prefix, e.g. Runtime)'
    }, {
      type    : 'input',
      name    : 'description',
      message : 'Single line description'
    }]).then(function (answers) {
      this.type = answers.type;
      this.name = answers.name;
      this.description = answers.description;
    }.bind(this));
  },

  writing: function () {
    var base_path = this.templatePath(this.type);

    file.walkSync(base_path, function (start, dirs, names) {
      for (var i in names) {
        var file = start + '/' + names[i];
        file = file.substr(base_path.length + 1);
        this.fs.copyTpl(
          base_path + '/' + file,
          this.destinationPath(file.replace(/__TEMPLATE__name__/g, this.name)),
          { name: this.name, description: this.description }
        );
      }
    }.bind(this));
  }
});
