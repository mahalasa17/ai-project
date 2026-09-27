# Smart Quiz: Modern Multi-Round Learning & Assessment Platform

A comprehensive visual and interactive overhaul of the Computer Science & AI Multi-Round Quiz into a high-production-value, responsive React application featuring deep glassmorphism, fluid motion physics, category mastery analytics, interactive sound feedback, keyboard navigation, and detailed question explanations.

### User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions were dismissed, so we adopt recommended, high-satisfaction defaults tailored for an attractive, educational assessment interface. Please review the key decisions below:
>
> - **Aesthetic Direction**: Deep space obsidian glassmorphism (`#0B0F19` canvas, indigo/slate cards with subtle borders, vibrant electric blue `#3B82F6` and emerald `#10B981` accents) adhering to anti-slop rules (unboxed metadata, single card elevation, and zero pill-sandwich clutter).
> - **Sound & Tactile Effects**: Built-in zero-dependency Web Audio synthesizers (clean soft clicks, option select pops, completion chimes) with an instant header Mute toggle (defaulting to clean unobtrusive audio).
> - **Extended Question Learning**: In addition to scoring, every question in the 36-item bank will include an educational rationale and explanation tag for rich post-round review.
> - **Power-User Ergonomics**: Full keyboard accessibility (keys `1`-`4` or `A`-`D` to select options, `ArrowLeft`/`ArrowRight` to navigate, `F` to flag/bookmark for review, `Enter` to confirm).

---

### 1. Overview & Core Concept

- **What It Does**: Transforms the prototype quiz into a multi-round adaptive testing suite with candidate onboarding, customizable rounds (10, 15, or 20 questions across CS Fundamentals, AI & Machine Learning, and Networks/Hardware), live timer with visual pacing, question palette with "Flag for Review" status, instant submission warnings, and an in-depth analytical results hub with round-over-round performance graphs, missed-question retake mode, and pedagogical answer keys.
- **Target Audience / Persona**: Computer science students, interview prep candidates, software engineers, and educators looking for a focused, engaging, and beautiful testing environment.
- **Key Value**: Replaces raw static forms with an immersive, confidence-building test interface that tracks learning progression across successive rounds.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Onboarding & Setup**: Clean entry portal where candidates enter their name, select category focus (All Mixed, AI/ML, CS Fundamentals, Networks & Hardware), choose question volume, and view round progression rules.
  2. **Active Testing Stage**:
     - Top bar with candidate identifier, active round indicator, audio toggle, and dynamic animated timer with danger state styling when under 2 minutes.
     - Progress bar with percentage completion and live answered counter.
     - Question card with keyboard hotkey chips, smooth Framer Motion entrance, and interactive choice cards with custom radio indicators and active glow.
     - Interactive question palette with tri-state status (unanswered, answered, flagged for review) for rapid jumping.
  3. **Submit Verification Modal**: Polished backdrop blur dialog warning candidate of any unanswered or flagged questions before locking answers.
  4. **Results & Analytics Hub**:
     - Celebratory score ring / accuracy badge with celebratory confetti burst on high achievement.
     - 4-metric summary: Round Score, Accuracy Percentage, Correct Tally, and Completion Time.
     - Cumulative round progression telemetry (rounds played, average score %, personal best).
     - Category-by-category mastery breakdown showing strengths and growth areas.
     - Multi-round action center: Start Next Round (fresh randomized draw), Retake Missed Questions (focused practice), or Change Category.
     - Expandable Answer Key with clear explanations and comprehensive Round History Log.

