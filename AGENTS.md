# Agent instructions

This is a Node.js TypeScript modular monolith.

## Rules

- Keep the app as one deployable service.
- Add new features under `src/modules/<feature>`.
- Keep controllers thin.
- Put business logic in services.
- Put persistence logic in repositories.
- Validate request input with Zod schemas.
- Return consistent JSON responses:
  - success: `{ "ok": true, "data": ... }`
  - error: `{ "ok": false, "error": { "code": "...", "message": "..." } }`
- Do not log secrets.
- Run `npm run check` before finishing changes.
