# Munich Task

## Description

Welcome to the README for Munich task project! This document provides an overview of the project's structure, guidelines for setting up and running the application, and key information for development.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
    - [Migrations](#migrations)
    - [Seeds](#seeds)
5. [Running the app](#running-the-app)
7. [Deployment](#deployment)

## Project Structure

Project is structured as follows:
We use [NestJS](https://nestjs.com/) as our framework.

```bash
munich_task/
├── dist/
├── node_modules/  
├── src/  
│ ├── constants/
│       ├── index.ts
│       ├── <constant>.constant.ts
│ ├── database/
│       ├── config/
│             ├── config.ts
│       ├── migrations/
│             ├── <migration>.ts
│       ├── models/
│             ├── index.ts
│             ├── base.model.ts
│             ├── <model>.model.ts
│       ├── repositories/
│             ├── index.ts
│             ├── base.repository.ts
│             ├── <repository>.repository.ts
│       ├── seeders/
│             ├── <seed>.ts
│       ├── database.config.ts
│       ├── database.module.ts
│ ├── enums/
│       ├── index.ts
│       ├── <enum>.enum.ts
│ ├── filters/
│       ├── index.ts
│       ├── http-exception.filter.ts
│ ├── interfaces/
│       ├── index.ts
│       ├── <interface>.interface.ts
│ ├── modules/
│       ├── products/
│             ├── dto/
│                   ├── <dto-name>.dto.ts
│             ├── entities/
│                   ├── <entity>.entity.ts
│             ├── products.controller.ts
│             ├── products.module.ts
│             ├── products.service.ts
│       ├── index.ts
│ ├── responses/
│       ├── index.ts
│       ├── <response>.response.ts
│ ├── swagger/
│       ├── entities/
│             ├── index.ts
│             ├── <entity>.entity.ts
│       ├── setup-swagger.ts
│ ├── utils/
│       ├── index.ts
│       ├── <util-name>.ts
│ ├── app.module.ts  
│ ├── main.ts  
├── .env 
├── .env.example
├── .eslintrc.js 
├── .gitignore  
├── .prettierrc  
├── .sequelizerc  
├── .nest-cli.json  
├── .package.json  
├── README.md
├── tsconfig.build.json  
├── tsconfig.json  
├── yarn.lock  
```

- `dist/`: Compiled JavaScript files.
- `node_modules/`: Node.js modules installed via npm.
- `src/`: This directory contains the main source code for application, including the entry point (`main.ts`) and various modules.
- `.env`: Environment variables and configuration settings.
- `.env.example`: Example environment variables and configuration settings.
- `.eslintrc.js`: ESLint configuration file.
- `.gitignore`: List of files and directories to be ignored by Git.
- `.prettierrc`: Prettier configuration file.
- `.sequelizerc`: Sequelize configuration file.
- `nest-cli.json`: Nest configuration file.
- `package.json`: Project metadata and dependencies.
- `README.md`: This document.
- `tsconfig.build.json`: TypeScript configuration file for building the project.
- `tsconfig.json`: TypeScript configuration file.
- `yarn.lock`: Lock file for Yarn.

## Getting Started

### Prerequisites

Before you start, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) 22.x
- [Yarn](https://yarnpkg.com/) 1.22.22
- [TypeScript](https://www.typescriptlang.org/)

### Installation

1. Clone this repository to your local machine:

   ```bash
   $ git clone https://github.com/hrachgalstyan/Munich_task.git
    ```

2. Navigate to the project directory:

   ```bash
   $ cd munich_task
   ```

3. Install the project dependencies:

   ```bash
   $ yarn
   ```

## Configuration

Modify environment variables in the `.env` file. You can use the `.env.example` file as a template.

```bash
$ cp .env.example .env
```

## Database Setup

We use MySQL as our database. You can set up the database using the following commands.

### Migrations

If you need to make changes to the database schema, you can use migrations. Migrations are located in the `src/database/migrations` directory.
You can set up the database and run migrations using the following commands:

```bash
# To create a new migration, use the following command:
$ yarn migration:create <migration-name>

# To run migrations use the following command:
$ yarn migration:run
   
# To undo last migration use the following command:
$ yarn migration:undo

# To undo all migrations use the following command:
$ yarn migration:undo:all
```

### Seeds

If you need to populate the database with data, you can use seeds. Seeds are located in the `src/seeds` directory.
You can set up the database and run seeds using the following commands:

```bash
# To run seeds use the following command:
$ yarn seed:run

# To undo last seed use the following command:
$ yarn seed:undo

# To undo all seeds use the following command:
$ yarn seed:undo:all
```

## Running the app

```bash
# production mode
$ yarn start

# watch mode
$ yarn start:dev
```

Your application will be available at http://localhost:5001.  
Your swagger documentation will be available at http://localhost:5001/docs.

## Deployment

1. To build the application, use the following command:

```bash
$ yarn build
```

