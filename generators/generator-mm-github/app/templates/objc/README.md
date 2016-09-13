# <%= name %>

[![Build Status](https://travis-ci.org/<%= repoOwner %>/<%= repoName %>.svg?branch=develop)](https://travis-ci.org/<%= repoOwner %>/<%= repoName %>)
[![codecov](https://codecov.io/gh/<%= repoOwner %>/<%= repoName %>/branch/develop/graph/badge.svg)](https://codecov.io/gh/<%= repoOwner %>/<%= repoName %>)

## Installation

### Installation with CocoaPods

Add `<%= componentName %>` to your `Podfile`:

    pod '<%= componentName %>'

Then run the following command:

    pod install

## Example apps/unit tests

To check out a local copy of the repo and run our example apps you can run the following commands:

    git clone https://github.com/<%= repoOwner %>/<%= repoName %>.git
    cd <%= repoName %>
    pod install
    open <%= componentName %>.xcworkspace

## Contributing

We welcome contributions!

Check out our [upcoming milestones](https://github.com/<%= repoOwner %>/<%= repoName %>/milestones).

Learn more about [our team](https://material-motion.gitbooks.io/material-motion-team/content/),
[our community](https://material-motion.gitbooks.io/material-motion-team/content/community/), and
our [contributor essentials](https://material-motion.gitbooks.io/material-motion-team/content/essentials/).

## License

Licensed under the Apache 2.0 license. See LICENSE for details.
