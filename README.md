# SayAnonymous

A campus conversation prototype built with React, Express, and a persistent local SQLite database. Share thoughts under a public nickname, browse topics, save posts, and leave replies.

## Start locally

Requires **Node.js 24+** and npm. No database server, cloud account, or environment file is required for local use.

```sh
npm install
npm run dev
```

Open **http://127.0.0.1:5173**. The API listens on **127.0.0.1:5050**. Both ports must be available. In VS Code, `Terminal → Run Task → Start SayAnonymous` runs the same command.

Use **Take a look around**, or **Log in → Try the demo**, for a separate demo identity. You can also register an account with an email and password. Email and campus membership are not verified in this prototype. On mobile, open your avatar in the top bar to edit your profile or log out.

The first startup adds eight sample conversations. Posts, accounts, and interactions persist across restarts in `backend/data/sayanonymous.sqlite`. Each demo entry creates a separate account; signing out and starting another demo creates a new identity. The session lasts seven days. Keep the data directory to preserve local accounts and sessions.

The frontend updates when files change. Restart `npm run dev` after backend changes. Press Ctrl+C to stop both services.

## What works

- Public latest and most-loved feeds; topic filters, search, and pagination.
- Account registration, sign-in, sign-out, and separate demo identities.
- Thoughts with an optional JPG, PNG, GIF, or WebP image (maximum 5 MB).
- Likes, private saved thoughts, replies, and owner-only edits/deletes.
- Public nickname and avatar changes, personal activity counts, and notifications.
- Private local reports with a clear notice that there is no live moderation team.
- Mobile navigation, accessible labels, keyboard focus, loading/error/empty states.

## Verify and build

```sh
npm test
npm run build
npm start
```

The 23 integration tests use a temporary database and local test server. They do not change the demo community. After building, `npm start` serves the built app and API together at **http://127.0.0.1:5050**. `npm run dev` remains the recommended editing workflow.

## Configuration

Optional settings are documented in `backend/.env.example`. Copy it to `backend/.env` if you want to change the port or database path. If the API port changes, also update the proxy in `frontend/vite.config.js`.

Local sessions use a generated, ignored signing secret in `backend/data/.session-secret`. Production mode requires `JWT_SECRET` of at least 32 characters, disables demo entry and sample seeding, and uses Secure cookies. Public hosting also needs HTTPS and the deployment work listed in [docs/PROTOTYPE_REVIEW.md](docs/PROTOTYPE_REVIEW.md).

This is a local prototype, not an anonymous communication guarantee. Public nicknames link a person's posts and replies, and the server stores account email and content. Avoid putting real personal details into a demo.

## Code map

- `frontend/src/prototype/`: active React interface and API helper.
- `frontend/src/main.jsx`: Vite entry point; `App.js` selects the active interface.
- `backend/app.js`: application, session, request limits, headers, static hosting.
- `backend/controller/`, `backend/routes/`: core API handlers.
- `backend/lib/feed.js`: shared feed query and pagination.
- `backend/schema.sql`, `db.js`, `seed.js`: local database and sample content.
- `backend/test/prototype.test.js`: real HTTP integration tests.

The older React screens remain in `frontend/src/pages/` and `frontend/src/components/` as reference material. They are not mounted by the prototype and their old hard-coded API addresses should not be copied into new screens. The original MySQL schema was not included in the repository; this branch supplies a fresh SQLite schema and does not migrate a previous MySQL database.

See [the review and next priorities](docs/PROTOTYPE_REVIEW.md) for the original blockers and the path to a public pilot.
