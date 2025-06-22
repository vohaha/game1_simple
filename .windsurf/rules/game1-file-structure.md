---
trigger: always_on
---

File Structure

game1/
├── core/
│   ├── ddd.ts                      # Abstract base classes: Entity, AggregateRoot, ValueObject, DomainEvent, etc.
│   ├── types.ts                    # Shared types: EntityId, Timestamp, etc.
│   ├── actions/                    # IAction, IActionPolicy, IActionHandler, IAbility
│   ├── events/                     # IEventBus, DomainEvent base, EventPublisher
│   └── game-context.ts             # IGameContext (module registry + shared services)

├── modules/
│   ├── individual/
│   │   ├── src/
│   │   │   ├── individual.entity.ts         # Extends Entity - identity, attributes, state logic
│   │   │   ├── individual.aggregate.ts      # Extends AggregateRoot - behavior coordination
│   │   │   ├── identity.vo.ts               # ValueObject for uniqueness/quality/efficiency
│   │   │   ├── individual.abilities.ts
│   │   │   ├── individual.policy.ts
│   │   │   └── individual.events.ts
│   │   └── tests/
│   │       └── individual.aggregate.spec.ts

│   ├── group/
│   │   ├── src/
│   │   │   ├── group.entity.ts              # Group structure, members list
│   │   │   ├── group.aggregate.ts           # Aggregate for adding/removing members, roles, etc.
│   │   │   ├── group.policy.ts
│   │   │   ├── group.events.ts
│   │   │   ├── join-group.handler.ts
│   │   │   └── index.ts

│   ├── deal/
│   │   ├── src/
│   │   │   ├── deal.entity.ts               # Terms, parties, duration, status
│   │   │   ├── deal.aggregate.ts            # Lifecycle: negotiation, fulfillment, breach
│   │   │   ├── deal.policy.ts
│   │   │   ├── create-deal.handler.ts
│   │   │   └── deal.events.ts

│   ├── energy/
│   │   ├── src/
│   │   │   ├── energy.entity.ts             # Tracks current/max energy per individual
│   │   │   ├── energy.aggregate.ts          # Coordinates regeneration, tokenization, sleep
│   │   │   ├── action-token.vo.ts
│   │   │   └── energy.events.ts

│   ├── production/
│   │   ├── src/
│   │   │   ├── product.entity.ts            # Item being created, attributes
│   │   │   ├── production.aggregate.ts      # Manages production sessions, pausing, quality
│   │   │   ├── production-cycle.ts
│   │   │   └── production.events.ts


⸻

📘 Naming and Structural Rules (Updated)

Concept	Rule
Aggregate	Always use *.aggregate.ts for AggregateRoot implementations
Entity	Always define persistent, identifiable domain objects as *.entity.ts
ValueObject	Stateless, immutable domain data — always in *.vo.ts
Events	Domain events stored in *.events.ts, one file per context
Policy	Context-specific rules for allowed actions → *.policy.ts
Handler	Action execution logic → *.handler.ts
Ability	Action discovery logic → *.abilities.ts

✅ Aggregates must orchestrate behavior and enforce invariants using child Entity and ValueObject components.
✅ Entities must not exist standalone — always owned by an Aggregate in DDD boundaries.

⸻