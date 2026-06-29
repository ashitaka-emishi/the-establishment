# Multiplayer Integration Plan

Migrate *The Establishment* web referee from a single-screen local app to a
per-device online multiplayer experience using **boardgame.io**, **Svelte**,
**GSAP**, **interact.js**, and **canvas-confetti**.

---

## Library summary

| Library | Role |
|---|---|
| [boardgame.io](https://boardgame.io) | Authoritative game state, move validation, phase management, lobby API |
| [Svelte](https://svelte.dev) | Reactive component UI — replaces manual `innerHTML` DOM management |
| [GSAP](https://gsap.com) | Card flip, deal, placement, and score-reveal animations |
| [interact.js](https://interactjs.io) | Drag-and-drop influencer placement; touch support for tablet play |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Winner celebration at game end |

---

## Architecture overview

boardgame.io splits work into three layers:

- **`G` (game state)** — plain object synced to all clients by the server;
  replaces the current `state` and `setupState` globals.
- **Moves** — pure functions that mutate `G` on the server; replace the
  imperative event handlers in `app.js`.
- **Server** — Node.js process that owns authoritative state and exposes the
  Lobby REST API.
- **Client** — Svelte app that subscribes to `{ G, ctx }` via a Svelte store
  and re-renders reactively.

The existing CSS custom properties and card image assets are kept intact.
Svelte components use the same class names already in `styles.css`.

---

## Milestone 1 — Tooling & Project Structure

**Goal:** working dev environment with Vite, Svelte, and boardgame.io wired up;
server process running; all libraries installed. No game logic yet.

### T1 — Add Vite + Svelte to `webgame/`

- `npm install -D vite @sveltejs/vite-plugin-svelte svelte`
- Add `webgame/vite.config.js`:
  ```js
  import { svelte } from '@sveltejs/vite-plugin-svelte';
  export default { plugins: [svelte()] };
  ```
- Rename `webgame/index.html` entry script to `<script type="module" src="./main.js">`.
- Add scripts to `webgame/package.json`: `dev` (vite), `build` (vite build),
  `preview` (vite preview).
- Update `.gitignore` for `node_modules/` and `webgame/dist/`.

### T2 — Install client libraries

```
npm install gsap interactjs canvas-confetti
```

No additional config needed. All three are plain ESM imports.

### T3 — Create server package

- Add `server/package.json` with dependencies: `boardgame.io`, `koa`, `@koa/cors`.
- Create `server/index.js` that imports a stub `Game` object and starts
  `boardgame.io/server` on `process.env.PORT ?? 8000`.
- Add `GET /ping` health-check route.
- Add a top-level `package.json` with a `dev` script running client and server
  in parallel via `concurrently`.

### T4 — Extract shared data module

Move the following from `app.js` into `src/data.js` (imported by both client
and server):

- `realms`, `descriptionDeck`, `factionCatalog`, `influencerMeta`, `allSociety`
- Image path helpers: `storylineSrc`, `influencerSrc`, `influencerBackSrc`,
  `factionIdentitySrc`, `factionReferenceSrc`, `societySrc`
- `pad`, `shuffle` utilities

Pure refactor — no behaviour change.

### T5 — Create Svelte game-state store

Create `src/store.js`:

```js
import { writable } from 'svelte/store';
export const gameState = writable({ G: null, ctx: null });
```

In `main.js`, after `client.start()`:

```js
client.subscribe(({ G, ctx }) => gameState.set({ G, ctx }));
```

All Svelte components import `{ gameState }` and read `$gameState.G` /
`$gameState.ctx` reactively. No prop drilling needed for global game state.

### T6 — Update GitHub Actions Pages workflow

Modify `.github/workflows/pages.yml` to run `npm install && npm run build`
inside `webgame/` before uploading the artifact. Server is deployed separately
in Milestone 7. The landing page `index.html` at the repo root is already
static and needs no build step.

---

## Milestone 2 — Game Definition (server-side)

**Goal:** a complete `TheEstablishment` Game object enforcing all rules.
Verifiable by running boardgame.io's `Client` in a Node test script with no UI.

### T7 — Define initial `G` and setup function

```
G = {
  playerNames: {},         // { "0": "Alice", "1": "Bob" }
  playerSetup: {},         // keyed by playerID — see T8
  takenFactions: [],
  descriptionDrawPile: [], // shuffled by ctx.random.Shuffle at game start
  societyDeck: [],         // shuffled by ctx.random.Shuffle at game start
  round: 1,
  storylines: [            // 4 lanes
    { lane: 0, card: 1,  history: [1],  societyForNext: null },
    { lane: 1, card: 32, history: [32], societyForNext: null },
    { lane: 2, card: 63, history: [63], societyForNext: null },
    { lane: 3, card: 94, history: [94], societyForNext: null },
  ],
  snakeTurns: [],          // pre-computed list of playerIDs for support phase
  placements: [],
  pendingXP: {},           // { playerID: { lane, options: [uniqueId, ...] } }
  resolution: [],
}
```

Use `ctx.random.Shuffle()` (not `Math.random`) so the server is authoritative
on all randomness.

### T8 — Setup phase moves

Phase: `setup`. All players act simultaneously using
`turn.activePlayers: { all: Stage.NULL }` so no turn order is enforced.

Each `playerSetup[playerID]` entry:
```
{ factionId, deck, hand, reserveInfluencers, drawnDescriptions,
  selectedDescriptions: [], ready: false }
```

Moves:
- `setName(G, ctx, name)` — store display name in `G.playerNames[ctx.playerID]`
- `claimFaction(G, ctx, factionId)` — fail if `G.takenFactions` includes it;
  push to `takenFactions`; shuffle faction's influencer IDs via
  `ctx.random.Shuffle`; build deck; deal hand of 4; store in `playerSetup`
- `releaseFaction(G, ctx)` — remove from `takenFactions`; clear `playerSetup`
  entry so player can browse again
- `drawDescriptions(G, ctx)` — idempotent; splice 5 from
  `G.descriptionDrawPile` into `playerSetup[id].drawnDescriptions`
- `toggleDescription(G, ctx, cardId)` — toggle in `selectedDescriptions`;
  reject if already at 3 and not deselecting
- `confirmSetup(G, ctx)` — require faction claimed + exactly 3 descriptions
  selected; set `playerSetup[id].ready = true`

Phase `endIf`: all `playerSetup[id].ready === true` for every player in
`ctx.playOrder`.

### T9 — Opening phase

Phase: `opening`. Single move available to all players:
- `lockDiscussion(G, ctx)` — calls `ctx.events.setPhase('support')`

On phase start hook: compute and store
`G.snakeTurns = [...order, ...[...order].reverse(), ...order]` using
`ctx.random.Shuffle(ctx.playOrder)` for initial order.

On phase start: redeal hands — for each player, `ctx.random.Shuffle(deck)`,
take first 4 as hand, rest as reserve. (Skipped on round 1 since setup dealt
hands already.)

### T10 — Support phase

Phase: `support`. Turn order driven by `TurnOrder.CUSTOM_FROM_CTX`
reading `G.snakeTurns`.

Move:
- `placeInfluencer(G, ctx, uniqueId, lane, side)`:
  1. Verify card belongs to `ctx.currentPlayer`'s hand and isn't already placed.
  2. Run `restrictionViolates(placement, lane, side, G)` — port logic verbatim
     from current `app.js:520`. Return error string or null.
  3. If violation, `ctx.events.setActionInvalid(violation)` (boardgame.io
     surfaces this to the client as a move error).
  4. Push placement to `G.placements`.
  5. `ctx.events.endTurn()`.

Phase `endIf`: `G.placements.length === G.snakeTurns.length`.

### T11 — Resolution phase moves

Phase: `resolution`. One player (seat "0") drives lane entry sequentially,
tracked by `G.resolutionLaneIndex` (0–3).

Moves:
- `submitLaneResult(G, ctx, { societyBonus, bonusSide, canceledRealms, nextCard, restrictions })`:
  1. Only valid when `ctx.playerID === "0"`.
  2. Mark canceled realms on relevant placements.
  3. Run `computeSideScore()` (port from `app.js:601`) for both sides.
  4. Determine winner side.
  5. For each winning player: if one card, apply XP immediately; if multiple
     cards, add entry to `G.pendingXP[playerID]`.
  6. Advance storyline card: `G.storylines[lane].card = nextCard`,
     `G.storylines[lane].societyForNext = { restrictions }`.
  7. Push to `G.resolution`; increment `G.resolutionLaneIndex`.
- `assignXP(G, ctx, lane, uniqueId)`:
  - Only valid for `ctx.playerID` if they have a `pendingXP` entry for that lane.
  - Apply XP to chosen card; delete `pendingXP[ctx.playerID]`.
- `advanceRound(G, ctx)`:
  - Only valid when `G.resolution.length === 4` and `G.pendingXP` is empty.
  - If `G.round < 4`: increment round, reset placements/resolution/snakeTurns,
    call `ctx.events.setPhase('opening')`.
  - If `G.round === 4`: call `ctx.events.endGame({ scores })`.

### T12 — Win condition

Top-level `endIf(G)`: returns score map keyed by playerID when `ctx.gameover`
has been set via `advanceRound`. Score = sum of `value + xp` across each
player's full deck.

---

## Milestone 3 — Lobby

**Goal:** players can create a match, share a link, join by name, and see a
waiting room before the game starts.

### T13 — Server lobby routes

boardgame.io `Server` exposes REST lobby routes automatically:
`POST /games/:name/create`, `POST /games/:name/:id/join`, etc. Configure
`@koa/cors` so the browser client on the Pages domain can call these. Test
with curl that a match can be created and joined by two separate clients.

### T14 — Create-match page (`lobby/create`)

Build `webgame/lobby/Create.svelte`:
- Player count selector (2–6)
- "Create Game" button — calls `LobbyClient.createMatch()`, stores `matchID`
  in `sessionStorage`, navigates to `/lobby/?match=<id>`
- Styled with existing CSS custom properties

### T15 — Join-match page (`lobby/join`)

Build `webgame/lobby/Join.svelte` (handles `?match=<id>`):
- Fetch and display match info (seat count, joined names) via
  `LobbyClient.getMatch()`
- Name input; "Join" button calls `LobbyClient.joinMatch()`, stores
  `playerID` + `credentials` in `sessionStorage`
- After joining: "Waiting for players…" view polling match state on a 2-second
  interval; shows joined-vs-total count
- Auto-navigates to `/webgame/` when all seats are filled
- "Copy join link" button (the `?match=<id>` URL)

### T16 — Lobby routing

Add minimal client-side routing in `webgame/main.js`:
- `/lobby/` → mount `App.svelte` in lobby mode
- `/webgame/` → mount `App.svelte` in game mode, reading `sessionStorage` for
  `matchID`, `playerID`, `credentials`

No router library needed — a single `if (path.startsWith('/lobby'))` switch suffices.

---

## Milestone 4 — Setup Phase UI

**Goal:** each player sees their own faction and description setup on their own
device; game starts automatically when all confirm.

### T17 — App shell (`App.svelte`)

Root component. Reads `$gameState.ctx.phase` to switch between panels:
- No state: lobby / loading
- `setup`: `<SetupPhase>`
- `opening` / `support` / `resolution`: `<GamePanel>`
- `ctx.gameover` set: `<GameOver>`

Import `src/app.css` (the existing `styles.css` renamed) for global custom
properties and base styles.

### T18 — Client bootstrap

In `webgame/main.js`:
```js
const { matchID, playerID, credentials } = sessionStorage;
const client = Client({
  game: TheEstablishment,
  multiplayer: SocketIO({ server: import.meta.env.VITE_SERVER_URL }),
  matchID, playerID, credentials,
});
client.start();
client.subscribe(({ G, ctx }) => gameState.set({ G, ctx }));
```
Mount `<App>` into `#app`.

### T19 — `FactionCarousel.svelte`

Props: derived from `$gameState.G` — available factions (not in
`takenFactions`), current player's claimed faction if any.

Behaviour:
- Left/right arrows step through available factions
- "Confirm Faction" dispatches `claimFaction` move; "Change" dispatches
  `releaseFaction`
- Factions claimed by other players shown in a separate "taken" row with
  player name overlay

**GSAP:** slide transition between faction cards — on arrow click, outgoing
card slides off-screen (x: ±120, opacity: 0, duration: 0.18s) while incoming
card slides in from the opposite side. Use `gsap.context()` scoped to the
carousel element for cleanup on Svelte `onDestroy`.

### T20 — `DescriptionPicker.svelte`

Displayed after faction is confirmed. Reads `playerSetup[playerID].drawnDescriptions`
from `G`.

On mount (first render with drawn descriptions populated):
- **GSAP:** stagger cards dealing in — `gsap.from('.description-card', { y: 40, opacity: 0, stagger: 0.07, duration: 0.25, ease: 'power2.out' })`

Toggle buttons dispatch `toggleDescription`. "Continue" (enabled when 3
selected) dispatches `confirmSetup`.

### T21 — `SetupWaiting.svelte`

After `confirmSetup`, player sees:
- "Waiting for other players" header
- List of all players with a ready indicator (derived from `G.playerSetup`)
- Own row highlighted

When all players are ready (`ctx.phase` transitions to `opening`), animate
out and mount `SetupReview.svelte`.

**GSAP:** staggered fade-in of `review-player` cards on review mount.

### T22 — Host setup override (player "0" only)

If `ctx.playerID === "0"` and game has been in setup for more than 60 seconds,
show a "Skip waiting players" button. Clicking it dispatches `confirmSetup`
for each playerID that hasn't confirmed yet (requires a host-only move on the
server: `forceStartGame(G, ctx)` — only valid if `ctx.playerID === "0"`).

---

## Milestone 5 — Opening & Support Phase UIs

**Goal:** opening discussion screen and per-player support placement with
drag-and-drop.

### T23 — `StorylineBoard.svelte`

Reads `G.storylines`. Each lane rendered as a `story-card` article.

**GSAP card flip:** replace the current src-swap on "Flip Side" with a
3D CSS flip tween:
```js
gsap.to(cardEl, { rotateY: 90, duration: 0.15, onComplete: () => {
  img.src = newSrc;
  gsap.from(cardEl, { rotateY: -90, duration: 0.15 });
}});
```

Show society restriction badges when `storyline.societyForNext` is populated.
"Lock Discussion → Support" button dispatches `lockDiscussion`; disabled once
dispatched (derive from `ctx.phase`).

### T24 — `HandRack.svelte`

Displays the active player's influencer hand. Each card is a draggable element
wired up with **interact.js**:

```js
import interact from 'interactjs';

interact('.influencer-mini').draggable({
  inertia: true,
  autoScroll: true,
  listeners: {
    move: dragMoveListener,  // translate card with pointer
    end:  onDragEnd,         // check if dropped on valid target
  }
});
```

Cards already placed (their `uniqueId` appears in `G.placements`) are rendered
non-draggable with reduced opacity.

Fallback: a compact select + button control below the hand for keyboard /
accessibility use. Both dispatch the same `placeInfluencer` move.

### T25 — `LaneDropZone.svelte`

Each storyline lane has two drop zones (Left, Right). Wire with interact.js:

```js
interact('.lane-drop-zone').dropzone({
  accept: '.influencer-mini',
  overlap: 0.4,
  ondrop(event) { /* read lane/side from data attrs, dispatch move */ },
  ondragenter(event) { event.target.classList.add('drop-active'); },
  ondragleave(event) { event.target.classList.remove('drop-active'); },
});
```

On invalid placement (move returns action-invalid), flash the zone red via
GSAP: `gsap.from(zone, { backgroundColor: '#ff6f61', duration: 0.4 })`.

**GSAP on valid drop:** card flies from its hand position to the drop zone
center — capture hand card rect, capture zone rect, animate position, then
replace with a static placed-card thumbnail.

### T26 — `SupportObserver.svelte`

Shown to non-active players. Displays:
- Snake turn order chips with active player highlighted (pulse animation via
  GSAP `gsap.to` repeat on the active chip)
- "Your turn in N plays" derived from remaining `snakeTurns` slice
- Full `PlacedList` (see T27)

### T27 — `PlacedList.svelte`

Shared component used by both active-player and observer views. Reads
`G.placements`. Each new entry animates in:

**GSAP:** `gsap.from(newItem, { x: -20, opacity: 0, duration: 0.2 })` on
reactive update (use Svelte's `afterUpdate` + a `previousLength` ref to detect
new entries).

### T28 — Resolve button

Visible only when `ctx.playerID === "0"` and
`G.placements.length === G.snakeTurns.length`. Dispatches server-side phase
transition via `client.events.setPhase('resolution')`.

---

## Milestone 6 — Resolution Phase UI

**Goal:** replace all `prompt()` dialogs with structured per-lane form UI.
Player 0 drives entry; all players see results as each lane resolves.

### T29 — `LaneResultForm.svelte` (player 0 only)

Shown when `ctx.playerID === "0"` and `G.resolutionLaneIndex < 4`.

Fields for the current lane:
- Society card image (revealed from `G.societyDeck` top) with a GSAP card-flip
  reveal animation on mount
- Number input: bonus value (0–3)
- Toggle: bonus side (L / R)
- Checkbox list of realms present on this lane → canceled realms selection
- Number input: next storyline card (1–124)
- Restriction builder rows: banned realms (tag input), opposite pairs (A/B text
  fields, add/remove), same-side pairs (same)
- "Submit Lane" button dispatches `submitLaneResult`

Non-player-0 clients see: "Waiting for [host name] to resolve Lane N…" with
the current lane card displayed.

### T30 — `XPAssignment.svelte`

When `G.pendingXP[playerID]` is set, show a modal overlay for that player:
- "Choose which influencer earns XP on Lane N"
- Buttons for each eligible card (name, realm, current value+xp)
- Dispatches `assignXP`

**GSAP:** overlay slides up from bottom on appear; all other players see
"Waiting for [name] to assign XP…" in the resolution panel.

### T31 — `ResolutionResults.svelte`

Reads `G.resolution`. As each lane entry appears (reactive to array length),
render its `res-block` with:

**GSAP:** score numbers count up from 0 to final value — use
`gsap.to(counter, { textContent: finalValue, duration: 0.6, snap: { textContent: 1 } })`
on the rating, match bonus, society bonus, and total fields. Winner side
highlights with a colour flash: `gsap.from(winnerEl, { backgroundColor: '#80ed99', duration: 0.8 })`.

### T32 — `Leaderboard.svelte` + game end

Reads each player's full deck from `G.playerSetup`, sums `value + xp`.

When `$gameState.ctx.gameover` is truthy:
- Render final scoreboard sorted by score
- **canvas-confetti:** `confetti({ particleCount: 180, spread: 80, colors: ['#ffd166', '#7df9d6', '#fff'] })`
  fires once on mount
- "Play Again" button navigates back to lobby create page

Round-end (round < 4): player 0 sees "Start Round N" button which dispatches
`advanceRound`.

---

## Milestone 7 — Deployment

**Goal:** server running in production, client connecting to it, full
end-to-end test across devices.

### T33 — Containerise server

Add `server/Dockerfile`:
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ .
COPY src/data.js ./src/data.js
EXPOSE 8000
CMD ["node", "index.js"]
```

### T34 — Deploy server to Render (or Railway)

- Connect repo; build command `npm ci`, start command `node index.js`
- Set env var `CORS_ORIGIN` to the GitHub Pages URL
  (`https://ashitaka-emishi.github.io`)
- Note the assigned server URL (e.g. `https://the-establishment.onrender.com`)

### T35 — Configure client for production

- Add `webgame/.env.production`: `VITE_SERVER_URL=https://the-establishment.onrender.com`
- Add `webgame/.env.development`: `VITE_SERVER_URL=http://localhost:8000`
- Update `webgame/main.js` to read `import.meta.env.VITE_SERVER_URL`
- Update GitHub Actions `pages.yml` to set `VITE_SERVER_URL` from a repo
  Actions secret during the build step

### T36 — End-to-end smoke test

With 2–3 people on separate devices:
1. Create match on lobby page; share join link
2. All players join and complete setup (simultaneous faction + description
   selection on separate screens)
3. Play one full round through resolution, including an XP assignment decision
4. Verify leaderboard updates correctly
5. Refresh one player's tab mid-game; confirm boardgame.io reconnects and
   replays state correctly
6. Play to round 4 and confirm confetti + final scores fire

Document any edge cases as follow-on issues.

---

## Sequencing

```
M1 (Tooling)
 └─ M2 (Game Logic) ──────────────────────────────┐
     ├─ M3 (Lobby)                                 │
     │   └─ M4 (Setup UI) ── M5 (Play UI) ── M6 (Resolution UI)
     └─ M7 T33/T34 can start as soon as M2 is done │
                                                    ▼
                                              M7 T35/T36
```

M2 can be developed and tested entirely in Node before any UI work begins.
M3 and M4 can start in parallel once T8 (setup phase moves) is done.
M5 requires the lobby (M3) to work so real matchIDs exist for testing.
The biggest rewrite risk is **resolution (T29–T31)**: the current `prompt()`
loop is blocking and sequential, which does not translate to async multiplayer.
Budget extra time there. Everything else maps cleanly from existing code.
