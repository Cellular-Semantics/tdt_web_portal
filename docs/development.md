# Project Deployment Guide

This project is Forked from https://github.com/vercel/nextjs-postgres-nextauth-tailwindcss-template

Technology stack:
- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Auth.js](https://authjs.dev)
- Database - [Postgres]
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

# GitHub Application

Follow these steps to create and configure the GitHub OAuth: https://authjs.dev/guides/configuring-github

# PostgeSQL

Run postgres:

```
docker run --name mypostgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres
```

Update `.env` file PostgreSQL configuration:

```
POSTGRES_URL=postgresql://username:password@localhost:5432/mydatabase
```

## pgAdmin

```
docker run --name mypgadmin -p 5050:80 -e 'PGADMIN_DEFAULT_EMAIL=your_email@.com' -e 'PGADMIN_DEFAULT_PASSWORD=your_password' -d dpage/pgadmin4
```

Navigate to http://localhost:5050

see: https://medium.com/@mateus2050/setting-up-postgresql-and-pgadmin-using-docker-on-macos-66cd7d275328

## Create DB

Create DB `tdt_db` using pgAdmin

Create tables and populate data:
- see [sql_taxonomies_insert.sql](/docs/sql_taxonomies_insert.sql)
- see [sql_user_taxonomies_insert.sql](/docs/sql_user_taxonomies_insert.sql)

# Install PNPM

Install pnpm with Node.js: https://pnpm.io/installation#on-posix-systems

```
source /Users/hk9/.zshrc
```

Install Node.js LTS version
```
pnpm env use --global lts
```

```
pnpm add drizzle-orm postgres
```

# Install & Run project

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.

# Deployment

## Docker Compose

```
docker-compose --env-file ./docker-compose.env up --build
```

use `--detach` to run containers in the background.

## Docker (tdt_web_portal only)

To build and deploy the docker image follow these steps:

```
docker build --no-cache -t tdt_portal .
```

```
docker run -p 3000:3000 -e POSTGRES_URL='postgresql://postgres:PASSWORD_HERE@host.docker.internal:5432/tdt_db' tdt_portal 
```