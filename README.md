# Domain Architecture Overview for Game1

## 1. Purpose

This document provides a strategic overview of the domain architecture for **Game1**, grounded in the principles of **Domain-Driven Design (DDD)**. It defines the core domain, outlines bounded contexts, maps their relationships, and clarifies the strategic roles of each context. The goal is to improve shared understanding across development, design, and strategic planning, and to enable safe, incremental evolution.

---

## 2. Core Domain

### 🎯 Definition

Game1's **Core Domain** is the simulation of human-like decision-making and social-economic interaction via:

- **Energy-as-Action System**
- **Deal System**
- **Individual Identity Mechanics**
- **Production and Value Creation**

These domains abstract real-world constraints such as cognitive limits, energy depletion, time preferences, and social cooperation mechanisms.

### 🔥 Why It Matters

These systems define:

- What players can do
- How they exchange value
- How effort is limited and allocated
- How social trust and productivity emerge

---

## 3. Bounded Contexts

| Context            | Responsibility                                                               |
| ------------------ | ---------------------------------------------------------------------------- |
| **Energy System**  | Manages action capacity, sleep, tokenization, and regeneration               |
| **Individual**     | Models player character, identity spectrum, skills, and psychological traits |
| **Production**     | Governs product and service creation, pausing, efficiency, complexity        |
| **Group**          | Represents collective effort, roles, specialization, internal dynamics       |
| **Deal System**    | Handles formal agreements between entities, term enforcement, reputation     |
| **Network**        | Manages connections, reputation, social capital, economic signals            |
| **Time System**    | Tracks real-time, circadian preferences, debuffs, and scheduling             |
| **Progression**    | Tracks skill evolution, diminishing returns, identity shifts                 |
| **Balance**        | Observes the ecosystem and applies balancing actions                         |
| **Governance**     | (Planned) Manages elections, leadership, group rules                         |
| **Legal**          | (Planned) Handles arbitration, rights enforcement                            |
| **Belief System**  | (Planned) Captures worldviews, morality, ideology propagation                |
| **Infrastructure** | (Planned) Models shared property, facilities, maintenance                    |
| **Memory**         | (Planned) Captures narrative, history, cultural evolution                    |

---

## 4. Context Map

### ⚡ Interaction Types

- **Energy ← Individual** — Core usage of action capacity (Customer/Supplier)
- **Production ← Energy & Individual** — Depends on their state to perform tasks (Customer/Supplier)
- **Group ← Individual** — Groups aggregate individuals (Composite)
- **Deal ↔ Group & Individual** — Mediates interactions (Mediator Pattern)
- **Progression → Individual & Production** — Learns from their activity (Observer)
- **Network ↔ Individual/Group** — Broadcasts and filters interactions (Mediator)
- **Governance ↔ Group, Deal** — Governs structure and power (Planned)
- **Belief System ← Network, Progression** — Cultural influence pipeline (Planned)
- **Legal ← Deal** — Enforces and arbitrates agreements (Planned)

---

## 5. Strategic Roles (Updated)

| Context           | Role     | Notes                                                      |
| ----------------- | -------- | ---------------------------------------------------------- |
| Energy System     | Core     | Everything depends on energy capacity and regeneration     |
| Individual        | Core     | Represents the atomic decision-maker and capability holder |
| Production System | Core     | Primary means of expressing effort into value              |
| Group             | Growth   | Evolving structures, internal specialization               |
| Deal System       | Growth   | Enables law, policy, social order                          |
| Network           | Growth   | Foundation for identity, belief, trust                     |
| Time System       | Generic  | Provides shared rhythm, buffs/debuffs, scheduling          |
| Progression       | Volatile | Highly dynamic, identity and cultural learning             |
| Balance           | Volatile | Continuously adapts to emergent gameplay behavior          |
| Governance        | Planned  | Enables structured collective decisions                    |
| Legal             | Planned  | Manages interpretation and enforcement of rules            |
| Belief System     | Planned  | Cultural lens and ideology transfer                        |
| Infrastructure    | Planned  | Common resources, facilities, tech systems                 |
| Memory            | Planned  | Encodes collective narrative and history                   |

---

## 6. Capability Map (Extended)

| Capability                     | Implemented In                        |
| ------------------------------ | ------------------------------------- |
| Manage personal energy         | Energy, Individual                    |
| Create products/services       | Production, Individual                |
| Form and operate groups        | Group, Deal                           |
| Make and enforce agreements    | Deal System, Network, Legal (planned) |
| Trade and transmit value       | Energy (tokens), Network              |
| Build identity and reputation  | Individual, Network                   |
| Learn and specialize           | Progression, Production               |
| Observe and adapt systems      | Balance, Deal, Production             |
| Participate in governance      | Governance (planned), Group           |
| Express worldview & belief     | Belief System (planned), Network      |
| Share infrastructure           | Infrastructure (planned), Group       |
| Build shared history/narrative | Memory (planned), Group, Network      |

