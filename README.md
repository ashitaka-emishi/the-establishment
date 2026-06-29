# The Establishment

A browser-based local multiplayer implementation of *The Establishment*, using
the rulebook and card assets included in this repository.

**[Open the live site and game demo →](https://ashitaka-emishi.github.io/the-establishment/)**

## Play Locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173/webgame/](http://localhost:4173/webgame/).

The game is a static HTML, CSS, and JavaScript application. It has no build step
or package dependencies.

## Build the Docs Site

This repository includes a Quarto website shell for public docs and demo
navigation. The GitHub Pages workflow renders the site and publishes `_site/`.
The playable app remains in `webgame/` and is copied into the rendered site as a
static resource.

Install Quarto, then render or preview the site project from the repository
root:

```bash
quarto render site
quarto preview site
```

The generated site is written to `_site/`.

## Features

- Rulebook-aligned setup for 2-6 players
- Faction selection with faction-specific influencer decks
- Description card selection
- Four-round storyline flow
- Snake-order influencer placement
- Society restrictions, scoring, and XP tracking
- Responsive local multiplayer interface

See [webgame/README.md](webgame/README.md) for implementation details and
current limitations. Use
[docs/FULL_GAME_PLAYTEST_CHECKLIST.md](docs/FULL_GAME_PLAYTEST_CHECKLIST.md)
for repeatable complete-game validation.

## Repository Layout

- `site/` - Quarto website shell and navigation
- `webgame/` - playable browser application
- `__docs__/` - rulebook, storybook, and card assets
- `docs/` - product roadmap, playtest checklist, and future multiplayer planning

## Roadmap

The first product target is a polished local referee that does not require
physical cards. See [docs/LOCAL_REFEREE_ROADMAP.md](docs/LOCAL_REFEREE_ROADMAP.md).

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before
opening an issue or pull request.

Community participation is governed by the
[Code of Conduct](CODE_OF_CONDUCT.md). Security concerns should follow
[SECURITY.md](SECURITY.md).

## License

The software is available under the [MIT License](LICENSE).
