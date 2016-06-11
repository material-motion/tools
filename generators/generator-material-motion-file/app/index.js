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

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    return this.prompt([{
      type    : 'list',
      name    : 'type',
      message : 'Choose the type of file',
      choices : fs.readdirSync(this.sourceRoot())
    }, {
      type    : 'input',
      name    : 'name',
      message : 'File name'
    }]).then(function (answers) {
      this.type = answers.type;
      this.name = answers.name;
    }.bind(this));
  },

  writing: function () {
    var base_path = this.templatePath(this.type);
    var files = fs.readdirSync(base_path);
    for (var i in files) {
      var file = files[i];
      this.fs.copyTpl(
        base_path + '/' + file,
        this.destinationPath(file.replace('__TEMPLATE__name__', this.name)),
        { name: this.name }
      );
    }
  }
});
