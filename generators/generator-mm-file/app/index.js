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
var _ = require('lodash');

var optionOrPrompt = function(prompts, callback) {
  // This method will only show prompts that haven't been supplied as options. This makes the generator more composable.
  var filteredPrompts = [];
  var props = {};

  prompts.forEach(function(prompt) {
    this.option(prompt.name);
    var option = this.options[prompt.name];

    if (option !== undefined) {
      // Options supplied, add to props
      props[prompt.name] = option;
    } else {
      // No option supplied, user will be prompted
      filteredPrompts.push(prompt);
    }
  }, this);

  if (filteredPrompts.length) {
    this.prompt(filteredPrompts).then(function(mergeProps) {
      // Merge mergeProps into props/
      _.assign(props, mergeProps);
      callback && callback(props);
    });
  } else {
    // No prompting required call the callback right away.
    callback && callback(props);
  }
}

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  _optionOrPrompt: optionOrPrompt,

  prompting: function () {
    var done = this.async();
    return this._optionOrPrompt([{
      type    : 'list',
      name    : 'type',
      message : 'Choose the type of file',
      choices : fs.readdirSync(this.sourceRoot())
    }, {
      type    : 'input',
      name    : 'name',
      message : 'File name'
    }], function (answers) {
      this.type = answers.type;
      this.name = answers.name;
      done();
    }.bind(this));
  },

  writing: function () {
    var base_path = this.templatePath(this.type);
    var files = fs.readdirSync(base_path);
    console.log(this.name);
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
