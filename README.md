# Titanium Angular Platform

> Build cross-platform apps using Titanium and Angular

## Introduction

Adds a new platform to Angular allowing you to easily create native mobile apps with Axway Appcelerator Titanium.

> ⚠️ This platform is currently in an early alpha stage. Expect things to be broken or APIs to change as this project matures. DO NOT USE IN PRODUCTION!

## Getting started

You can checkout how Titanium Angular works by taking a look at the bundled example application. To get started, first navigate to `ti-angular-example/app` and install the required dependencies with `npm i`. After that, go back to the project root. You can now build and run the app with `appc run -p [android|ios]`.

> ⚠️ The example app currently only runs on Android and iOS and requires the latest SDK from our master branch. You can install the latest master build via `appc ti sdk install -b master`.

## Developmet guide

This monorepo contains all packages that are required to build Titanium apps using Angular.

- [webpack-dev-titanium](packages/webpack-dev-titnaium) - Various plugins for Webpack to help bundle Titanium Angular apps
- [titanium-angular](packages/titanium-angular) - Adds Titanium as a new platform to Angular
- [types-titanium](packages/types-titanium) - Contains TypeScript definitions for the global `Ti` variable. This is not complete yet. You are welcomed to file a PR with additional definitions.

