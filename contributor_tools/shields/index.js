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
    }
  )
).then(
  ({ android, js, apple }) => (
    {
      android: android.map(
        ({ orgAndRepoSlug, docsURL }) => [
          `[${ orgAndRepoSlug }](https://github.com/${ orgAndRepoSlug }/)`,
          `[![Build Status](https://travis-ci.org/${ orgAndRepoSlug }.svg?branch=develop)](https://travis-ci.org/${ orgAndRepoSlug }/)`,
          `[![codecov](https://codecov.io/gh/${ orgAndRepoSlug }/branch/develop/graph/badge.svg)](https://codecov.io/gh/${ orgAndRepoSlug }/)`,
          `[![Release](https://img.shields.io/github/release/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/releases/latest/)`,
          `[![Docs](https://img.shields.io/badge/jitpack-docs-green.svg)](${ docsURL })`,
          `[![Open issues](https://img.shields.io/github/issues/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/issues/)`,
        ]
      ),
      js: js.map(
        ({ orgAndRepoSlug, docsURL }) => {
          const packageName = orgAndRepoSlug.split('/').pop().replace('-js', '');

          return [
            `[${ orgAndRepoSlug }](https://github.com/${ orgAndRepoSlug })`,
            `[![Build Status](https://travis-ci.org/${ orgAndRepoSlug }.svg?branch=develop)](https://travis-ci.org/${ orgAndRepoSlug }/)`,
            `[![codecov](https://codecov.io/gh/${ orgAndRepoSlug }/branch/develop/graph/badge.svg)](https://codecov.io/gh/${ orgAndRepoSlug }/)`,
            `[![Release](https://img.shields.io/npm/v/${ packageName }.svg)](https://www.npmjs.com/package/${ packageName }/)`,
            `[![Open issues](https://img.shields.io/github/issues/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/issues/)`,
          ]
        }
      ),
      apple: apple.map(
        ({ orgAndRepoSlug, docsURL }) => {
          const packageName = docsURL
            ? (/http:\/\/cocoadocs.org\/docsets\/(\w+)/.exec(docsURL) || []).pop()
            : console.warn(`${ orgAndRepoSlug } doesn't have homepage set correctly!`) || '';

          return [
            `[${ orgAndRepoSlug }](https://github.com/${ orgAndRepoSlug })`,
            `[![Build Status](https://travis-ci.org/${ orgAndRepoSlug }.svg?branch=develop)](https://travis-ci.org/${ orgAndRepoSlug }/)`,
            `[![codecov](https://codecov.io/gh/${ orgAndRepoSlug }/branch/develop/graph/badge.svg)](https://codecov.io/gh/${ orgAndRepoSlug }/)`,
            `[![CocoaPods Compatible](https://img.shields.io/cocoapods/v/${ packageName }.svg)](https://cocoapods.org/pods/${ packageName }/)`,
            `[![Platform](https://img.shields.io/cocoapods/p/${ packageName }.svg)](http://cocoadocs.org/docsets/${ packageName })`,
            `[![Docs](https://img.shields.io/cocoapods/metrics/doc-percent/${ packageName }.svg)](${ docsURL })`,
            `[![Open issues](https://img.shields.io/github/issues/${ orgAndRepoSlug }.svg)](https://github.com/${ orgAndRepoSlug }/issues/)`,
          ]
        }
      ),
    }
  )
).then(
  ({ apple, android, js }) => `
## Apple platform support
| Library | Build status | Coverage | Version | Platforms | Docs | Issues |
|---------|:------------:|:--------:|:-------:|:---------:|:----:|:------:|
${ apple.map(repo => `| ${ repo.join(' | ') } |`).join('\n') }

## Android platform support


| Library | Build status | Coverage | Version | Docs | Issues |
|---------|:------------:|:--------:|:-------:|:----:|:------:|
${ android.map(repo => `| ${ repo.join(' | ') } |`).join('\n') }

## Web platform support

| Library | Build status | Coverage | Version | Issues |
|---------|:------------:|:--------:|:-------:|:------:|
${ js.map(repo => `| ${ repo.join(' | ') } |`).join('\n') }
`
).then(console.log)
