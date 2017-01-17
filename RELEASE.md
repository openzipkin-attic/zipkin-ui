# Zipkin UI Release Process

This repo uses semantic versions. Please keep this in mind when choosing version numbers.

1. **Alert others you are releasing**

   There should be no commits made to master while the release is in progress (about 10 minutes). Before you start
   a release, alert others on [gitter](https://gitter.im/openzipkin/zipkin) so that they don't accidentally merge
   anything. If they do, and the build fails because of that, you'll have to recreate the release tag described below.

1. **Push a git tag**

   The tag should be of the format `release-N.M.L`, for example `release-1.0.0`.

1. **Wait for CircleCI**

   This part is controlled by [`build-support/publish-stable.sh`](build-support/publish-stable.sh). It creates a bunch of new commits, bumps
   the version, publishes artifacts, and syncs to Maven Central. https://circleci.com/gh/openzipkin/zipkin-ui

## Credentials

Credentials of various kind are needed for the release process to work. If you notice something
failing due to unauthorized, re-save them as [environment variables](https://circleci.com/gh/openzipkin/zipkin-ui/edit#env-vars).

