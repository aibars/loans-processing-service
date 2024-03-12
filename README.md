<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

In case you don't want to use docker, you should run one of the following commands locally: 

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Docker

To run the container, first ensure that Docker is installed in your environment, then run:

`docker-compose up`

This will start the database along with the application to avoid installing a local PostgreSQL server.

Since the application uses TypeORM as the ORM, it should populate the database automatically by running the existing migrations in the codebase

## Consuming API Service with Postman

### Overview

This guide provides the steps to consume the API service using (for example) Postman.

### Prerequisites

- **Postman**: Ensure you have Postman installed on your system. If not, download and install it from [Postman's official website](https://www.postman.com/downloads/).

### Steps

1. Make sure that you have a valid JWT to make requests to the app. For that, you need to first register a new user by hitting the method:

    `/swagger#/default/UsersController_register`

    Alternatively, you could log in if you have an existing user in the database by calling the Log In Method

2. Make any of the other requests by selecting the `Bearer` auth method and populating it with the previously obtained token. Bear in mind that it has a validity period of one hour. So if it gets expired you'll have to generate a new one. 

### Tips

- **Organize Requests**: Group similar requests into folders within the Postman collection for better organization and clarity.
  
- **Use Variables**: Utilize Postman variables to store dynamic values such as authentication tokens, response data, or environment-specific values.
  
- **Explore Postman Features**: Postman offers various features like pre-request scripts, tests, and mock servers. Explore these features to enhance your API testing and development workflow.

### Conclusion

By following these steps, you can effectively consume API services using Postman, streamlining the testing and integration process.

## License

Nest is [MIT licensed](LICENSE).
