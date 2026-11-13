# SayAnonymous review and prototype

Reviewed from GitHub commit `36d5260` (14 August 2024). Changes are on local branch `prototype/local-demo`.

## The biggest problems in the original repository

| Finding | Effect | Prototype change |
| --- | --- | --- |
| No database schema or setup, no backend start script, and no lockfile | A fresh checkout could not reproduce a working installation. | Added an automatic SQLite schema, sample community, npm workspaces, one-command startup, and a lockfile for reproducible installs. |
| Home requested `/api/home` but only `/home/new` and `/home/top` were registered; empty feeds never sent a response | Broken landing feed and indefinite loading for new communities. | Added the default route and shared queries that always return an array. |
| Comment edit/delete queries did not check the author | One signed-in user could change another user's replies. | Enforced ownership for comments, posts, and notifications, with two-account integration tests. |
| Search selected both `p.*` and `u.id`, and used the author as the viewer for saved/liked state | Search could return the wrong post ID and the wrong user's interaction state. | Reused the shared feed query with the current viewer and explicit public serialization. |
| Upload limits were configured on an unused uploader | The actual upload route accepted unbounded files. | Enforced 5 MB, one image, generated filenames, type and signature checks, and controlled errors. |
| Hard-coded localhost addresses and duplicated React screens | Hard to deploy and easy for screens to drift. | Added a single relative API helper, Vite proxy, and a focused active interface. |
| Stats, suggestions, notifications, and XP contained wrong parameters or broken handlers | Several secondary features failed or returned misleading data. | Replaced the mounted handlers with bounded queries; XP is awarded only by internal post/reply actions. |
| Indefinite JWTs stored by the browser, no input limits, and unrestricted cross-origin access | Weak defaults for an identity-sensitive community. | Added expiring HttpOnly/SameSite cookies, validation, rate limits, security headers, and origin checks. |

## Product improvements in this version

The common room now starts with real examples and a separate demo identity for each visitor. Posting, replying, saving, and updating a nickname form one coherent journey. Counts come from the database; sample content is labelled as a demo community. The app explains that a nickname is public and that email and campus membership are not verified.

The original character artwork is reused in a softer interface. Desktop has a topic rail and mobile has bottom navigation plus a profile shortcut. Reports are recorded privately, and the interface explicitly states that there is no live moderation team.

## Next priorities for a public pilot

1. **Choose one initial community and verify access.** For an NUS pilot, add email verification and decide whether anyone can read posts or only verified campus members. The current feed and uploads are public to anyone who can reach the local server. Add account recovery and deletion/export flows.
2. **Make moderation operational.** Add a moderator queue, report status, review/removal actions, blocking, abuse handling, and clear community rules. Reports currently remain in SQLite without review or automatic removal. Avoid rewarding reports or letting XP grant moderator privileges.
3. **Set a clear privacy promise.** Choose retention periods, logging rules, what administrators may see, and whether aliases should be global or per conversation. Remove identifying details from seed/upload assets before distributing a real community dataset. Nicknames are pseudonymous, not untraceable.
4. **Prepare hosting and storage.** Use HTTPS, a deployment origin setting/reverse-proxy configuration, durable database and image storage, backups, migration versioning, monitoring, session revocation, and a retention policy. Rate limits currently live in each process. SQLite is suitable for this local demo; reassess database concurrency and use a shared limiter before multiple servers. Production mode disables demo creation and seeding, but this branch has not been deployed publicly.
5. **Refine after trying the core loop.** Test with a small invited group and observe whether people return to reply. Then decide whether notifications need post links/live updates and whether following, richer search, or gamification actually helps. Consolidate or remove the unmounted legacy screens once the new direction is accepted.

## Validation

- 23 real HTTP integration checks pass: empty feed, registration/sign-in, HttpOnly cookies, validation, public-field privacy, literal search, topics, idempotent likes/saves, replies, ownership protection, notifications, profile updates, private reports/feedback, cross-origin rejection, malformed payloads, upload rejection and valid images, pagination, process-restart persistence, cascades, separate demo identities, logout, and production secret requirements.
- Vite production build passes.
- Chrome desktop and 390-pixel mobile layouts inspected; visible search and mobile profile navigation checked.

The automated checks use isolated temporary data. They are not a penetration test or a load test. Validation was performed locally before publication.

## Technical references used

- [Node.js SQLite](https://nodejs.org/api/sqlite.html)
- [Vite setup](https://vite.dev/guide/)
- [Express security guidance](https://expressjs.com/en/advanced/best-practice-security/)
