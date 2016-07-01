# Release process

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
