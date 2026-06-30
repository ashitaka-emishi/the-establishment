# Multiplayer and Discord Activity Architecture Spike

Issue: [#13](https://github.com/ashitaka-emishi/the-establishment/issues/13)

## Recommendation

Proceed with a staged multiplayer prototype, but do not start with a full
Discord Activity implementation.

The next implementation slice should be a browser-only online prototype using
boardgame.io as the authoritative state layer and a small Svelte/Vite client
shell. After one complete round works across two browser tabs and one deployed
server, validate Discord Activity packaging as a separate thin adapter around
that same hosted app.

## Decision Summary

| Question | Recommendation | Why |
|---|---|---|
| Is boardgame.io still the right authoritative-state layer? | Yes, for prototype and likely first production multiplayer. | The game is turn/phase driven, uses deterministic shuffles, and needs lobby plus reconnection more than low-latency physics. boardgame.io maps directly to those needs. |
| Is Svelte migration still worth the cost? | Yes, but only for the online client, not as a rewrite of the local referee first. | Per-player reactive views and async multiplayer state will be easier to maintain in components than the current manual `innerHTML` render loop. |
| Should Discord Activity be the first multiplayer target? | No. Build web multiplayer first, then wrap for Discord. | Discord Activities add iframe, SDK, URL mapping, proxy, auth, and hosting constraints that should not be mixed with first-pass authoritative game-state work. |
| Go/no-go before implementation | Go for a scoped prototype. No-go for a single large migration. | The architecture is viable, but the risk is integration sequencing, not core feasibility. |

## Current Sources Checked

- boardgame.io documentation describes game configuration around moves, phases,
  turns, plugins, clients, and multiplayer/lobby concepts:
  <https://boardgame.io/documentation/>
- Svelte's current docs recommend SvelteKit as the official Vite-powered app
  framework, and also support direct Svelte-with-Vite for standalone SPAs:
  <https://svelte.dev/docs/svelte/getting-started>
- Discord's Activities overview says Activities are web apps hosted in an
  iframe and communicate with Discord clients through the Embedded App SDK:
  <https://docs.discord.com/developers/activities/overview>
- Discord's Embedded App SDK reference documents npm installation and SDK
  initialization through `@discord/embedded-app-sdk`:
  <https://docs.discord.com/developers/developer-tools/embedded-app-sdk>
- Discord's first Activity guide calls out a public endpoint and Activity URL
  Mapping as part of running the app in Discord:
  <https://docs.discord.com/developers/activities/building-an-activity>

Package versions observed during the spike:

- `boardgame.io`: `0.50.2`
- `svelte`: `5.56.4`
- `@discord/embedded-app-sdk`: `2.5.0`

## boardgame.io Fit

boardgame.io remains a strong fit for this game because *The Establishment* is
already structured around:

- explicit phases: setup, opening, support, resolution, game complete;
- legal moves with validation;
- deterministic randomization for deck shuffles;
- private per-player hands and public shared state;
- turn order that can be represented as a snake-turn list;
- recovery from refresh via server-owned match state.

The existing local app already exposes the future server boundaries:

- `state` and `setupState` become `G`;
- event handlers become moves;
- phase transitions become boardgame.io phase transitions;
- `Math.random` shuffles become server-side deterministic random shuffles;
- private view rendering becomes per-player client rendering.

The biggest boardgame.io risk is not rule fit. It is operational maturity:
boardgame.io is stable enough for a prototype, but it is not a high-churn,
large-ecosystem framework. Keep game logic portable by writing pure helper
functions for scoring, restrictions, setup validation, and XP assignment.

## Svelte Migration Fit

Svelte is still worth the cost for the online client. The current local app is
now complete enough that continuing to add features through full-page string
templates will make per-player online rendering harder:

- player-specific views need conditional rendering keyed by `playerID`;
- support observers and active players should see different controls;
- resolution may have host-only controls plus player-specific XP choices;
- save/resume moves from local storage to server state and client session
  credentials;
- reconnects need reactive updates rather than manual rerender discipline.

The migration should not be a big-bang rewrite of the local referee. Keep the
single-device local app as the stable baseline while introducing a new
multiplayer client path under a Vite/Svelte entry. Reuse CSS classes, assets,
and pure rule helpers.

SvelteKit is viable, but a direct Svelte + Vite SPA is the lower-friction first
step because the app already has a static shell and boardgame.io owns server
state. Reassess SvelteKit only if routing, server endpoints, or deployment
composition become painful.

## Discord Activity Requirements

Discord Activity support is viable, but it is a packaging and platform
integration layer, not the core multiplayer architecture.

Minimum Activity work includes:

- create/configure a Discord application;
- install and initialize `@discord/embedded-app-sdk`;
- wait for SDK readiness before using Discord client capabilities;
- host the web app on a public HTTPS endpoint during development and production;
- configure Activity URL Mapping in the Discord Developer Portal;
- account for iframe/runtime constraints inside Discord clients;
- add a backend path for OAuth/code exchange if Discord user identity is used;
- ensure the boardgame.io server is reachable from the Activity runtime;
- test desktop, web, mobile, and tablet behavior separately.

The easiest production shape is a single public HTTPS app origin that serves
the Svelte client and proxies or co-hosts the boardgame.io/socket server under
the same domain. That keeps CORS and Discord URL-mapping simpler than separate
client/server origins.

GitHub Pages alone is not enough for the full multiplayer Activity because the
authoritative server needs a long-running Node process. GitHub Pages can still
host the static marketing/docs site and possibly the non-Activity client build
if the game server is deployed elsewhere.

## Hosting Needs

Prototype hosting needs:

- Node 20+ runtime for boardgame.io server;
- WebSocket-capable HTTPS hosting;
- persistent-enough match storage for playtests;
- health check endpoint;
- CORS limited to the client origin;
- environment variables for client/server URLs and Discord client ID.

Reasonable first hosts:

- Render, Railway, or Fly.io for a Node app with WebSocket support;
- optional Redis/Postgres later if boardgame.io storage needs to survive
  server restarts;
- a development tunnel such as Cloudflare Tunnel or ngrok for Discord Activity
  local testing.

Avoid serverless-only hosting for the authoritative game server unless the
provider explicitly supports durable WebSockets or a separate realtime service.

## Proposed Implementation Sequence

1. Extract pure rule helpers from `webgame/app.js`.
   Keep local behavior unchanged and add Node-level tests for setup, support
   restrictions, scoring, XP awards, and round transitions.
2. Create a boardgame.io game definition in a new multiplayer package.
   Verify a complete one-round flow in Node without UI.
3. Add a minimal Svelte/Vite client that can connect to a local match.
   Use select/button controls first, not drag-and-drop or animation.
4. Add lobby/create/join and two-tab browser smoke tests.
   Confirm refresh/rejoin works with credentials.
5. Deploy the server and client to a public HTTPS environment.
   Run a real device test outside localhost.
6. Add Discord Activity adapter.
   Initialize the Embedded App SDK, configure URL mapping, and prove that the
   deployed multiplayer game can be launched and joined inside Discord.
7. Revisit polish libraries.
   Add GSAP/interact.js/canvas-confetti only after the authoritative flow is
   reliable.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Resolution flow has host-only/manual decisions that are currently local and synchronous. | Online play can block if authority is unclear. | Make player `0` the resolution host for the prototype, then add host-transfer later if needed. |
| Private information leaks into shared state or observer views. | Breaks game integrity. | Store all state server-side but render hands/reserves only for matching `playerID`; add tests for view selectors. |
| boardgame.io storage defaults are too ephemeral for real games. | Server restart can lose matches. | Prototype with default storage; add Redis/Postgres before public playtests. |
| Discord iframe/proxy/auth issues slow down core work. | Multiplayer architecture gets tangled with platform setup. | Build web multiplayer first; Discord is an adapter milestone. |
| Svelte migration expands scope. | Delivery slows or destabilizes local referee. | Keep local app intact; build multiplayer client as a parallel path using shared helpers/assets. |

## Go / No-Go

Go:

- boardgame.io prototype using extracted rule helpers;
- Svelte/Vite multiplayer client shell;
- hosted web multiplayer proof before Discord;
- Discord Activity adapter only after web multiplayer round-trip succeeds.

No-go:

- full replacement of the current local referee as the first step;
- Discord Activity as the first playable multiplayer target;
- animation/drag-and-drop polish before authoritative moves and reconnects;
- GitHub Pages-only deployment for the multiplayer server.

## Follow-up Issues to Create Before Implementation

- Extract reusable rule helpers and tests from `webgame/app.js`.
- Build boardgame.io game definition with setup/opening/support/resolution
  phases.
- Add Svelte/Vite multiplayer client shell and two-tab local smoke test.
- Deploy authoritative multiplayer server and document environment variables.
- Prototype Discord Activity wrapper with Embedded App SDK and URL mapping.
