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
    npm run migrate:make -- MIGRATION_NAME
    ```
1.  The migration command will generate a new file at the <root>/knex/migrations path. Filename will be a timestamp followed by the name of your migration.
1.  Documentation can be found here: http://knexjs.org/#Migrations-CLI
