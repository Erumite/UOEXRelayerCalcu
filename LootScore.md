# LootScore Calculation Guide

This document explains how **LootScore** is calculated in the UO Excelsior Relayer Calculator web application. 

The LootScore system rates weapons and equipment based on their base Spending Point (SP) value.

---

## Overview

LootScore measures the value of an item's base properties across three dimensions:

- ⚔️ **Weapon Value (`weaponSP`)**: The SP value of attributes that provide combat utility when actively wielding the item as a weapon:
  * HP/MP/Stamina Leech
  * Hit Lightning, Fireball, Harm, Magic Arrow
  * Hit Area Effects: Fire, Energy, Poison, Cold, Physical
  * Other useful attributes people tend to stack on weapons as well:
    * Spell Damage Increase
    * Bonus Strength
    * Bonus Hits
    * Reflect Physical Damage
- 🛡️ **Armor Value (`armorSP`)**: The SP value of attributes that provide utility when wearing the item or when relayering it onto armor slots (e.g., defense chance, hit chance, swing speed, stats, resists, regens, lower mana cost, lower reagent cost).
- 💎 **Total Value (`totalSP`)**: The combined SP value of all evaluable properties on the item (`weaponSP` + `armorSP` minus overlapping shared properties).

Some attributes such as Hit Dispel or Damage Increase are ignored. (See Below)


---

## Attribute Evaluation Matrix

| Attribute Name | SP / Point | In-Game / Python Name | Weapon Score (⚔️) | Armor Score (🛡️) | Total Score (💎) |
| :--- | :---: | :--- | :---: | :---: | :---: |
| **Hit Life Leech** | 3 | `Hit Life Leech` | ✅ | ❌ | ✅ |
| **Hit Stamina Leech** | 3 | `Hit Stamina Leech` | ✅ | ❌ | ✅ |
| **Hit Mana Leech** | 3 | `Hit Mana Leech` | ✅ | ❌ | ✅ |
| **Hit Lower Attack** | 3 | `Hit Lower Attack` | ✅ | ❌ | ✅ |
| **Hit Lower Defense** | 3 | `Hit Lower Defense` | ✅ | ❌ | ✅ |
| **Hit Magic Arrow** | 4 | `Hit Magic Arrow` | ✅ | ❌ | ✅ |
| **Hit Harm** | 4 | `Hit Harm` | ✅ | ❌ | ✅ |
| **Hit Fireball** | 4 | `Hit Fireball` | ✅ | ❌ | ✅ |
| **Hit Lightning** | 4 | `Hit Lightning` | ✅ | ❌ | ✅ |
| **Hit Physical Area** | 4 | `Hit Physical Area` | ✅ | ❌ | ✅ |
| **Hit Fire Area** | 4 | `Hit Fire Area` | ✅ | ❌ | ✅ |
| **Hit Cold Area** | 4 | `Hit Cold Area` | ✅ | ❌ | ✅ |
| **Hit Poison Area** | 4 | `Hit Poison Area` | ✅ | ❌ | ✅ |
| **Hit Energy Area** | 4 | `Hit Energy Area` | ✅ | ❌ | ✅ |
| **Reflect Physical Damage** | 3 | `Reflect Physical Damage` | ✅ | ✅ | ✅ |
| **Spell Damage Increase** | 2 | `Spell Damage` | ✅ | ✅ | ✅ |
| **Bonus Strength** | 4 | `Strength Bonus` | ✅ | ✅ | ✅ |
| **Bonus Hits** | 3 | `Hit Point Increase` | ✅ | ✅ | ✅ |
| **Defense Chance Increase** | 3 | `Defence Chance Increase` | ❌ | ✅ | ✅ |
| **Hit Chance Increase** | 3 | `Hit Chance Increase` | ❌ | ✅ | ✅ |
| **Swing Speed Increase** | 4 | `Swing Speed Increase` | ❌ | ✅ | ✅ |
| **Faster Casting** | 50 | `Faster Casting` | ❌ | ✅ | ✅ |
| **Faster Cast Recovery** | 5 | `Faster Cast Recovery` | ❌ | ✅ | ✅ |
| **Lower Mana Cost** | 5 | `Lower Mana Cost` | ❌ | ✅ | ✅ |
| **Lower Reagent Cost** | 5 | `Lower Reagent Cost` | ❌ | ✅ | ✅ |
| **Enhance Potions** | 2 | `Enhance Potions` | ❌ | ✅ | ✅ |
| **Regen Hits** | 2 | `Hit Point Regeneration` | ❌ | ✅ | ✅ |
| **Regen Stamina** | 1 | `Stamina Regeneration` | ❌ | ✅ | ✅ |
| **Regen Mana** | 6 | `Mana Regeneration` | ❌ | ✅ | ✅ |
| **Bonus Dex** | 4 | `Dexterity Bonus` | ❌ | ✅ | ✅ |
| **Bonus Int** | 4 | `Intelligence Bonus` | ❌ | ✅ | ✅ |
| **Bonus Stamina** | 3 | `Stamina Increase` | ❌ | ✅ | ✅ |
| **Bonus Mana** | 3 | `Mana Increase` | ❌ | ✅ | ✅ |
| **Resist Physical** | 5 | `Physical Resist` | ❌ | ✅ | ✅ |
| **Resist Fire** | 5 | `Fire Resist` | ❌ | ✅ | ✅ |
| **Resist Cold** | 5 | `Cold Resist` | ❌ | ✅ | ✅ |
| **Resist Poison** | 5 | `Poison Resist` | ❌ | ✅ | ✅ |
| **Resist Energy** | 5 | `Energy Resist` | ❌ | ✅ | ✅ |
| **Resistances (Combined)** | 5 | `Resistances` | ❌ | ✅ | ✅ |

### Excluded Attributes

The following properties do not contribute to LootScore (matching Python's `skip_keywords` and `weapon_point_map` filter):

- **Damage Increase**: Excluded from point map. Sharpening Stones can make up any deficiency. 
- **Hit Dispel**: Excluded from point map. Useless.
- **Luck**: Excluded from SP loot score.  Add with Luck Deeds to save SP.

---

## Example

### Blaze of Death
- **Stats**: Damage Increase 35% (0 SP), Hit Fire Area 50% (200 SP), Hit Fireball 50% (200 SP), Swing Speed Increase 25% (100 SP), Resist Fire 10% (50 SP).
- **Scores**:
  - ⚔️ **Weapon**: `200 + 200 = 400 SP`
  - 🛡️ **Armor**: `100 + 50 = 150 SP`
  - 💎 **Total**: `400 + 150 = 550 SP`

---

## Running Tests

To verify LootScore calculations against the test suite, run:

```bash
rtk node --test tests/lootscore.test.js
```
