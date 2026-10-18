# DawnTactics AI

> **Land of Dawn Draft Intelligence, Reactive Itemization & Emblem Strategy Engine**  
> A high-rank competitive companion for Mobile Legends: Bang Bang (MLBB).

---

## 🌟 Features & Modules

### 1. Live Draft Assistant & Counter-Picker
- **Interactive 5v5 Draft Board**: Blue Team vs. Red Team across EXP, Jungle, Mid, Gold, and Roam lanes.
- **Lane Indicator Accents**:
  - **EXP Lane**: `#EF4444` (Crimson)
  - **Jungle**: `#10B981` (Emerald)
  - **Mid Lane**: `#8B5CF6` (Amethyst)
  - **Gold Lane**: `#F59E0B` (Gold)
  - **Roam**: `#3B82F6` (Cobalt)
- **Real-Time Composition Metrics**:
  - Physical vs. Magic vs. True Damage distribution split.
  - CC Lockdown Score (0–100 index) evaluating airborne, suppressions, stuns, and slows.
  - Macro Power Curve (Early 0–5m, Mid 5–12m, Late 12m+).
  - Frontline Durability Rating (0–100 index).
- **Dynamic Counter Recommendations**: Clicking any enemy slot updates priority recommendations with hard counters, synergistic partner picks, and ban recommendations.
- **Animated SVG Win-Rate Meter**: Live predicted win probability gauge dynamically calibrated against draft differentials.
- **Preset Scenarios**: 1-click loading of iconic drafts (M-World Sustain Deathball, Dive Burst Comp, Wombo Combo Teamfight).

### 2. Reactive Itemization & Equipment Matrix
- **Opposing 5-Man Lineup Evaluation**: Select any ally hero to generate a custom 6-item reactive build rather than static builds.
- **Direct Counter Rules**:
  - **Anti-Heal / Life Drain**: Dominance Ice (Tanks/EXP/Roam), Sea Halberd (Physical DPS), Glowing Wand (Magic DPS) against sustain (Estes, Ruby, Uranus, Yu Zhong).
  - **Magic Defense Triaging**: Radiant Armor for continuous tick damage (Chang'e, Valir, Yve, Kimmy) vs. Athena's Shield for single-rotation burst (Kadita, Pharsa, Eudora, Aurora).
  - **Armor Penetration Scaling**: Malefic Roar (scales physical penetration dynamically based on enemy armor) and Divine Glaive (% magic pen).
  - **Anti-Crit & Physical Burst**: Blade Armor (reflect & 20% crit reduction) vs. Antique Cuirass (-18% physical attack on skill hit).
- **Death-Defying Item Swapping Visualizer & Simulator**:
  - Step-by-step timeline: Immortality -> Winter Crown -> Rose Gold Meteor / Wind of Nature.
  - Real-time countdown clock (2.5s resurrect -> 2.0s freeze -> 2.0s immune), APM practice drill, and gold bank calculator.
- **Equipment Compendium**: Filterable catalog with hover badges showing stats, unique passives, counter tags, and trigger conditions.

### 3. Modular Emblem & Talent Builder
- **MLBB 3-Tier Talent System**:
  - **7 Base Emblems**: Assassin, Fighter, Mage, Tank, Marksman, Support, Common with active baseline attributes.
  - **Tier 1 (Stats)**: Thrill, Swift, Vitality, Rupture, Inspire, Firmness, Agility, Fatal.
  - **Tier 2 (Combat Utility)**: Seasoned Hunter, Tenacity, Master Assassin, Bargain Hunter, Festival of Blood, Pull Yourself Together, Weapons Master, Wilderness Blessing.
  - **Tier 3 (Core Passives)**: Killing Spree, Impure Rage, Quantum Charge, Concussive Blast, Weakness Finder, Temporal Reign, Lethal Ignition, Brave Smite, Focus Mark, War Cry.
- **Matchup-Adaptive Engine**: Select any hero and lane opponent to calculate the exact optimal talent trio, synergy rationale, and matchup-adaptive notes.
- **Talent Code Exporter**: 1-click copy of shareable talent build codes.

### 4. Ask DawnOracle Tactical AI (Domain-Locked)
- **Domain-Locked Conversational Assistant**:
  - Strictly dedicated to MLBB rotations, hero counters, battle spell cooldowns, lane wave control, and item builds.
  - Rejects off-topic inquiries with celestial in-universe guardian responses.
- **Quick Inquiry Chips**: Instant queries for Fanny counters, Radiant vs Athena triage, wave freezing, spell cooldowns, and roamer rotations.
- **Battle Spell Matrix**: Cooldown tracking index for all 11 battle spells (Flicker 120s, Purify 90s, Retribution 35s, etc.).

---

## 🎨 UI Aesthetic & Design System
- **Theme**: High-rank competitive dark-gold aesthetic.
- **Primary Canvas**: `#0A0E17` (Void Obsidian)
- **Card Surfaces**: `#111827` with `#1F2937` borders
- **Mythic Gold Accents**: `#F59E0B` & `#FBBF24`
- **Audio & Visual**: Tactile Web Audio sound effects and custom animations.

---

## 🚀 Getting Started

### Development Mode
- **Standard HTTP** (`http://localhost:5173`):
  ```bash
  npm run dev
  ```
- **Native HTTPS** with SSL (`https://localhost:5173`):
  ```bash
  npm run dev:https
  ```
  *(When accessing HTTPS locally for the first time, click "Advanced -> Proceed to localhost" in your browser).*

### Production Mode
```bash
npm run build
npm start
```
Serves both the API endpoints and the optimized single-page frontend on `http://localhost:3005`.

---

## 📡 API Endpoints
- `GET /api/health` - Server health and version status
- `GET /api/heroes` - Comprehensive roster of 35+ heroes
- `GET /api/items` - Equipment catalog and counter tags
- `GET /api/emblems` - Base emblems, talents, and presets
- `POST /api/draft/evaluate` - 5v5 draft metrics and win rate calculation
- `POST /api/items/recommend` - Reactive 6-item build generation
- `POST /api/emblems/recommend` - 3-tier talent optimization
- `POST /api/oracle/chat` - Domain-locked tactical conversational query engine
