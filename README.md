# DawnTactics AI

> **Land of Dawn Draft Intelligence, Reactive Itemization & Emblem Strategy Engine**  
> A high-rank competitive companion for Mobile Legends: Bang Bang (MLBB), powered by Google Gemini AI, Flutter, and React.

---

## 🌐 Live Railway Deployment & Downloads

| Service / Platform | Live Public Link | Description |
| :--- | :--- | :--- |
| **Official Web App** | [dawntactics-ai-production.up.railway.app](https://dawntactics-ai-production.up.railway.app/) | Full Land of Dawn draft simulator, 5-man team builder, and item counter analyzer. |
| **Download Landing Page** | [/download](https://dawntactics-ai-production.up.railway.app/download) | Smart device detection with dedicated iPhone and Android install centers. |
| **🍎 Apple iPhone / iPad** | [DawnTactics.mobileconfig](https://dawntactics-ai-production.up.railway.app/DawnTactics.mobileconfig) | 1-Click Apple WebClip configuration profile for home-screen installation. |
| **🤖 Android Smartphone** | [DawnTactics.apk (144.5 MB)](https://dawntactics-ai-production.up.railway.app/DawnTactics.apk) | Direct native Android APK with 134 heroes and offline intelligence engine. |

---

## 🛠️ Technologies Used

### 1. Frontend & Web Application (PWA)
* **React 18** — Component-driven reactive UI for real-time draft updates, lane clash matrices, and duel calculations.
* **TypeScript 5.7** — Strict static typing across all 134 heroes, 58 items, talent trees, and draft algorithms.
* **Vite 6** — Next-generation frontend tooling and production bundler with lightning-fast HMR.
* **Tailwind CSS 3.4** — Custom Land of Dawn Mythic dark/gold gaming design system with responsive layouts.
* **Lucide React** — Modern, lightweight vector icons for roles, lanes, items, and platform badges.
* **Progressive Web App (PWA)**:
  * **Service Worker (`sw.js`)** — Full offline caching for zero-latency loading.
  * **Web App Manifest (`manifest.json`)** — Standalone full-screen execution on mobile and desktop.
  * **Apple WebClip Configuration Profile (`.mobileconfig`)** — 1-click home screen install profile for iPhone and iPad.

### 2. Mobile App (Android Native)
* **Flutter & Dart SDK** — Cross-platform native application framework compiled directly to ARM64 Android machine code.
* **Android SDK & Gradle** — Production build pipeline outputting the standalone 144.5 MB `DawnTactics.apk`.
* **Offline Asset Engine** — Bundles 134 high-resolution hero portraits, 58 items, and talents directly into the app package for 100% offline access.

### 3. Backend & API Services
* **Node.js** — Event-driven asynchronous JavaScript/TypeScript server runtime.
* **Express.js** — Robust REST API router serving draft evaluation, item recommendations, and large binary file streaming.
* **`tsx` (TypeScript Execute)** — Native TypeScript execution engine for production without ahead-of-time Node transpilation.
* **CORS Middleware** — Cross-Origin Resource Sharing handling secure requests across web, Android, and iOS clients.

### 4. AI & Tactical Intelligence Engine
* **Google Gemini API** — Multi-model intelligence layer with automatic model failover:
  * `gemini-2.5-flash` *(Primary)*
  * `gemini-1.5-flash` & `gemini-2.0-flash` *(Automatic Fallback)*
* **Flora AI-Style Conversational Persona**:
  * Warm, high-IQ Mythical Immortal esports coach persona with conversational memory.
  * Structured tactical markdown breakdown: *Tactical Assessment ➔ Skill Combos ➔ Item Triage ➔ Pro Tips ➔ Closing Question*.
  * Dynamic suggested follow-up chips generated after every turn for seamless exploration.
* **Domain-Lock Enforcement** — Hardened Land of Dawn prompt filter rejecting non-ML queries with in-universe celestial responses.
* **Offline Heuristic Engine** — Built-in offline rule system providing immediate tactical responses and item counters without an internet connection or API key.

### 5. Cloud Infrastructure & DevOps
* **Railway PaaS** — Containerized Nixpacks/Railpack deployment with rolling zero-downtime updates.
* **Edge CDN & TLS** — Automatic HTTPS encryption and high-speed asset distribution worldwide.
* **Git & GitHub** — Automated source code tracking and version control.

### 6. MLBB Game Data Engine
* **134 Heroes** — Complete skill damages, primary/secondary lanes, power curves (early/mid/late), and hard counters.
* **58 Items** — Complete stats, passives (Anti-Heal, Radiant stack damage reduction, Malefic dynamic penetration), and counter-swaps.
* **Modular Emblem System** — 7 base emblems, 8 Tier 1 talents, 8 Tier 2 talents, and 8 Tier 3 key passives.

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

### 2. Reactive Itemization & Equipment Matrix
- **Opposing 5-Man Lineup Evaluation**: Select any ally hero to generate a custom 6-item reactive build rather than static builds.
- **Direct Counter Rules**:
  - **Anti-Heal / Life Drain**: Dominance Ice (Tanks/EXP/Roam), Sea Halberd (Physical DPS), Glowing Wand (Magic DPS) against sustain (Estes, Ruby, Uranus, Yu Zhong).
  - **Magic Defense Triaging**: Radiant Armor for continuous tick damage (Chang'e, Valir, Yve, Kimmy) vs. Athena's Shield for single-rotation burst (Kadita, Pharsa, Eudora, Aurora).
  - **Armor Penetration Scaling**: Malefic Roar (scales physical penetration dynamically based on enemy armor) and Divine Glaive (% magic pen).
  - **Anti-Crit & Physical Burst**: Blade Armor (reflect & 20% crit reduction) vs. Antique Cuirass (-18% physical attack on skill hit).
- **Death-Defying Item Swapping Visualizer**:
  - Step-by-step timeline: Immortality -> Winter Crown -> Rose Gold Meteor / Wind of Nature.
  - Real-time countdown clock (2.5s resurrect -> 2.0s freeze -> 2.0s immune), APM practice drill, and gold bank calculator.

### 3. Modular Emblem & Talent Builder
- **MLBB 3-Tier Talent System**:
  - **7 Base Emblems**: Assassin, Fighter, Mage, Tank, Marksman, Support, Common.
  - **Tier 1 (Stats)**: Thrill, Swift, Vitality, Rupture, Inspire, Firmness, Agility, Fatal.
  - **Tier 2 (Utility)**: Seasoned Hunter, Tenacity, Master Assassin, Bargain Hunter, Festival of Blood, Pull Yourself Together, Weapons Master, Wilderness Blessing.
  - **Tier 3 (Core Passives)**: Killing Spree, Impure Rage, Quantum Charge, Concussive Blast, Weakness Finder, Temporal Reign, Lethal Ignition, Brave Smite, Focus Mark, War Cry.
- **Matchup-Adaptive Engine**: Select any hero and lane opponent to calculate the optimal talent trio and synergy rationale.

### 4. Flora-Style DawnOracle Tactical AI
- **Flora AI Conversational Architecture**: Warm, high-IQ, and hyper-responsive tactical mentor.
- **Structured Tactical Briefings**: Organized sections for skill combos, counter-swaps, and Mythical Immortal pro tips.
- **Dynamic Follow-Up Chips**: Clickable prompt suggestions tailored to the topic discussed.
- **Domain-Locked Safeguard**: 100% focused on Mobile Legends: Bang Bang.

---

## 🚀 Getting Started Locally

### Development Mode
```bash
npm run dev
```
For native HTTPS with SSL:
```bash
npm run dev:https
```

### Production Mode
```bash
npm run build
npm start
```
Starts the full-stack server on `http://localhost:3005`.

---

## 📡 API Endpoints
- `GET /api/health` — Server health and version status
- `GET /api/heroes` — 134 MLBB heroes roster and stats
- `GET /api/items` — 58 competitive items and counter tags
- `GET /api/emblems` — Base emblems and 3-tier talent matrix
- `POST /api/draft/evaluate` — 5v5 draft evaluation and win rate prediction
- `POST /api/items/recommend` — Reactive 6-item build generation
- `POST /api/emblems/recommend` — 3-tier talent optimization
- `POST /api/oracle/chat` — Flora-style tactical AI coach query endpoint
