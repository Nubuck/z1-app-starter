# Z1 App Starter

[Z1](https://www.npmjs.com/search?q=%40z1) is a software development ideology forged to promote unity, certainty and efficiency in the chaotically evolving and fragmented world of solution development, implemented in the wildest ecosystem of all: JavaScript.

This repository serves as an early access starter for [Z1](https://www.npmjs.com/search?q=%40z1) developers to accelerate application and [Z1 CORE](https://github.com/SaucecodeOfficial/zero-one-core) work.

Z1 Artwork courtesy of [Emile Esterhuyse](https://iota_16.artstation.com/)

## Getting Started

This repo contains a minimum running Z1 application on server and web platforms.

### Server

The server does not require any database details or further configuration as it implements [API Box Nedb](https://github.com/SaucecodeOfficial/zero-one-core/tree/master/libs/api-box-nedb) JSON file database as a flavor of [Feature Box Server](https://github.com/SaucecodeOfficial/zero-one-core/tree/master/libs/feature-box-server-nedb), the defacto lib for composable server platform apps.

From within this repo's ```server``` folder run:
```
yarn install && yarn start
```

This starts the Z1 API server on [http://localhost:3035/api](http://localhost:3035/api), while placing a static website in a ```site``` folder will host that static website on all URLs except for those that start with ```/api``` or configured application path.

Once ready to ship, simply run:
```
yarn build
```

This compiles the server application for production.

### Web

A bare bones [Z1 Feature Box](https://github.com/SaucecodeOfficial/zero-one-core/tree/master/libs/feature-box) web application powered by [Z1 State Box](https://github.com/SaucecodeOfficial/zero-one-core/tree/master/libs/state-box) and [Z1 UI Box for Tailwind](https://github.com/SaucecodeOfficial/zero-one-core/tree/master/libs/ui-box-tailwind) implementing macro command for the underlying [React](https://reactjs.org/) and [Redux](https://redux.js.org/) peer dependencies.

From within this repo's ```web``` folder run:
```
yarn install && yarn start
```

This starts a [Neutrino](https://neutrinojs.org/) React Web App development server on [http://localhost:5000](http://localhost:5000) with built in hot reloading and preconfigured to connect to the API server on [http://localhost:3035/api](http://localhost:3035/api).

Once ready to ship, simply run:
```
yarn build
```
Then drop the output of the ```lib``` folder into your server's ```site``` folder to host in production.

## Roadmap

While [Z1 Core](https://github.com/SaucecodeOfficial/zero-one-core) documentation is being completed this repo is due to be updated frequently.

Once Z1 is complete this repo will be moved to the upcoming Z1 GANG HQ.

Please open issues for discussion, but please be patient while documentation, guides and tooling are completed.


