# The Establishment

A browser-based local multiplayer implementation of *The Establishment*, using
the rulebook and card assets included in this repository.

**[Play the demo →](https://ashitaka-emishi.github.io/the-establishment/)**

## Play Locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173/webgame/](http://localhost:4173/webgame/).

The game is a static HTML, CSS, and JavaScript application. It has no build step
or package dependencies.

## Features

- Rulebook-aligned setup for 2-6 players
- Faction selection with faction-specific influencer decks
- Description card selection
- Four-round storyline flow
- Snake-order influencer placement
- Society restrictions, scoring, and XP tracking
- Responsive local multiplayer interface

See [webgame/README.md](webgame/README.md) for implementation details and
current limitations.

## Repository Layout

- `webgame/` - playable browser application
- `__docs__/` - rulebook, storybook, and card assets
- `docs/` - product roadmap and future multiplayer planning

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
