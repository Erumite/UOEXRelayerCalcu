# UO Excelsior Relayer Calculator and Gear Planner

Deployed at: [https://erumite.github.io/UOEXRelayerCalcu/](https://erumite.github.io/UOEXRelayerCalcu/)

A browser-based tool for planning levelable weapon relayers across all equipment slots on the [UO Excelsior](https://uoex.net) Ultima Online shard. Plan your builds, track SP budgets, and keep a shopping list of deeds before committing your hard-earned ED.

## Features

- **19 equipment slots** including Weapon, Shield, and all armor slots (Hands, Skirt, Shirt, Sash, Earrings, Arms, Robe, Head, Ring, Footwear, Belt, Bracelet, Neck, Back, Legs, Chest, Totem)
- **Preset weapons** for quick setup (Blaze of Death, Titan's Hammer, Bone Crusher, Swords of Prosperity, Cavorting Club)
- **Notable items** with fixed stats (Spirit of Totem, Hide of the Werewolf King, Jewel of Winter, Black Belt, Cloak of Mist)
- **Custom weapons and clothing** - input looted/found items with any base stats and save them as reusable presets
- **SP budget calculator** - tracks spending points based on weapon type (Crafted 3 SP/lvl, Normal 5 SP/lvl) with support for up to 10 leveling deeds
- **Arti-tag handling** - tracks the 2x SP cost penalty and Weapon Change Deed to remove it (also upgrades Crafted to Normal)
- **Deed tracking** - leveling deeds, luck deeds, spell channeling, self repair, use best skill, remove mage weapon
- **Totals Summary** - shows the sum of every attribute across all slots vs gear caps, with color coding for at-cap (green) and over-cap (red)
- **Base character stats** - input your naked STR/DEX/INT to include in the totals
- **Unequip toggle** - temporarily exclude any armor/shield slot from totals to see what you'd lose by swapping gear
- **Shopping list** - aggregates all needed deeds with ED costs, checkboxes to track purchases, and a progress bar
- **Local browser storage** - auto-saves on every change
- **Import/Export** - back up or share builds as JSON files

## How to Use

### 1. Select a Slot

Click any tab along the top to configure that slot. The **Weapon** tab (red) is for your equipped weapon. The **Shield** tab (blue) is for your off-hand. All other tabs are armor slots.

- A green dot on a tab means that slot has been configured.

### 2. Choose a Weapon or Item

Each slot has a dropdown to select what goes there:

- **Preset Weapons** - known artifact weapons with predefined base stats, ready to level.
- **Notable Items** - unique items with fixed stats that cannot be leveled (e.g. Spirit of Totem). These still support Luck Deeds.
- **Saved Custom Weapons/Clothing** - your previously saved custom items.
- **Custom Weapon** - enter a looted weapon's base stats manually. Choose Normal or Crafted type, toggle Arti-Tagged if applicable, and optionally save it as a reusable preset.
- **Custom Clothing** - enter fixed stats for a non-levelable armor piece and optionally save it.

### 3. Configure Deeds and Spend SP

For levelable weapons:

- **Leveling Deeds** (+10 Levels each, 100 ED) - up to 10 deeds, each granting a bonus level's worth of SP.
- **Luck Deeds** (+100 Luck each, 100 ED) - capped at 400 total Luck including any base weapon luck.
- **Weapon Change Deed** (200 ED) - removes the Arti-Tag (2x SP cost penalty) or upgrades a Crafted weapon to Normal (5 SP/lvl).
- **Other deeds** - Spell Channeling, Self Repair 5, Use Best Skill, Remove Mage Weapon (weapon slot only for some).

The SP budget bar shows your total, spent, and remaining points. Allocate SP across attributes in the table below - each shows the per-point cost, your base value from the weapon, allocated points, slot total, and the max for that slot.

### 4. Review Totals

Click **Totals Summary** to see every attribute summed across all equipped slots compared to gear caps. Enter your character's base STR/DEX/INT (naked stats) to include those in the totals. Use the **Unequip** checkbox on any slot to temporarily exclude it and see the impact.

### 5. Shopping List

Click **Shopping List** to see all deeds needed across every slot, grouped by slot with ED costs. Check off deeds as you purchase them to track progress (e.g. "1,200 / 4,500 ED").

### 6. Save and Share

- Changes auto-save to your browser's local storage.
- Use **Export JSON** to download your full build as a file.
- Use **Import JSON** to load a previously exported build.
- Use **Reset All Slots** to start over.

## Technical Details

- Single HTML file with embedded CSS and JavaScript
- No dependencies, no build step, no server required
- Uses `localStorage` for persistence
- Works in any modern browser

## Links

- [UO:EX Levelable Weapons Wiki](https://uoex.net/wiki/Levelable_Weapons)
- [UO:EX Stat Caps Wiki](https://uoex.net/wiki/Stat_Caps)
- [UO:EX ED Rewards Wiki](https://uoex.net/wiki/ED_Rewards)
- [Support on Ko-fi](https://ko-fi.com/eremite)
