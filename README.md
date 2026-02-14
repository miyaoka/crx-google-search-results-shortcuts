# Google Search Results Shortcuts

A browser extension that adds keyboard navigation to Google search results. Navigate search results, switch pages, and change search types without a mouse using Vim-like keybindings (hjkl).

<!-- TODO: Add Chrome Web Store URL -->
<!-- [Chrome Web Store](https://chromewebstore.google.com/detail/xxx) -->

## Keybindings

### Navigation

| Key | Action |
| --- | --- |
| <kbd>J</kbd> / <kbd>↓</kbd> | Focus next search result |
| <kbd>K</kbd> / <kbd>↑</kbd> | Focus previous search result |
| <kbd>L</kbd> / <kbd>→</kbd> | Go to next page |
| <kbd>H</kbd> / <kbd>←</kbd> | Go to previous page |
| <kbd>/</kbd> | Focus search input |

### Switch Search Type (Leader key: <kbd>G</kbd>)

Press <kbd>G</kbd> followed by one of the keys below to switch the search type.

| Key | Action |
| --- | --- |
| <kbd>A</kbd> | All |
| <kbd>I</kbd> | Images |
| <kbd>V</kbd> | Videos |
| <kbd>M</kbd> | Maps |
| <kbd>N</kbd> | News |
| <kbd>Shift</kbd>+<kbd>V</kbd> | Verbatim (exact match) |

> [!NOTE]
> Keyboard shortcuts are automatically disabled while a form input (e.g. search box) is focused.

## Installation

### From Chrome Web Store

<!-- TODO: Add Chrome Web Store URL -->

### Build from Source

Prerequisites: [mise](https://mise.jdx.dev/)

```sh
mise install
pnpm install
pnpm build
```

After building, open `chrome://extensions`, enable "Developer mode", and click "Load unpacked" to select the `.output/chrome-mv3` directory.

For Firefox:

```sh
pnpm build:firefox
```

## Development

```sh
pnpm dev
```

Starts a dev server with HMR for instant code reloading.

```sh
pnpm run typecheck   # Type check (tsgo)
pnpm run lint        # Lint + format check
pnpm run fix         # Auto-fix
```

## Tech Stack

- [WXT](https://wxt.dev/) — Browser extension framework
- [TypeScript](https://www.typescriptlang.org/) + [tsgo](https://github.com/nicolo-ribaudo/tc39-proposal-type-annotations) — Type checking
- [Oxlint](https://oxc.rs/) + [Oxfmt](https://oxc.rs/) — Rust-based linter / formatter
- [Lefthook](https://github.com/evilmartians/lefthook) — Git hooks manager

## License

MIT
