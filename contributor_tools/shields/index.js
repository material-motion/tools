/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

const fetch = require('isomorphic-fetch');

fetch(
  'https://api.github.com/orgs/material-motion/repos?per_page=100'
).then(
  response => response.json()
).then(
  repos => repos.map(
    repo => (
      {
        orgAndRepoSlug: repo.full_name,
        repoName: repo.name,
        docsURL: repo.homepage,
      }
    )
  )
).then(
  repoMetadata => (
    {
      android: repoMetadata.filter(
        ({ orgAndRepoSlug }) => orgAndRepoSlug.endsWith('android')
      ),
      js: repoMetadata.filter(
        ({ orgAndRepoSlug }) => orgAndRepoSlug.endsWith('js')
      ),
      apple: repoMetadata.filter(
        ({ orgAndRepoSlug }) => orgAndRepoSlug.endsWith('swift') || orgAndRepoSlug.endsWith('objc')
      ),
      misc: repoMetadata.filter(
        ({ orgAndRepoSlug }) => !orgAndRepoSlug.endsWith('swift') && !orgAndRepoSlug.endsWith('objc')
                                && !orgAndRepoSlug.endsWith('js') && !orgAndRepoSlug.endsWith('android')
      ),
    }
  )
).then(
  ({ android, js, apple, misc }) => (
    {
      android: android.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => [
          `[${ repoName }](https://github.com/${ orgAndRepoSlug }/)`,
          `[![Build Status](https://img.shields.io/travis/${ orgAndRepoSlug }/develop.svg)](https://travis-ci.org/${ orgAndRepoSlug }/)`,
          `[![codecov](https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.svg)](https://codecov.io/gh/${ orgAndRepoSlug }/)`,
          `[![Release](https://img.shields.io/github/release/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/releases/latest/)`,
          `[![Docs](https://img.shields.io/badge/jitpack-docs-green.svg)](${ docsURL })`,
          `[![Open issues](https://img.shields.io/github/issues/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/issues/)`,
        ]
      ),
      js: js.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => {
          const packageName = orgAndRepoSlug.split('/').pop().replace('-js', '');

          return [
            `[${ repoName }](https://github.com/${ orgAndRepoSlug })`,
            `[![Build Status](https://img.shields.io/travis/${ orgAndRepoSlug }/develop.svg)](https://travis-ci.org/${ orgAndRepoSlug }/)`,
            `[![codecov](https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.svg)](https://codecov.io/gh/${ orgAndRepoSlug }/)`,
            `[![Release](https://img.shields.io/npm/v/${ packageName }.svg)](https://www.npmjs.com/package/${ packageName }/)`,
            `[![Open issues](https://img.shields.io/github/issues/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/issues/)`,
          ]
        }
      ),
      apple: apple.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => {
          const packageName = docsURL
            ? (/http:\/\/cocoadocs.org\/docsets\/(\w+)/.exec(docsURL) || []).pop()
            : console.warn(`${ orgAndRepoSlug } doesn't have homepage set correctly!`) || '';

          return [
            `[${ repoName }](https://github.com/${ orgAndRepoSlug })`,
            `[![Build Status](https://img.shields.io/travis/${ orgAndRepoSlug }/develop.svg)](https://travis-ci.org/${ orgAndRepoSlug }/)`,
            `[![codecov](https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.svg)](https://codecov.io/gh/${ orgAndRepoSlug }/)`,
            `[![CocoaPods Compatible](https://img.shields.io/cocoapods/v/${ packageName }.svg)](https://cocoapods.org/pods/${ packageName }/)`,
            `[![Platform](https://img.shields.io/cocoapods/p/${ packageName }.svg)](http://cocoadocs.org/docsets/${ packageName })`,
            `[![Docs](https://img.shields.io/cocoapods/metrics/doc-percent/${ packageName }.svg)](${ docsURL })`,
            `[![Open issues](https://img.shields.io/github/issues/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/issues/)`,
          ]
        }
      ),
      misc: misc.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => [
          `[${ repoName }](https://github.com/${ orgAndRepoSlug }/)`,
          `[![Build Status](https://img.shields.io/travis/${ orgAndRepoSlug }/develop.svg)](https://travis-ci.org/${ orgAndRepoSlug }/)`,
          `[![codecov](https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.svg)](https://codecov.io/gh/${ orgAndRepoSlug }/)`,
          `[![Release](https://img.shields.io/github/release/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/releases/latest/)`,
          `[![Open issues](https://img.shields.io/github/issues/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/issues/)`,
        ]
      ),
    }
  )
).then(
  ({ apple, android, js, misc }) => `
## Android platform support

| Library | Build status | Coverage | Version | Docs | Issues |
|---------|:------------:|:--------:|:-------:|:----:|:------:|
${ android.map(repo => `| ${ repo.join(' | ') } |`).sort().join('\n') }

## Apple platform support

| Library | Build status | Coverage | Version | Platforms | Docs | Issues |
|---------|:------------:|:--------:|:-------:|:---------:|:----:|:------:|
${ apple.map(repo => `| ${ repo.join(' | ') } |`).sort().join('\n') }

## Web platform support

| Library | Build status | Coverage | Version | Issues |
|---------|:------------:|:--------:|:-------:|:------:|
${ js.map(repo => `| ${ repo.join(' | ') } |`).sort().join('\n') }

## Misc libraries

| Library | Build status | Coverage | Version | Issues |
|---------|:------------:|:--------:|:-------:|:------:|
${ misc.map(repo => `| ${ repo.join(' | ') } |`).sort().join('\n') }

`
).then(console.log)
