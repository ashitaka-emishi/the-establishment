# The Establishment - Web Game

A browser-based local multiplayer implementation using the official card images in `__docs__/cards`.

## Run

From the repository root:

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173/webgame/`

## What is implemented

- 4-round game flow from the rulebook.
- Player-by-player setup for 2-6 players.
- Wrapping faction carousel with identity and reference card sides.
- Unique faction selection with a faction-specific 7-card influencer deck.
- Rulebook setup draw of 4 face-up influencers and 3 face-down reserves.
- Draw 5 text description cards and select 3 for the player area.
- Opening discussion with flippable storyline card images.
- Snake-order support placement (1st pass forward, 2nd reverse, 3rd forward).
- Restriction checks during support (if society restrictions were entered for that lane).
- Guided resolution scoring:
  - influencer value
  - XP stars
  - matching realm bonus (`+1` per pair, `+1` per additional match)
  - society side bonus
  - tie breaker by society-assisted side
- Lane-by-lane resolution form with inline validation.
- Manual resolution overrides for lane totals and winners, with visible markers
  and an in-game audit reason.
- XP awards, including player choice when multiple winning-side influencers
  are eligible on a storyline.
- Round transitions with 4-card redraw from each player deck.
- Final round epilogue summary with per-player influence and XP standings.
- Local save and resume after setup/game state changes.
- Pass-and-play private views for setup choices, description cards, influencer
  hands, and face-down reserves.

## Resolution inputs

During resolution, the app uses visible controls for each storyline's:

  - society bonus value and side
  - canceled realms
  - winning branch card number in parentheses
  - next-round restrictions from society card

## Notes

- Storyline card numbering follows the rulebook numbering: `1-124`.
- Starting storylines are preset to `1`, `32`, `63`, and `94`.
- Description cards are currently represented by text because description-card image assets are not included in the repository.
- The rulebook has no points-based winner; final standings summarize tracked
  influence and XP for the epilogue discussion.
- Saves use browser local storage with a versioned payload. Use Reset or Start Over to clear the saved game.
- Pending resolution inputs, including XP recipient choices, are preserved by
  save/resume until the lane is committed.
- Manual override audit entries are saved with the current game and remain
  visible during resolution.
- Shared/table view avoids showing private setup choices and active hands.
  Open one player view at a time and pass the device when a player needs to
  review private information or place an influencer.
