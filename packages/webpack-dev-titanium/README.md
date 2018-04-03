# webpack-dev-titanium

> Webpack tools to build Titanium apps with Angular

## Overview

This package consinst of multiple plugins used to integrate Webpack into the Titanium build pipeline. Currently the main porpuse of this library is to:

* Create a new Titanium target based on the web target that replaces the JSON-P chunk loading process with requires.
* Wrap the Angular compiler plugin and decorate the internal virtual file system plugin so it supports loading of platform specific files.

There are other planned features that will be added to this repo as soon as Titanium Angular can utilitze them, such as:

* IPC communication with appc-daemon to support Webpack's watch mode.
* Support Webkit's hot module reloading to Live Sync changes directly into the running app during development.