# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A gear planning tool for UO Excelsior (uoex.net) — an Ultima Online shard. Helps players plan levelable weapon relayers across 20 equipment slots, track spending points (SP), and manage deed costs.

- **Live site**: https://erumite.github.io/UOEXRelayerCalcu/
- **Repo**: git@github-personal:Erumite/UOEXRelayerCalcu.git (GitHub Pages deployment)

## Development

**No build step, no dependencies, no server required.** The entire application is a single `index.html` file (~2300 lines) with embedded CSS and JavaScript. Open it directly in a browser to test.

To verify changes, open `index.html` in a browser and interact with the UI. There are no tests, linters, or CI pipelines.

## Architecture

### Single-file structure (index.html)

1. **CSS** (lines 1–570): Dark theme with CSS variables in `:root`. Color-coded attribute categories (hits=red, melee=orange, magic=blue, stats=green, resists=purple).
2. **HTML** (lines 570–574): Minimal skeleton — just `<div id="app">` and a toast element. All UI is rendered dynamically.
3. **JavaScript** (line 574+): All application logic.

### Key data structures

- **`SLOTS`** — Array of 20 slot names. Index 0 is always the Weapon slot.
- **`ATTRIBUTES`** — Array of ~30 attribute definitions, each with `{name, cat, sp, max, cap}`. `sp` = cost per point, `max` = per-item cap, `cap` = character-wide cap (null = uncapped).
- **`PRESET_WEAPONS`** / **`NOTABLE_ITEMS`** — Predefined items with fixed base stats.
- **`state`** — Global mutable state object containing `slots[]`, `savedWeapons[]`, `savedClothing[]`, `baseStats`, `buffs`, UI toggles, and shopping list checkmarks.

### State management pattern

All state lives in the global `state` object. Every mutation calls `renderSlot()` + `renderSummary()` + `autoSave()`. Persistence is via `localStorage` using `compactState()` (strips defaults/zeros) and `loadFromStorage()` (merges with `createEmptySlot()` defaults for backward compatibility).

### Key functions

- **`createEmptySlot()`** — Factory for slot state with all allocations zeroed.
- **`getWeaponInfo(slot)`** — Returns computed metadata for a slot: type, stats, SP rate, arti-tagged status. Central to all calculations.
- **`getTotalSP(slot)`** — `(99 + min(levelingDeeds, 10)) * spPerLevel`. Normal=5 SP/lvl, Crafted=3 SP/lvl.
- **`getSpentSP(slot)`** — Sums `allocation * cost` across all attributes. Arti-tagged items pay 2x.
- **`getSlotTotal(slot, attrName)`** — Base stats + allocated points for one attribute on one slot.
- **`updateAlloc(slotIdx, attrName, value, maxAlloc)`** — Central allocation setter with per-attribute and SP budget clamping.
- **`allocMax()`** — Sets attribute to maximum affordable given remaining SP.
- **`renderSlot()` / `renderSummary()`** — Full re-render of slot panel and totals summary.

### Slot-awareness rules

- "Weapon Hits" category only displayed on the Weapon slot (index 0).
- "Melee" and "Resistances" categories hidden on Weapon slot (except Spell Damage Increase).
- Notable items have fixed stats and cannot be leveled (SP budget = 0).

### Buff system

Buffs in `state.buffs` modify character stats and resist caps. Some are mutually exclusive (Vampiric Embrace vs Angelic Faith; Strength Spell vs Strength Potions). Resist caps adjust dynamically when buffs are active.

## Domain Notes

- **SP Budget**: Each levelable weapon has a finite SP pool. Players allocate SP across attributes — this is the core mechanic the tool optimizes.
- **Arti-Tagged**: Some weapons cost 2x SP per point. A Weapon Change Deed (200 ED) removes this penalty.
- **Leveling Deeds**: Up to 10, each adds 10 bonus levels worth of SP (100 ED each).
- **Luck Deeds**: +100 luck each, total capped at 400 per slot.
- **ED**: Donation currency used to purchase deeds. The Shopping List aggregates costs across all slots.
