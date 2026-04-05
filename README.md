# UO Excelsior Relayer Calculator and Gear Planner

Deployed at: [https://erumite.github.io/UOEXRelayerCalcu/](https://erumite.github.io/UOEXRelayerCalcu/)

A browser-based tool for planning levelable weapon relayers across all equipment slots on the [UO Excelsior](https://uoex.net) Ultima Online shard. Plan your builds, track SP budgets, and keep a shopping list of deeds before committing your hard-earned ED.

## Features

- **20 equipment slots** — Weapon (red tab), Shield (blue tab), and 18 armor slots (Hands, Skirt, Shirt, Sash, Earrings, Arms, Robe, Head, Ring, Footwear, Belt, Bracelet, Neck, Back, Legs, Chest, Totem)
- **Preset weapons** — Ancient Yumi, Blaze of Death, Titan's Hammer, Bone Crusher, Swords of Prosperity, Cavorting Club, Wind's Edge (filtered by slot type)
- **Notable items** with fixed stats — Spirit of Totem, Hide of the Werewolf King, Jewel of Winter, Black Belt, Cloak of Mist (native slot awareness for relayer deed costs)
- **Custom weapons and clothing** — input any base stats, save as reusable presets, edit or delete saved items
- **SP budget calculator** — Normal weapons gain 5 SP/lvl, Crafted gain 3 SP/lvl. A level 100 weapon has 495 base SP, plus up to 10 Leveling Deeds for bonus SP
- **Weapon Change Deed** — removes Arti-Tag (2x SP cost) or upgrades Crafted to Normal (5 SP/lvl) for 200 ED
- **Deed tracking** — Leveling, Luck, Spell Channeling, Self Repair 5, Use Best Skill, Remove Mage Weapon, Mage Armor (with informational tooltips on each)
- **Attribute allocation** — 0/-/+/MAX buttons for quick SP spending, with a Cap column showing distance from gear caps (yellow = under, green = at cap, red = over)
- **Slot-aware display** — Weapon Hits only on Weapon tab; Melee/Magic/Resistances hidden on Weapon tab (except Spell Damage Increase); recommended attributes bolded on armor slots
- **Character Status Bar** — calculated HP, Stamina, Mana, Luck, Stat Cap, and all five resists (capped at 70)
- **Base Stats** — input naked STR/DEX/INT and stat cap (300-350) to include in calculations
- **Active Buffs** — toggle spells and effects that modify your stats:
  - **Protection** — -9% Physical Resist (with max Inscription)
  - **Bless** — +11% STR/DEX/INT (shows calculated values)
  - **Vampiric Embrace** — +15 Stam Regen, +3 Mana Regen, -25% Fire Resist (mutually exclusive with Angelic Faith)
  - **Angelic Faith** — +20 STR/DEX/INT at 100 Spirit Speak (mutually exclusive with Vampiric Embrace)
  - **Strength Potion** — +10 STR scaled by Enhance Potions (mutually exclusive with Greater Str Potion and Str Spell)
  - **Greater Strength Potion** — +20 STR scaled by Enhance Potions (mutually exclusive with Str Potion and Str Spell)
  - **Strength Spell** — +11 STR flat (mutually exclusive with Str Potions)
- **Resist caps** — dynamic caps in Totals Summary adjust when buffs are active (e.g. Fire Resist target becomes 95 with Vampiric Embrace)
- **Totals Summary** — attribute totals with progress bars vs gear caps, per-slot breakdown columns, and clickable column headers to toggle equip/unequip
- **Weapon Hits panel** — compact display of all weapon hit effects alongside the character status bar
- **Unequip toggle** — temporarily exclude any armor/shield slot from totals to see the impact of removing gear (click checkbox or column header in summary)
- **Shopping List** — aggregates all needed deeds (Relayer, Leveling, Luck, Weapon Change, etc.) with ED costs, grouped by slot. Check off purchases to track progress
- **Local browser storage** — auto-saves on every change
- **Import/Export** — back up or share builds as JSON files

## How to Use

### 1. Select a Slot

Click any tab along the top to configure that slot. The **Weapon** tab (red) is for your equipped weapon. The **Shield** tab (blue) is for your off-hand. All other tabs are armor slots.

- A green dot on a tab means that slot has been configured.
- A strikethrough tab means the slot is unequipped (excluded from totals).

### 2. Choose a Weapon or Item

Each slot has a dropdown to select what goes there:

- **Preset Weapons** — known weapons with predefined base stats, ready to level. Filtered by slot type (some are weapon-only, some armor-only, some both).
- **Notable Items** — unique items with fixed stats that cannot be leveled (e.g. Spirit of Totem). These still support Luck Deeds. A relayer deed is only needed if placed outside their native slot.
- **Saved Custom Weapons/Clothing** — your previously saved custom items. Click **Edit / Delete** when selected to modify stats or remove them.
- **Custom Weapon** — enter a looted weapon's base stats manually. Choose Normal or Crafted type, toggle Arti-Tagged if applicable, and optionally save it as a reusable preset.
- **Custom Clothing** — enter fixed stats for a non-levelable armor piece (Weapon Hits excluded) and optionally save it.

### 3. Configure Deeds and Spend SP

For levelable weapons:

- **Leveling Deeds** (+10 Levels each, 100 ED) — up to 10 deeds, each granting a bonus level's worth of SP.
- **Luck Deeds** (+100 Luck each, 100 ED) — capped at 400 total Luck including any base weapon luck. You can add a deed even if it would slightly overshoot (e.g. 315 + 100 = 400 capped).
- **Weapon Change Deed** (200 ED) — removes the Arti-Tag (2x SP cost penalty) or upgrades a Crafted weapon to Normal (5 SP/lvl).
- **Other deeds** — Spell Channeling (weapon only), Self Repair 5, Use Best Skill (weapon only), Remove Mage Weapon, Mage Armor (armor only). Hover over the [?] icons for details on when each is useful.

Use the **0 / - / + / MAX** buttons to allocate SP quickly. The SP cost is shown inline (e.g. "3x" means 3 SP per point). The **Progress** column shows a bar graph with gold for base stats and green for allocated points. The **Cap** column shows how far you are from the gear cap across all slots.

Attributes shown in **bold** on armor slots (Reflect Physical Damage, Spell Damage Increase, Enhance Potions, Bonus Strength, Bonus Hits, Bonus Dex) are recommended to always max out.

### 4. Review Totals

Click **Totals Summary** to see the full picture:

- **Base Stats** — enter your character's naked STR/DEX/INT and stat cap (300 default, up to 350).
- **Character Status Bar** — shows calculated Strength, Dexterity, Intelligence, Hit Points, Stamina, Mana, Luck, Stat Cap usage, and all five resists (capped at 70).
- **Active Buffs** — toggle spells and effects to see their impact on the status bar. Mutually exclusive buffs auto-uncheck each other.
- **Weapon Hits** — compact panel showing all weapon hit effects from the Weapon slot.
- **Attribute Table** — every attribute summed across all equipped slots with progress bars vs gear caps. Per-slot values shown in compact columns to the right. Click any column header to toggle equip/unequip for that slot.

### 5. Shopping List

Click **Shopping List** to see all deeds needed across every slot, grouped by slot with ED costs. Includes Relayer Deeds (500 ED, not needed for notable items in their native slot or the Weapon slot), plus all configured deed types. Check off deeds as you purchase them to track progress (e.g. "1,200 / 4,500 ED").

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
