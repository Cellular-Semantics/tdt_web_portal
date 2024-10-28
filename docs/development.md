# Project Deployment Guide

This project is Forked from https://github.com/vercel/nextjs-postgres-nextauth-tailwindcss-template

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

then create user table:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  username VARCHAR(255)
);
```

```
CREATE TYPE status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  available_at TIMESTAMP NOT NULL
);
```


Create tables and insert data:
- see sql_taxonomies_insert.sql
- see sql_user_taxonomies_insert.sql

http://localhost:3000/api/seed

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