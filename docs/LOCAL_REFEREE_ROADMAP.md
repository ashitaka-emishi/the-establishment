# Local Referee Product Roadmap

## Product Direction

The first production target is a polished local referee for *The Establishment*.
Players should be able to complete a full game without physical cards. The app
owns setup, private player information, faction and influencer decks,
description cards, storyline flow, support placement, resolution, XP, save and
resume, and final scoring.

Online multiplayer and Discord Activity support are future phases. The local
referee comes first so rule fidelity, card data, scoring, and table UX can be
tested quickly.

## Product Decisions

- No physical cards are required for normal play.
- Player-only information should be hidden from the shared table view whenever
  the rules do not require it to be public.
- Browser `prompt()` dialogs should be removed and replaced with guided UI.
- Manual overrides are required for edge cases, corrections, and playtest
  flexibility.
- The first complete-game target should support the quickest path to a valid
  finish, not every advanced option.
- Save and resume are required.
- Mobile and tablet layouts are first-class, not follow-up polish.
- Beginner mode should optionally show rule prompts at each phase.
- Missing description cards should be created in a style consistent with the
  existing cards, including matching typography, colors, borders, and filigree.
- The repository should keep roadmap and planning files tracked.

## Milestones

### M0: Product Definition and Backlog

Capture the final local-referee scope, preserve the future multiplayer plan,
and seed GitHub issues for the next slices of work.

### M1: Local Referee Beta

Make the current single-device referee complete enough to play a full game
without physical cards. Replace prompts, add save/resume, support player-only
views, and include manual overrides.

### M2: Rulebook Fidelity and Assets

Audit card metadata and rules, create missing description-card assets, verify
scoring and XP behavior, and produce a full-game playtest checklist.
See [RULEBOOK_METADATA_AUDIT.md](RULEBOOK_METADATA_AUDIT.md) for the tracked
rulebook and card metadata audit.

### M3: Mobile and Table UX Polish

Make phones and tablets pleasant to use, improve card zoom/readability, refine
phase guidance, and add optional beginner-mode rule prompts.

### M4: Multiplayer and Discord Spike

After the local referee is stable, evaluate the multiplayer architecture and
Discord Activity path. See [MULTIPLAYER_PLAN.md](MULTIPLAYER_PLAN.md).
