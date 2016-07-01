# Writing code

This article defines the policies we expect implementations of the Starmap to follow.

## Branches

Primary development branch: **develop**

Primary stable branch: **stable**

Develop features locally on feature branches. Use `arc feature <name>` to start a new feature branch pointing at origin/develop. Do not push feature branches to GitHub, unless you're pushing to your own fork.

We will reserve branches in the primary repos for critical fixes and feature work.

## Versioning

Follow strict [semantic versioning](http://semver.org/).

tl;dr Major.minor.patch.

- If there is a breaking change in any way (i.e. a client has to take some action to upgrade), then the release is **Major**.
- If there are no breaking changes but there are new features, then the release is **minor**.
- Otherwise the release is a **patch** release.

Once you know what kind of release it is, increment the relevant number and set all following numbers to zero.

For example, if our last release was 12.5.0 and the next release introduces breaking changes, then the next release is 13.0.0.

We do **not** use our version numbers for marketing purposes. The numbers are strictly used to convey engineering information.

We will find alternative ways to communicate when a library is ready for production use.

## Cutting releases

Cut new releases every Wednesday. We want to automate as much of this as possible.

Every platform/language will have a different release process. We will formalize each one here as we begin to cut releases.

## Release-blocking clients

A release-blocking client has the power to stop a release.

Our release-blocking clients include:

- Google

Adding a release-blocking client is expensive and is done with great care.

Examples of how a client can block a release:

- We cut a release that we thought was minor, but is in fact major. We identify that it's major because when a release-blocking client upgrades to it, its builds break.

## Deprecation policy

There will come a time where we have to deprecate an API.

The process for this is:

- An API can be deleted from the code if at least one release has been cut in which the API was marked deprecated.
- An API can only be deleted once all release-blocking clients have moved off of the API.
- Remember: deprecate, then delete. It takes at least two releases to remove an API. The first such release is likely a minor release. The second such release is always a major release (because we're removing functionality).

## Addendum

For instructions on installing our yeoman generator, go to [Installing our tools](./essentials.md#installing-our-tools).