---

## 7. Integration Guidelines

- Use **published interfaces** between contexts
- Communicate using **event-based messaging** (Observer Pattern across modules)
- Apply **Mediator Pattern** for orchestrated systems like Deals & Network
- Maintain **aggregate roots** (e.g., Group, Individual) for consistency boundaries
- Plan for **hot-swapable modules** in volatile areas (e.g., Balance, Progression)
- Add **feature toggles** to introduce experimental systems (e.g., Governance, Belief)

---

## 8. Freedom & Entropy Control via Action System

### Problem:

Max freedom for players causes uncontrolled complexity across domains.

### Solution: introduce **Action Layer**:

- `IAction`: unified object describing a player action
- `ActionEngine`: central service to validate (via Policy), execute (via Handler)
- `IActionPolicy`: domain-based rule checker (e.g. "Group must approve join")
- `IActionHandler`: encapsulates execution logic
- `IAbility`: lists available actions for UI/agent (context-aware)

### Benefits:

- Centralized control over possible and valid actions
- Easily testable, switchable, and configurable
- Game logic emerges from combinations of small, testable action handlers

---

## 9. Evolution and Governance (Expanded)

### Evolution Strategy:

- **Classify contexts**: Stable, Volatile, Growth, Planned
- Use **capability discovery** to identify new bounded contexts
- Evolve high-volatility modules in isolation (ActionLayer, Balance, Progression)
- Schedule **quarterly reviews** of strategic roles and integrations
- Use **event storming** and player telemetry to guide context evolution

### Future Context Triggers:

| Trigger                           | Potential Contexts |
| --------------------------------- | ------------------ |
| Complex group power dynamics      | Governance         |
| Disputes and contract enforcement | Legal              |
| Cultural divergence among players | Belief System      |
| Need for shared infrastructure    | Infrastructure     |
| Desire to preserve history        | Memory             |

---

## 10. References

- "Domain-Driven Architecture Diagrams" — Nick Tune ([link](https://medium.com/nick-tune-tech-strategy-blog/domain-driven-architecture-diagrams-139a75acb578))
- Game1 Core Documentation (2025-05)
- Eric Evans, "Domain-Driven Design"
- Vaughn Vernon, "Implementing DDD"
- ChatGPT Game1 integration discussions (2025-06)

---

## 11. Entity vs Aggregate Responsibilities

### ✅ ENTITY: `Individual`

Represents the **persistent personal profile** — who the person is and how they are currently doing. It is **passive**, containing identity and measurable internal state, but it makes no decisions.

**Contains only:**

- 🧬 **Traits** — `energy`, `identity`
- 🧪 **Vitals** — `health`, `hydration`, `fatigue`, `sleepSince`, etc.
- 🧠 **Psychology** — `motivation`, `focus`, `stress`, `emotionalState`

**Permitted methods:**

- `currentEnergy()`
- `updateEnergy(energy)`
- Getters/accessors for internal state

**🚫 Forbidden:**

- Any behavior logic: `collapse()`, `recover()`, `performAction()`, etc.

**📌 Analogy:**
🗃 Like a **medical record + psychological profile**: it stores truth about the individual, but **does not interpret, react, or decide**.

---

### ✅ AGGREGATE: `IndividualAggregate`

Coordinates **decision-making, rules, and behavioral transitions**. The aggregate ensures invariants, controls access to entity internals, and emits domain events.

**Coordinates:**

- ⏳ **Lifecycle hooks** — `beforeAction()`, `tick()`
- 💥 **State transitions** — `collapseIfExhausted()`, `enterRecoveryState()`
- 🛏️ **Physiological logic** — `startSleep()`, `wakeIfRecovered()`
- 🧠 **Psychological reactions** — `applyStressThreshold()`, `adjustMotivation()`
- 🧠 **Cognitive/emotional simulation** — `simulateCognitiveDrift()`, `emitDailyReflection()`
- 👥 **Social behaviors** — `reactToGroupConflict()`, `evaluateGoalAlignment()`

**Reads/Writes only via entity:**

- `this.individual.vitals.fatigue`
- `this.individual.psychology.stress`

**🚫 Forbidden:**

- Holding duplicated state from the entity (e.g. `this.stress = ...` ❌)

**📌 Analogy:**
🧠 Like the **central nervous system or subconscious process**:
It monitors vitals and thoughts, then triggers **reactions, rules, and transitions**.
