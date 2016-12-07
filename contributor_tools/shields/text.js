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

function getStatus(url) {
  return fetch(url)
  .then(
    response => response.json()
  ).then(function(info) {
    if (["unknown", "none", "invalid"].indexOf(info.value) > -1) {
      return '';
    }
    return info.value.replace(/\|/g, '/')
  })
}

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
    [
      repoMetadata.filter(
        ({ orgAndRepoSlug }) => orgAndRepoSlug.endsWith('android')
      ),
      repoMetadata.filter(
        ({ orgAndRepoSlug }) => orgAndRepoSlug.endsWith('swift') || orgAndRepoSlug.endsWith('objc')
      ),
      repoMetadata.filter(
        ({ orgAndRepoSlug }) => orgAndRepoSlug.endsWith('js')
      ),
      repoMetadata.filter(
        ({ orgAndRepoSlug }) => !orgAndRepoSlug.endsWith('swift') && !orgAndRepoSlug.endsWith('objc')
                                && !orgAndRepoSlug.endsWith('js') && !orgAndRepoSlug.endsWith('android')
      ),
    ]
  )
).then(
  ([ android, apple, js, misc ]) => (
    [
      android.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => [
          Promise.resolve(`[${ repoName }](https://github.com/${ orgAndRepoSlug }/)`),
          getStatus(`https://img.shields.io/travis/${ orgAndRepoSlug }/develop.json`),
          getStatus(`https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.json`),
          getStatus(`https://img.shields.io/github/release/${ orgAndRepoSlug }.json`),
          getStatus(`https://img.shields.io/github/issues/${ orgAndRepoSlug }.json`),
        ]
      ),
      apple.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => {
          const packageName = docsURL
            ? (/http:\/\/cocoadocs.org\/docsets\/(\w+)/.exec(docsURL) || []).pop()
            : console.warn(`${ orgAndRepoSlug } doesn't have homepage set correctly!`) || '';

          return [
            Promise.resolve(`[${ repoName }](https://github.com/${ orgAndRepoSlug })`),
            getStatus(`https://img.shields.io/travis/${ orgAndRepoSlug }/develop.json`),
            getStatus(`https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.json`),
            getStatus(`https://img.shields.io/cocoapods/v/${ packageName }.json`),
            getStatus(`https://img.shields.io/cocoapods/p/${ packageName }.json`),
            getStatus(`https://img.shields.io/cocoapods/metrics/doc-percent/${ packageName }.json`),
            getStatus(`https://img.shields.io/github/issues/${ orgAndRepoSlug }.json`),
          ]
        }
      ),
      js.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => {
          const packageName = orgAndRepoSlug.split('/').pop().replace('-js', '');

          return [
            Promise.resolve(`[${ repoName }](https://github.com/${ orgAndRepoSlug })`),
            getStatus(`https://img.shields.io/travis/${ orgAndRepoSlug }/develop.json`),
            getStatus(`https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.json`),
            getStatus(`https://img.shields.io/npm/v/${ packageName }.json`),
            getStatus(`https://img.shields.io/github/issues/${ orgAndRepoSlug }.json`),
          ]
        }
      ),
      misc.map(
        ({ orgAndRepoSlug, repoName, docsURL }) => [
          Promise.resolve(`[${ repoName }](https://github.com/${ orgAndRepoSlug }/)`),
          getStatus(`https://img.shields.io/travis/${ orgAndRepoSlug }/develop.json`),
          getStatus(`https://img.shields.io/codecov/c/github/${ orgAndRepoSlug }/develop.json`),
          getStatus(`https://img.shields.io/github/release/${ orgAndRepoSlug }.json`),
          getStatus(`https://img.shields.io/github/issues/${ orgAndRepoSlug }.json`),
        ]
      ),
    ]
  )
).then(
  tables => Promise.all(
    tables.map(
      table => Promise.all(
        table.map(
          row => Promise.all(row)
        )
      )
    )
  )
).then(
  ([ android, apple, js, misc ]) => `
## Android platform support

| Library | Build status | Coverage | Version | Issues |
|---------|:------------:|:--------:|:-------:|:------:|
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
