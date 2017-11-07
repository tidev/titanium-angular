# Titanium Angular Platform

> Build cross-platform apps using Titanium and Angular

## Introduction

Adds a new platform to Angular allowing you to easily create native mobile apps with Axway Appcelerator Titanium.

> ⚠️ This platform is currently in an early alpha stage. Expect things to be broken or APIs to change as this project matures. DO NOT USE IN PRODUCTION!

## Getting started

Until the proper build pipeline is in place you can try the bundled example app. Make sure to run all commands from inside `ti-angular-example/app`;

> ⚠️ The example app currently only runs on iOS and requires a special build of SDK 7.0.0 which is available [here](https://jenkins.appcelerator.org/blue/organizations/jenkins/titanium-sdk%2Ftitanium_mobile/detail/PR-9552/4/artifacts).

- Install dependencies with `npm i`
- Build and start the app using `npm run ios`

## Developmet guide

This monorepo contains all packages that are required to build Titanium apps using Angular.

- [ti.angular](packages/ti.angular) - CLI hooks for the build pipeline (not implemented yet)
- [titanium-angular](packages/titanium-angular) - Adds Titanium as a new platform to Angular
- [types-titanium](packages/types-titanium) - Contains TypeScript definitions for the global `Ti` variable. Currently only defined as `any` for convenince.

