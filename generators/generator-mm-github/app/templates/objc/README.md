# <%= name %>

[![Build Status](https://travis-ci.org/<%= repoOwner %>/<%= repoName %>.svg?branch=develop)](https://travis-ci.org/<%= repoOwner %>/<%= repoName %>)
[![codecov](https://codecov.io/gh/<%= repoOwner %>/<%= repoName %>/branch/develop/graph/badge.svg)](https://codecov.io/gh/<%= repoOwner %>/<%= repoName %>)
[![CocoaPods Compatible](https://img.shields.io/cocoapods/v/MaterialMotion<%= componentName %>.svg)](https://cocoapods.org/pods/MaterialMotion<%= componentName %>)
[![Platform](https://img.shields.io/cocoapods/p/MaterialMotion<%= componentName %>.svg)](http://cocoadocs.org/docsets/MaterialMotion<%= componentName %>)
[![Docs](https://img.shields.io/cocoapods/metrics/doc-percent/MaterialMotion<%= componentName %>.svg)](http://cocoadocs.org/docsets/MaterialMotion<%= componentName %>)

## Installation

### Installation with CocoaPods

> CocoaPods is a dependency manager for Objective-C and Swift libraries. CocoaPods automates the
> process of using third-party libraries in your projects. See
> [the Getting Started guide](https://guides.cocoapods.org/using/getting-started.html) for more
> information. You can install it with the following command:
>
>     gem install cocoapods

Add `MaterialMotion<%= componentName %>` to your `Podfile`:

    pod 'MaterialMotion<%= componentName %>'

Then run the following command:

    pod install

### Usage

Import the framework:

    @import MaterialMotion<%= componentName %>;

You will now have access to all of the APIs.

## Example apps/unit tests

Check out a local copy of the repo to access the Catalog application by running the following
commands:

    git clone https://github.com/<%= repoOwner %>/<%= repoName %>.git
    cd <%= repoName %>
    pod install
    open MaterialMotion<%= componentName %>.xcworkspace

## Guides

1. [Architecture](#architecture)
2. [How to ...](#how-to-...)

### Architecture

### How to ...

## Contributing

We welcome contributions!

Check out our [upcoming milestones](https://github.com/<%= repoOwner %>/<%= repoName %>/milestones).

Learn more about [our team](https://material-motion.github.io/material-motion/team/),
[our community](https://material-motion.github.io/material-motion/team/community/), and
our [contributor essentials](https://material-motion.github.io/material-motion/team/essentials/).

## License

Licensed under the Apache 2.0 license. See LICENSE for details.
