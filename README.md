<p align="center"><img width="450" src="./assets/titanium-angular.png" /></p>

<h1 align="center">Titanium Angular</h1>

Use [Angular 6](https://angular.io/) to easily create native mobile apps with Axway Appcelerator Titanium.

> ⚠️ This platform is currently in an early beta stage. Expect things to be broken or APIs to change as this project matures. DO NOT USE IN PRODUCTION!

## Requirements

- [x] iOS or Android SDK installed
- [x] Latest Titanium SDK master (install via `appc ti sdk install -b master`)

## Getting started

You can checkout how Titanium Angular works by taking a look at the bundled example application.
To get started, run the following commands in the root of this project:

- `npm install`
- `node ./prepare.js`

After that, go to the example project in `ti-angular-example`. You can now build and run the app with `appc run -p [android|ios]`.

You can find more details in the [Titanium Angular Guide](https://docs.appcelerator.com/platform/latest/#!/guide/Titanium_and_Angular).

## Development Guide

This monorepo contains all packages that are required to build Titanium apps using Angular.

- [webpack-dev-titanium](packages/webpack-dev-titanium) - Various plugins for Webpack to help bundle Titanium Angular apps
- [titanium-angular](packages/titanium-angular) - Adds Titanium as a new platform to Angular

## Contributions

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator/titanium-angular/issues/new) first and submit a [pull request](https://github.com/appcelerator/titanium-angular/pulls/new) against master.

## Getting Help

If you have questions about the Angular platform on Titanium, feel free to reach out on Stackoverflow or the
`#titanium-angular` channel on [TiSlack](http://tislack.org). In case you find a bug, create a [new issue](/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache 2
