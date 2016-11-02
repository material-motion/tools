# <%= name %>

[![Build Status](https://travis-ci.org/<%= repoOwner %>/<%= repoName %>.svg?branch=develop)](https://travis-ci.org/<%= repoOwner %>/<%= repoName %>)
[![codecov](https://codecov.io/gh/<%= repoOwner %>/<%= repoName %>/branch/develop/graph/badge.svg)](https://codecov.io/gh/<%= repoOwner %>/<%= repoName %>)

The <%= name %> repo.

Learn more about the APIs defined in the library by reading our
[technical documentation](https://jitpack.io/com/github/<%= repoOwner %>/<%= repoName %>/1.0.0/javadoc/) and our
[Starmap](https://material-motion.gitbooks.io/material-motion-starmap/content/specifications/runtime/).

## Installation

### Installation with Jitpack

Add the Jitpack repository to your project's `build.gradle`:

```gradle
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
    }
}
```

Depend on the [latest version](https://github.com/<%= repoOwner %>/<%= repoName %>/releases) of the library.
Take care to occasionally [check for updates](https://github.com/ben-manes/gradle-versions-plugin).

```gradle
dependencies {
    compile 'com.github.<%= repoOwner %>:<%= repoName %>:1.0.0'
}
```

For more information regarding versioning, see:

- [Material Motion Versioning Policies](https://material-motion.gitbooks.io/material-motion-team/content/essentials/core_team_contributors/release_process.html#versioning)

### Using the files from a folder local to the machine

You can have a copy of this library with local changes and test it in tandem
with its client project. To add a local dependency on this library, add this
library's identifier to your project's `local.dependencies`:

```
com.github.<%= repoOwner %>:<%= repoName %>
```

> Because `local.dependencies` is never to be checked into Version Control
Systems, you must also ensure that any local dependencies are also defined in
`build.gradle` as explained in the previous section.

**Important**

For each local dependency listed, you *must* run `gradle install` from its
project root every time you make a change to it. That command will publish your
latest changes to the local maven repository. If your local dependencies have
local dependencies of their own, you must `gradle install` them as well. See
[Issue #16](https://github.com/material-motion/material-motion-runtime-android/issues/16).

You must `gradle clean` your project every time you add or remove a local
dependency.

### Usage

How to use the library in your project.

#### Editing the library in Android Studio

Open Android Studio,
choose `File > New > Import`,
choose the root `build.gradle` file.

## Example apps/unit tests

To build the sample application, run the following commands:

    git clone https://github.com/<%= repoOwner %>/<%= repoName %>.git
    cd <%= repoName %>
    gradle installDebug

To run all unit tests, run the following commands:

    git clone https://github.com/<%= repoOwner %>/<%= repoName %>.git
    cd <%= repoName %>
    gradle test

## Guides

1. [Architecture](#architecture)
2. [How to ...](#how-to-...)

### Architecture

### How to ...

## Contributing

We welcome contributions!

Check out our [upcoming milestones](https://github.com/<%= repoOwner %>/<%= repoName %>/milestones).

Learn more about [our team](https://material-motion.gitbooks.io/material-motion-team/content/),
[our community](https://material-motion.gitbooks.io/material-motion-team/content/community/),
and our [contributor essentials](https://material-motion.gitbooks.io/material-motion-team/content/essentials/).

## License

Licensed under the Apache 2.0 license. See LICENSE for details.
