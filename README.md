<img src="https://raw.githubusercontent.com/fullstacklabs/toy-blocks/master/FSL-logo-portrait.png" alt="FullStack Labs" align="center" />

<br />

# Cuboids

## Challenge

This API manages bags and cuboids. A cuboid is a three-dimensional rectangular box. Each face of a cuboid is a 
rectangle and adjacent faces meet at right angles. A cube is a cuboid with equal dimensions. A cuboid has a 
volume that is straightforward to calculate.

A bag is a malleable container with adjustable dimensions, but a fixed volume. The bag can expand to hold any 
shape or combination of shapes, but the volume of the bag is limited and cannot expand. In our model a bag 
has many cuboids. 

This app has an almost complete test suite.

The tests to update and delete a cuboid are incomplete, your task is to improve them.

The other tests are valid and you must not modify them. In other words, you need to add the missing functionalities so that these tests pass.

You should also take note of the linter and prettier. The linter is currently passing and must pass on completion
of the challenge, without any modifications to the config. 

**Note**: The only tests to be modified are tests to update and delete a cuboid. All other tests must remain unchanged.

### Steps

To participate in this challenge take the following steps:

1. Clone this repository.
1. Create a private repository of the same name in your personal GitHub account. (Do not fork)
1. Add a second remote to your local copy of this repository and push the master branch.
1. Checkout a feature branch where you will make your changes.
1. Setup the app and get it running. Verify that the linter passes and the test suite fails.
1. Implement tests to update and delete a cuboid.
1. Add missing functionalities so the other tests pass. Do NOT modify these tests.
1. Commit as appropriate as you complete the challenge. (More than one commit is expected)
1. Push your committed changes to your repository on your feature branch. 
1. Create a pull request to the master branch on your repository.
1. Invite @bencarle and @mfpiccolo to your private repository.
1. Send the link to your pull request to signify the completion of the challenge. 

## Technology

This app uses the following key technologies:

- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Objection.js](https://vincit.github.io/objection.js/)
- [Knex.js](http://knexjs.org/)
- [Jest](https://jestjs.io/)


## Setup

Use `nvm` to install the correct version of node:
```shell script
nvm install
```

Copy `.env.example` to `.env`.
```shell script
cp .env.example .env
```

Install packages.
```shell script
npm install
```

## Usage

Run the app.
```shell script
npm run dev
```

Run the linter.
```shell script
npm run lint
```

Run the tests.
```shell script
npm test
```
