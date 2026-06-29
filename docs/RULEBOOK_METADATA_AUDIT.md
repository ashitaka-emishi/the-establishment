# Rulebook and Metadata Audit

Issue: [#8](https://github.com/ashitaka-emishi/the-establishment/issues/8)

Date: 2026-06-29

## Scope

This audit compares the browser referee against `__docs__/Rule-Book-V3.1.pdf`
and the checked-in card image assets for:

- influencer values, realms, and XP caps;
- scoring and tie-break behavior;
- society canceled realms and next-round restrictions;
- known rule-fidelity gaps that should become follow-up work.

## Card Asset Inventory

- Factions: 6 faction cards, with front and back images for IDs `000-005`.
- Playable influencers: 42 playable influencer fronts, arranged as six 7-card
  faction decks.
- Influencer reference cards: the front images `007`, `015`, `023`, `031`,
  `039`, and `047` are faction reference/divider cards, not playable
  influencers. The app correctly excludes them from `influencerMeta`.
- Society cards: 16 society fronts, IDs `000-015`, matching the rulebook's
  16 society cards and the app's `allSociety` draw deck.
- Storylines: 124 storyline cards, with front and back images for IDs `000-123`.
  The app's user-facing storyline numbers are `1-124` and map to zero-based
  image IDs in `storylineSrc()`.

## Influencer Metadata

The app metadata matches the playable card images for the current local-referee
deck model:

- each faction has seven playable influencer IDs;
- each faction deck has one value-3 card, three value-2 cards, and three
  value-1 cards, matching the visible card values;
- XP caps follow the visible empty-star counts on each card:
  `0, 3, 2, 1, 3, 2, 1` within each faction deck;
- no playable image asset referenced by the app is missing;
- no playable image asset is excluded except the six faction reference cards
  listed above.

Realm metadata was checked by visual pass against the playable card images and
the app's current `influencerMeta` mapping. No mismatches were found.

## Scoring and Tie-Breaks

Rulebook basis:

- score each side from face-up influencer rating;
- add each filled XP star on face-up influencers;
- add matching realm bonuses as `+1` for a pair and `+1` for each additional
  matching icon after the first pair;
- add the society card bonus to the side indicated by the society card;
- if totals tie, the society-assisted side wins.

Implementation status:

- `computeSideScore()` filters canceled placements before computing rating,
  XP, and matching bonuses, matching the rulebook's flipped-card scoring rule.
- The matching bonus formula `count - 1` for each realm with at least two live
  cards matches the rulebook pair/additional-icon language.
- The winner calculation uses total score first, then the society-assisted side
  as tie-breaker.
- Manual total and winner overrides are visibly marked and audited, preserving
  referee correction flow without changing the calculated baseline.

## Society Effects and Restrictions

Rulebook basis:

- society canceled realms remove matching influencers from scoring;
- next-round restrictions can ban realms, ban same-side pairs, or ban
  opposite-side pairs;
- restrictions last one round and are not cumulative;
- an illegal placement only matters if caught before the next player's turn.

Implementation status:

- Canceled realms are structured resolution inputs and correctly remove matching
  placements from scoring.
- Next-round restrictions are structured inputs for banned realms, same-side
  forbidden realm pairs, and opposite-side forbidden realm pairs.
- `restrictionViolates()` applies those restrictions during support placement.
- Restrictions are stored per storyline and replaced by the next society result,
  so they do not accumulate across rounds.
- The app enforces illegal placements immediately rather than modeling the
  rulebook's "catch it before the next player's turn" timing window. Manual
  overrides remain available for table corrections and playtest rulings, but a
  fuller rulebook timing model is tracked as
  [#26](https://github.com/ashitaka-emishi/the-establishment/issues/26).

## XP Awards

Rulebook basis:

- influencers on the winning side receive XP;
- a player who placed more than one influencer on a winning storyline chooses
  one influencer to receive XP;
- an influencer cannot exceed its visible XP cap;
- a flipped/canceled influencer can still receive XP if it is on the winning
  side.

Implementation status:

- `awardXpForLane()` awards at most one XP per player per winning storyline.
- The max-XP guard is enforced.
- Canceled winning-side placements remain eligible for XP, matching the
  rulebook.
- Gap: when a player has multiple winning-side influencers, the app chooses the
  first non-maxed card automatically instead of surfacing the rulebook choice.
  Follow-up: [#25](https://github.com/ashitaka-emishi/the-establishment/issues/25).

## Follow-Up Issues

- [#25 Let players choose XP recipient for multiple winning influencers](https://github.com/ashitaka-emishi/the-establishment/issues/25)
- [#26 Support late-caught illegal placement rulings](https://github.com/ashitaka-emishi/the-establishment/issues/26)
