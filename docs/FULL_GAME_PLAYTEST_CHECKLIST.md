# Full-Game Playtest Checklist

Issue: [#10](https://github.com/ashitaka-emishi/the-establishment/issues/10)

Use this checklist for repeatable local-referee playtests. Record the date,
browser, viewport/device, player count, and any GitHub issues opened from the
run.

## Test Log Header

- Date:
- Tester:
- Browser and version:
- Device or viewport:
- App URL or commit:
- Player count:
- Save/resume checkpoints tested:
- GitHub issues opened:

## Two-Player Quick Path

This path is the shortest complete-game smoke test. It should finish a legal
game without physical cards.

- [ ] Start from a clean browser state with no saved game, or intentionally use
      Start Over.
- [ ] Set player count to `2`.
- [ ] Complete setup for Player 1:
      choose a faction, confirm the default name or enter a name, select exactly
      3 description cards, and continue.
- [ ] Complete setup for Player 2 with a different faction and 3 description
      cards.
- [ ] Start the game and confirm the shared table view does not expose private
      hands, reserves, or description choices.
- [ ] Open each player-only view and confirm only that player's private
      information is visible.
- [ ] Lock discussion and enter support.
- [ ] For all 6 support turns, open the current player's private view, place one
      available influencer, and return to the shared table.
- [ ] Confirm the storyline board shows played cards under their story cards,
      grouped by left and right side.
- [ ] Resolve all four lanes with the guided form.
- [ ] Confirm scoring summaries show rating, matching realm bonus, society
      bonus, winner, next card, and XP awards.
- [ ] Use Next Round and repeat support plus resolution until round 4 is fully
      resolved.
- [ ] Confirm the final epilogue summary and final standings appear.
- [ ] Confirm Reset or Start Over clears the saved game.

## Setup And Private Information

- [ ] Player count clamps to the supported range of 2-6.
- [ ] Faction carousel wraps and prevents duplicate faction assignment.
- [ ] Setup deals 4 face-up influencers and 3 face-down reserve influencers.
- [ ] Description selection requires exactly 3 cards before continuing.
- [ ] Player-only setup view keeps description choices and reserves out of the
      shared view.
- [ ] Active support hand is visible only after opening that player's private
      view.
- [ ] Placed cards are marked in the player's private hand for the current
      round.
- [ ] Closing a private view returns to the shared table without exposing the
      hand.

## Support Placement

- [ ] Snake order is forward, reverse, forward.
- [ ] Each player gets exactly 3 placements per round.
- [ ] A card already placed this round cannot be placed again.
- [ ] Placement controls require influencer, storyline, and side.
- [ ] Shared storyline cards update immediately after each legal placement.
- [ ] Next-round banned realm restrictions trigger a ruling prompt instead of
      blocking with a browser alert.
- [ ] If caught before the next turn, the illegal card is removed, the turn is
      forfeited, and the ruling log records the outcome.
- [ ] If not caught in time, the illegal card remains, is visibly marked, and
      counts during resolution.
- [ ] Same-side and opposite-side realm restrictions follow the same ruling
      timing behavior.

## Resolution And Scoring

- [ ] Resolution is lane-by-lane and uses visible controls, not browser
      `prompt()` dialogs.
- [ ] Canceled realms remove matching influencers from score totals.
- [ ] Rating, XP stars, matching realm bonus, and society bonus are visible in
      the result.
- [ ] Tie-break goes to the society-assisted side.
- [ ] Manual total and winner overrides require a reason.
- [ ] Override summaries preserve calculated values and appear in the audit log.
- [ ] Next-round banned realms, same-side pairs, and opposite-side pairs are
      saved onto the storyline for the next support phase.
- [ ] Restrictions are replaced by the next society result rather than
      accumulating across rounds.

## XP And Round Transitions

- [ ] Winning-side influencers receive XP subject to their visible XP cap.
- [ ] A player with multiple winning-side influencers is prompted to choose the
      XP recipient.
- [ ] Pending XP recipient choices survive save/resume.
- [ ] Maxed influencers do not exceed their cap.
- [ ] XP awards in lane summaries name the recipient influencer.
- [ ] Next Round redraws each player to 4 cards from their deck.
- [ ] Final round disables further progression after the game complete summary.

## Save And Resume

- [ ] Reload during setup restores the current setup step.
- [ ] Reload during support restores turn order, current turn, placements, and
      pending placement rulings.
- [ ] Reload during a pending XP choice restores the XP selector.
- [ ] Reload during resolution restores lane draft inputs before commit.
- [ ] Reload after completed resolution restores results, audit entries, XP, and
      current phase.
- [ ] Start Over or Reset removes the saved game and returns to setup.

## Mobile And Tablet Checks

Run at least one full or partial pass at a phone width near 390 px and one at a
tablet width near 768 px.

- [ ] Setup controls fit without horizontal scrolling.
- [ ] Faction cards, description cards, hands, and reserves remain readable.
- [ ] Private player views are usable with touch targets at least comfortably
      tappable.
- [ ] Storyline lanes show story cards and played cards without overlap.
- [ ] Support placement controls fit and can be completed on touch devices.
- [ ] Ruling panels, XP selectors, and manual override fields do not overflow.
- [ ] Resolution forms can be completed without controls covering subsequent
      content.
- [ ] Final summary and leaderboard remain readable.

## Failure Handling

- [ ] Open a GitHub issue for every known failure before ending the test run.
- [ ] Include reproduction steps, browser/device, expected behavior, actual
      behavior, and screenshots when visual layout is involved.
- [ ] Label failures with the relevant area, such as `rulebook`, `mobile`,
      `manual-overrides`, `privacy`, `persistence`, or `assets`.
- [ ] Link severe or blocking failures from the playtest notes or PR summary.
