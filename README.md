# Cuboids

## Installation:

### Install Node Version:

Node Version Manager (`nvm`) is used to synchronize the version of node. If you don't have nvm installed, follow the readme [here](https://github.com/nvm-sh/nvm#installation-and-update). 

An `.nvmrc` file has been included so all you need to do to is:
```shell script
nvm install
```

This will install the correct Node runtime.

### Create .env

Copy `.env.example` to a new file called `.env` at the root of the project. These variables are loaded into the app as environment variables.
```shell script
cp .env.example .env
```

## Creating migrations

For database DDL changes we are using migrations via Knex CLI.

1.  Navigate to the root path of the project.
1.  Run the following command with a proper MIGRATION_NAME:
    ```shell script
    npm run db:migrate:make -- MIGRATION_NAME
    ```
1.  The migration command will generate a new file at the <root>/knex/migrations path. Filename will be a timestamp followed by the name of your migration.
1.  Documentation can be found here: http://knexjs.org/#Migrations-CLI

## Challenge

This API manages bags and cuboids. A cuboid is a three-dimensional rectangular box. Each face of a cuboid is a 
rectangle and adjacent faces meet at right angles. A cube is a cuboid with equal dimensions. A cuboid has a 
volume that is straightforward to calculate.

A bag is a malleable container with adjustable dimensions, but a fixed volume. The bag can expand to hold any 
shape or combination of shapes, but the volume of the bag is limited and cannot expand. In our model a bag 
has many cuboids. 

This app has a complete test suite but is missing some functionality. Because of this the test suite is failing.
Your task is to get the test suite to pass without modifying any of the test files. In other words, you need to
add the missing functionality so that the tests pass. 

You should also take note of the linter and prettier. The linter is currently passing and must pass on completion
of the challenge, without any modifications to the config. 

### Steps

To participate in this challenge take the following steps:

1. Clone this repository.
1. Checkout a branch named with your name as `first-last`.
1. Setup the app and get it running. Verify that the linter passes and the test suite fails.
1. Add the missing functionality.
1. Commit as appropriate as you complete the challenge. (More than one commit is expected)
1. Push your committed changes on your branch. 
1. Create a pull request to the master branch.
1. Send the link to your pull request to signify the completion of the challenge. 

