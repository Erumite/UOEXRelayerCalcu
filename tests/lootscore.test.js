const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Load index.html and extract JavaScript environment
const indexPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(indexPath, 'utf8');
const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  throw new Error('Could not extract <script> from index.html');
}

const sandbox = {
  console,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  window: {
    location: { href: 'http://localhost/', search: '', hash: '' },
    addEventListener: () => {},
  },
  document: {
    getElementById: () => ({
      innerHTML: '', style: {}, textContent: '', classList: { add: () => {}, remove: () => {} }
    })
  },
  setTimeout: () => {},
  clearTimeout: () => {},
  fetch: async () => ({ ok: false })
};
sandbox.window.location = sandbox.window.location;

// Disable async browser route listener during test execution
const cleanedScript = scriptMatch[1].replace(/checkUrlForSharedItem\(\);/g, '// checkUrlForSharedItem();');

const codeToRun = cleanedScript + `
globalThis.exports = {
  getItemLootScore,
  PRESET_WEAPONS,
  NOTABLE_ITEMS
};
`;

vm.createContext(sandbox);
vm.runInContext(codeToRun, sandbox);

const { getItemLootScore, PRESET_WEAPONS, NOTABLE_ITEMS } = sandbox.exports;

function toPlainObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

test('getItemLootScore - empty / null stats', () => {
  assert.deepEqual(toPlainObject(getItemLootScore(null)), { totalSP: 0, weaponSP: 0, armorSP: 0 });
  assert.deepEqual(toPlainObject(getItemLootScore(undefined)), { totalSP: 0, weaponSP: 0, armorSP: 0 });
  assert.deepEqual(toPlainObject(getItemLootScore({})), { totalSP: 0, weaponSP: 0, armorSP: 0 });
});

test('getItemLootScore - Preset Weapons', () => {
  // Ancient Yumi: DI 50 (0), HLL 58 (174), HLT 58 (232), HLD 58 (174), HML 58 (174)
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Ancient Yumi"].stats)),
    { totalSP: 754, weaponSP: 754, armorSP: 0 }
  );

  // Titan's Hammer: Str 15 (60), HCI 15 (45), DI 50 (0)
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Titan's Hammer"].stats)),
    { totalSP: 105, weaponSP: 60, armorSP: 105 }
  );

  // Bone Crusher: Str 10 (40), DI 75 (0)
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Bone Crusher"].stats)),
    { totalSP: 40, weaponSP: 40, armorSP: 40 }
  );

  // Wind's Edge: DCI 10 (30), SSI 50 (200), DI 50 (0)
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Wind's Edge"].stats)),
    { totalSP: 230, weaponSP: 0, armorSP: 230 }
  );

  // Swords of Prosperity: Luck 200 (0), Faster Casting 1 (50) -> Armor: 50, Total: 50
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Swords of Prosperity"].stats)),
    { totalSP: 50, weaponSP: 0, armorSP: 50 }
  );

  // Ancient Composite Bow: HFB 58 (232), HLT 58 (232), HLD 58 (174), HML 58 (174)
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Ancient Composite Bow"].stats)),
    { totalSP: 812, weaponSP: 812, armorSP: 0 }
  );

  // Blaze of Death: DI 35 (0), HFA 50 (200), HFB 50 (200), SSI 25 (100), Fire Res 10 (50)
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Blaze of Death"].stats)),
    { totalSP: 550, weaponSP: 400, armorSP: 150 }
  );

  // Cavorting Club: SSI 35 (140), DI 35 (0), Resists 32 total (160)
  assert.deepEqual(
    toPlainObject(getItemLootScore(PRESET_WEAPONS["Cavorting Club"].stats)),
    { totalSP: 300, weaponSP: 0, armorSP: 300 }
  );
});

test('getItemLootScore - Notable Items', () => {
  // Spirit of Totem: Str 20 (80), Reflect 15 (45), HCI 15 (45), Resists 39 (195)
  assert.deepEqual(
    toPlainObject(getItemLootScore(NOTABLE_ITEMS["Spirit of Totem"].stats)),
    { totalSP: 365, weaponSP: 125, armorSP: 365 }
  );

  // Hide of the Werewolf King: Hits 20 (60), Regen Hits 5 (10), Stam 15 (45), Str 10 (40), Phys Res 22 (110), Cold Res 20 (100)
  assert.deepEqual(
    toPlainObject(getItemLootScore(NOTABLE_ITEMS["Hide of the Werewolf King"].stats)),
    { totalSP: 365, weaponSP: 100, armorSP: 365 }
  );

  // Jewel of Winter: Hits 20 (60), Int 8 (32), LMC 20 (100), Luck 100 (0), Regen Mana 5 (30), Reflect 20 (60), Regen Stam 7 (7), SDI 30 (60), Stam 20 (60), Str 5 (20), Resists 20 (100)
  assert.deepEqual(
    toPlainObject(getItemLootScore(NOTABLE_ITEMS["Jewel of Winter"].stats)),
    { totalSP: 529, weaponSP: 200, armorSP: 529 }
  );

  // Black Belt: DCI 15 (45), HCI 15 (45), Hits 20 (60), Luck 250 (0), Mana 20 (60), Reflect 10 (30), Stam 20 (60), Str 5 (20)
  assert.deepEqual(
    toPlainObject(getItemLootScore(NOTABLE_ITEMS["Black Belt"].stats)),
    { totalSP: 320, weaponSP: 110, armorSP: 320 }
  );

  // Cloak of Mist: DI 15 (0), Dex 8 (32), Int 8 (32), LRC 15 (75), Regen Stam 1 (1), SDI 20 (40), Str 12 (48), Resists 50 (250)
  assert.deepEqual(
    toPlainObject(getItemLootScore(NOTABLE_ITEMS["Cloak of Mist"].stats)),
    { totalSP: 478, weaponSP: 88, armorSP: 478 }
  );
});

test('getItemLootScore - In-Game / Python Tooltip Property Name Normalization', () => {
  const pythonStats = {
    "Strength Bonus": 10,       // -> Bonus Strength (40 SP)
    "Hit Point Regeneration": 3,// -> Regen Hits (6 SP)
    "Physical Resist": 15,       // -> Resist Physical (75 SP)
    "Spell Damage": 20,         // -> Spell Damage Increase (40 SP)
    "Defence Chance Increase": 10 // -> Defense Chance Increase (30 SP)
  };

  const webAppStats = {
    "Bonus Strength": 10,
    "Regen Hits": 3,
    "Resist Physical": 15,
    "Spell Damage Increase": 20,
    "Defense Chance Increase": 10
  };

  assert.deepEqual(
    toPlainObject(getItemLootScore(pythonStats)),
    toPlainObject(getItemLootScore(webAppStats))
  );

  assert.deepEqual(
    toPlainObject(getItemLootScore(pythonStats)),
    { totalSP: 191, weaponSP: 80, armorSP: 191 }
  );
});

test('getItemLootScore - Combined Resistances Property', () => {
  const statsWithResistances = {
    "Resistances": 40 // 40 * 5 = 200 SP (Armor & Total)
  };

  assert.deepEqual(
    toPlainObject(getItemLootScore(statsWithResistances)),
    { totalSP: 200, weaponSP: 0, armorSP: 200 }
  );
});

test('getItemLootScore - Excluded Attributes', () => {
  const excludedStats = {
    "Damage Increase": 50,
    "Hit Dispel": 60,
    "Luck": 200
  };

  assert.deepEqual(
    toPlainObject(getItemLootScore(excludedStats)),
    { totalSP: 0, weaponSP: 0, armorSP: 0 }
  );
});