- **Visual Identity & Theme**:
  - *Color Palette (60-30-10 Rule)*:
    - **60% Dominant Neutral**: Deep obsidian canvas (`#090D16` to `#0F172A`) with subtle radial ambient glows.
    - **30% Structural Panels**: Refined translucent slate surfaces (`#1E293B/70`) with 1px border highlights (`rgba(255,255,255,0.08)`).
    - **10% Semantic Accents**: Electric Azure (`#3B82F6`) for primary navigation and selection; Emerald (`#10B981`) for correct answers and mastery; Amber (`#F59E0B`) for warnings and flagged questions; Crimson (`#EF4444`) for errors.
  - *Typography*: Modern, legible typography pairing `Plus Jakarta Sans` for clean UI prose and headings with `JetBrains Mono` / `tabular-nums` for timers, percentages, scores, and hotkey indicators.
  - *Anti-Slop Discipline*: Zero static pill badges; metadata separated with clean typographical dots (`·`); single-elevation depth; no code-comment titles or fake telemetry tickers.

- **Interactive Feedback & Motion**:
  - Framer Motion page reveals, subtle option lift on hover, scale-in question transitions.
  - Web Audio synthetic micro-sounds on option select, bookmark toggle, and round complete.
  - Confetti particle burst on scoring $\ge 80\%$.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: React 19 + Framer Motion Architecture vs. Single HTML File**
  - *Chosen Approach*: Refactor into modular React components (`WelcomeView`, `QuizView`, `ResultsView`, `QuestionPalette`, `ReviewSection`, `HistoryTable`) leveraging installed `motion` and `lucide-react`.
  - *Why*: Provides fluid declarative transitions, robust state management across multiple rounds, responsive layout scaling, and clean keyboard event listeners.
  - *Alternatives Considered*: Retaining the single vanilla HTML file was rejected because it causes brittle DOM updates, lack of component isolation, and jarring view swaps.

- **Decision 2: Lightweight Web Audio Synthesizer vs. External Audio MP3 Assets**
  - *Chosen Approach*: Pure programmatic Web Audio API sound generator (simple oscillators for pleasant, subtle chimes).
  - *Why*: Zero network requests, 100% reliable offline operation, instant zero-latency playback, and no risk of broken audio URLs.

- **Decision 3: Question Explanations & Flagging System**
  - *Chosen Approach*: Augment the 36-question bank with educational rationale snippets and provide a "Flag for Review" feature.
  - *Why*: Transforms a passive quiz into an effective pedagogical tool while mirroring real-world certification exams (AWS, GRE, LeetCode).

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│   (Global State: Candidate, Round, RoundHistory, AudioMute)  │
└──────┬──────────────────────┬──────────────────────┬─────────┘
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────────┐
│ WelcomeView  │      │   QuizView   │      │   ResultsView    │
│ - Category   │      │ - TopBar     │      │ - Score Ring     │
│ - Q-Count    │      │ - Timer      │      │ - Cumulative Bar │
│ - Rules      │      │ - Question   │      │ - Category Radar │
└──────────────┘      │ - Options    │      │ - Action Hub     │
                      │ - Palette    │      │ - Review Key     │
                      │ - Modal      │      │ - History Table  │
                      └──────┬───────┘      └──────────────────┘
                             │
                             ▼
                      ┌──────────────┐
                      │ soundEffects │
                      │ (Web Audio)  │
                      └──────────────┘
```

- **Data Models**:
  - `Question`: `{ id, category, question, options, answer, explanation }`
  - `RoundResult`: `{ round, category, score, maxScore, percentage, timeFormatted, timeSeconds, missedIds, date }`
  - `CandidateSession`: `{ name, rounds: RoundResult[], currentRound, bestScore, averageScore }`

- **Interactive Component & State Mapping**:
  - `selectOption(index)`: Updates state, triggers soft click sound, reflects in progress bar and palette button.
  - `toggleFlag(qIndex)`: Flags question for later attention; colors palette indicator amber.
  - `submitRound()`: Halts timer, computes analytics and missed questions, pushes to history, triggers victory confetti if eligible.
  - `startNextRound(mode)`: Resets timer, draws either new randomized questions or exclusively missed questions, preserves cumulative metrics.
