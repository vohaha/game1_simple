# Game1: Player Flow Experience Design

## 🎮 Core Player Loop: Energy into Value

This section describes the **foundational gameplay experience** for a new player in Game1. It captures the first core interactions, motivations, constraints, and long-term potential, while illustrating how **energy transformation** drives social-economic simulation at every scale.

---

## 🧑‍🚀 Starting State

Each player begins the game as a **basic Individual**:

- Equipped with **default traits** (vitals, psychology, identity)
- Fully regenerated **initial energy pool**
- Unaffiliated (no group), no products or skills

### Immediate Possibilities

The player immediately has access to **a wide range of possible actions**, but the system guides the player toward:

> **Creating their first Product** — as a fundamental act of turning internal energy into persistent value

---

## 🏗️ Product Creation Flow

### Step-by-step Experience:

1. **Input Product Description**
   The player types what they want to create — anything from "wooden chair" to "cyberpunk jacket".

2. **Confirmation** → starts creation action:

   - A request is wrapped into a `CreateProductAction`
   - It is passed to the `ActionEngine`

3. **AI Classification of Product**

   - The system categorizes the product (see below)
   - Assigns **energy cost** based on complexity
   - If the player has insufficient energy:

     - The action enters a **paused state**
     - It can resume when energy regenerates

4. **Timeout / Production Window**

   - A timer is started; during this phase:

     - Player has **limited set of actions**
     - Can reflect, plan, or interact lightly

5. **Completion**

   - Product is created and stored
   - Attributes of the product depend on the individual who made it (e.g. traits, context, group)

---

## 🧾 Product Categories

| Category       | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **Domestic**   | Aesthetic or expressive products, not affecting gameplay directly.        |
| **Consumable** | Usable items — food, drugs, etc. that change vitals temporarily           |
| **Component**  | Products that serve as parts of bigger things (e.g. a door for a vehicle) |

### Examples:

- 🪑 "Chair" → Domestic
- 🍎 "Energy Fruit" → Consumable
- 🚪 "Carbon Door" → Component for group-level product

Products become:

- Part of the **economy** (e.g. skin markets)
- Part of the **player profile** (e.g. avatar customization)
- Inputs to **group production pipelines**

---

## 🛠️ Service Creation Flow

Services are **actions that affect other entities**, often altering their traits:

| Type     | Effect Example                                              |
| -------- | ----------------------------------------------------------- |
| Buff     | Raise motivation, reduce fatigue                            |
| Debuff   | Suppress another’s energy, increase stress                  |
| Marketed | Trade-based services (e.g. training, healing, intimidation) |

Services are actions of type `ProvideServiceAction` and use `IActionHandler` that targets:

- Individuals
- Groups

This is the second main channel of **energy transformation** into social capital.

---

## 🤖 Emergent Actor Types via Services

Based on the service architecture, players can form **service archetypes**:

| Role          | Description                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| **Protector** | Uses energy to counteract negative effects on others (buffs, cleansing, restoration) |
| **Racketeer** | Offers protection via threat of service-based sabotage or debuffs                    |
| **Trainer**   | Exchanges effort to boost others’ traits over time                                   |

These roles are not hardcoded classes — they emerge via **available actions** + **reputation effects**.

---

## 🧬 Core Concept: Energy as System Currency

Every interaction is a transfer or transformation of **energy**:

- **Product creation**: energy → object
- **Service**: energy → target state change
- **Trade**: energy (tokens) → energy
- **Conflict**: drain / block / redirect energy

Thus, **the entire simulation is a system of energy allocation**, making the game world analogous to real-world economic and social systems.

---

## 🌍 Toward Real-World Simulation

Game1’s design moves players through layers of increasing abstraction:

| Phase               | Actions/Concepts                                            |
| ------------------- | ----------------------------------------------------------- |
| **Solo Production** | Create item, rest, sell, recover                            |
| **Trade**           | Offer, negotiate, contract, reputation                      |
| **Service Market**  | Provide services for others, specialize                     |
| **Group Operation** | Join or form group, assign roles, collaborate               |
| **Specialization**  | Create production chains, shared infrastructure             |
| **Policy Making**   | Group norms, Deal enforcement, conflict resolution          |
| **Governance**      | Elections, rule-making, enforcement via Legal system        |
| **Geopolitics**     | Inter-group strategy, diplomacy, economic pressure, warfare |

---

## 🧠 Design Principle

> Hard system of rules, soft space of meaning.

- **Rules**: strict mechanics, systemic constraints, deterministic outcomes
- **Freedom**: player chooses _what_ to create, _how_ to act, _which_ values to pursue

This allows:

- Rich player expression
- Deep systemic interaction
- Emergence of real-like dynamics (conflict, cooperation, power, economy)

---

## ✅ Summary

The core gameplay loop is:

> **“Expend energy → transform into value → influence system → adapt or evolve”**

Every new domain action (e.g. product creation, service delivery) builds the space for:

- Reputation
- Conflict
- Identity
- Power
- Specialization

This flow supports the vision of **simulating human interdependence** at multiple layers — from microeconomics to geopolitics.

Next steps: formalize `CreateProductAction`, `ProvideServiceAction`, their policies and handlers.
