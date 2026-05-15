# Node.js Monolithic Boilerplate

A production-minded Node.js **modular monolith** API boilerplate.

It is still one application and one deployment unit, but the code is organized by feature modules so the project can grow without becoming a single huge folder.

## Stack

- Node.js
- TypeScript
- Express 5
- Zod validation
- Pino logging
- Helmet, CORS, compression
- Vitest + Supertest
- Docker-ready

## Structure

```txt
src/
  app.ts
  server.ts
  config/
  errors/
  middleware/
  modules/
    health/
    users/
  routes/
  utils/
  types/
test/
```

## Install

```bash
npm install
cp .env.example .env
```

## Development

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
http://localhost:3000/health
```

## Test

```bash
npm test
```

## Type-check

```bash
npm run typecheck
```

## Build

```bash
npm run build
npm start
```

## Docker

```bash
docker compose up --build
```

## API examples

### Health

```bash
curl http://localhost:3000/health
```

### Create user

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "content-type: application/json" \
  -d '{"name":"Ada Lovelace","email":"ada@example.com"}'
```

### List users

```bash
curl http://localhost:3000/api/v1/users
```

## Environment variables

See `.env.example`.

Never commit `.env` or secret values. For production, set environment variables in your deployment platform.

## How to add a new feature module

Create:

```txt
src/modules/products/
  product.schema.ts
  product.repository.ts
  product.service.ts
  product.controller.ts
  product.routes.ts
```

Then mount it in:

```txt
src/routes/index.ts
```

## Notes

This starter uses an in-memory user repository so it works immediately after `npm install`.

For a real app, replace `user.repository.ts` with a database-backed implementation using PostgreSQL, Prisma, Drizzle, Kysely, or another data layer.
