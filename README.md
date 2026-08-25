# Codestellation

An Obsidian plugin that turns your vault into a command center for coding
projects: a solar-system home screen (you're the sun, each project is a
planet you fly into), pulled from your real local Claude Code / Codex
session history and git repos. Not a mockup.

**v0.1, testing phase. Expect breaking changes between versions.**

## Install (beta, via BRAT)

1. Install the community plugin "BRAT" (Beta Reviewers Auto-update Tester).
2. In BRAT, add this repo as a beta plugin.
3. Enable Codestellation in Community Plugins settings.
4. Use a **local** vault, not one synced via iCloud/Dropbox. Plugin dev
   against a synced vault risks sync conflicts and partial writes.

## Install (manual, for development)

1. `npm install && npm run build` in this directory.
2. Copy `main.js`, `manifest.json`, `styles.css` into
   `<your-vault>/.obsidian/plugins/codestellation/`.
3. Enable the plugin in Obsidian's Community Plugins settings.

## Updating to a new version

**If you installed via BRAT:** BRAT doesn't update automatically. Either:
- Open the command palette (Cmd/Ctrl+P) and run **"Check for updates to all beta plugins now"**, then reload Obsidian (or disable/re-enable Codestellation) so the new build actually loads, or
- Turn on **"Auto-update plugins at startup"** in BRAT's settings, so every full Obsidian restart pulls the latest release automatically.

**If you installed manually:** download the new `main.js`, `manifest.json`, `styles.css` from the [latest release](https://github.com/AKS97i/codestellation/releases/latest) and overwrite the same three files in `<your-vault>/.obsidian/plugins/codestellation/`, then reload Obsidian.

Either way, check Settings → Community Plugins → Codestellation afterward — the version number shown there should match the release you just installed.

## What it actually does right now

- **Onboarding**: detects local Claude Code / Codex session history, finds
  the projects you've actually worked in, imports the ones you pick,
  generates a `graphify` graph for any that don't have one yet (with an
  automatic code-only fallback if no LLM API key is configured), and
  writes everything into `<vault>/Codestellation/`. Requires the
  `graphify` CLI to already be installed separately.
- **Home screen**: your imported projects as orbiting planets. Click one
  to fly it to center, then **Launch** into its workspace.
- **Project workspace**: five tabs on real data:
  - **Overview**: session count, tokens used (with a per-model
    breakdown), an estimated time-spent figure, branch count, last active.
  - **Chats**: every Claude/Codex session found for the project, newest
    first, filterable by agent, with a "copy resume command" button.
  - **Branches**: local/remote/both, stale flags (30+ days), plus a
    two-branch comparator (unique commits per side, changed-file list).
  - **Graph**: opens the exported `.canvas` file (rendered natively by
    Obsidian's own Canvas core plugin), a shortcut into Obsidian's native
    Graph View, and a live interactive canvas of graph.json (pan/zoom)
    that highlights the node you're touching in real time while a Claude
    Code session is active in that project.
  - **Work Log**: pick a date, get a real commit list and session stats
    for that day, plus an AI-written bullet summary via `claude -p`
    (falls back to a plain commit list if the Claude CLI isn't found).
- **Check-in**: a status-bar timer you start explicitly, notifies you at
  your configured target (defaults to 8h, settable to any value,
  including a minute, for testing).
- **Diagnostics**: `Codestellation: Show diagnostics` command dumps every
  path it checked, what it found, and how many session log lines it
  couldn't parse. Paste this into a bug report.
- **Reset**: `Codestellation: Reset plugin data` command clears the
  project registry and re-triggers onboarding, without touching anything
  already written into your vault.

## Honest list of what's estimated, faked, or missing

- **"Tokens saved" is not tracked yet.** The formula is decided (actual
  graphify-context cost vs. hypothetical raw-file-read cost), but nothing
  in this build issues a live graphify query to measure against, so the
  Overview tab shows "not tracked yet" rather than a number.
- **Time-spent is an estimate, not a measurement.** Each session's span
  (last log line minus first) is capped at 4 hours to avoid counting an
  editor left open overnight as a 10-hour work session. There's no
  per-message timestamp history to do real idle-gap detection against.
- **Live graph highlighting works, but with real caveats.** The canvas
  layout is a deterministic radial layout grouped by community, not a
  physics-based force simulation (a real force sim needs level-of-detail
  engineering to hold 60fps past a few thousand nodes, which didn't fit
  alongside everything else here; see the layout code for the full
  reasoning). Large graphs render only their largest communities up to a
  node cap, visibly labeled ("X of Y nodes shown"), never silently
  truncated. It also does one session-discovery pass when the Graph tab
  opens, not continuous rediscovery, so starting a brand new session
  after that won't be picked up until you reopen the tab.
- **Codex's resume command was never verified.** The Chats tab copies the
  session id with a note to check your Codex CLI's own `--help`, rather
  than guessing a flag that might be wrong.
- **Windows is unverified end to end.** Path handling doesn't hardcode
  Unix conventions where avoidable, but nobody has confirmed Claude Code
  and Codex use the same `~/.claude` / `~/.codex` locations on Windows, or
  that graphify ships a Windows build at all.
- **graphify writes into your project folder, not just the vault.** Running graphify creates `<project>/graphify-out/` in your actual codebase (graphify's own behavior, no flag to redirect it, and it needs to stay there for graphify's own incremental caching). Codestellation automatically adds `graphify-out/` to that project's `.gitignore` if it's a git repo, so it won't get committed, but the folder itself does live in your project directory.
- **No caching layer.** Every workspace open re-scans every session file
  on disk from scratch. Fine at the scale tested during development
  (dozens of sessions); would need real caching before hundreds.
- **Branch comparison is file-level, not node-level.** The plan's stretch
  goal was a structural graphify diff (build/read a graph per ref, diff
  node sets); that needs either two graphify builds or a worktree
  checkout per comparison, which was judged too expensive to build
  speculatively. What's here (`git diff --name-status` between two refs'
  merge-base) is real and useful, just not graph-aware.
