# Domain Layer

This document outlines the recommended folder structure, naming conventions, and file responsibilities for the `domain` directory in the Game1 monorepo. Adapt or extend as needed for new concepts.

---

## Top-Level Modules

Each bounded context or subdomain lives in its own folder under `domain/`:

---

## Domain Project Structure

Within each project folder, use this pattern:

```
<project-name>/
├─ src/
│   ├─ value-objects/       # Immutable VOs
│   │   └─ *.ts
│   ├─ entities/            # Aggregate roots or child entities
│   │   └─ *.ts
│   ├─ interfaces/          # SPI: ports like repositories, gateways
│   │   └─ I*.ts
│   ├─ factories/           # Factories for creating aggregates
│   │   └─ *Factory.ts
│   ├─ services/            # (optional) domain services
│   │   └─ *.ts
│   ├─ index.ts             # Module entry export
│   └─ *.ts                 # Other domain classes
```

- **value-objects/**:

  - Class per VO.
  - Factory/reconstitution static methods.
  - `equals()`, getters only.

- **entities/**:

  - Aggregate root + any child entities.
  - Encapsulate business rules + emit domain events.

- **interfaces/**:

  - Define ports (e.g. `IIndividualRepository`).
  - No implementation details.

- **factories/**:

  - Static factories for complex creation logic.
  - Return fully initialized aggregates.

- **services/**:

  - Encapsulate logic that doesn’t naturally belong to a single aggregate.
  - Depend on ports/interfaces only.

- **events/**:
  - One file per event under `domain/events/src/`.
  - Base `DomainEvent` + concrete event classes.
  - `index.ts` exports all.

---

## File & Naming Conventions

- Kebab-case for module directories (e.g. `deal_template/`).
- PascalCase for classes, file names match class name (e.g. `ActionTokens.ts`).
- VOs are immutable; Entities manage their own invariants.
- Use UPPER_SNAKE for constants.
- Expose public API via `src/index.ts` only.

---

## README.md in Each Module

Each module should include a brief `README.md` describing:

- Purpose of the module.
- List of key domain concepts (VOs, Entities, Services).
- How to write tests against it.
- Dependencies on other domain modules.

---

Use this template as a starting point whenever you add or refactor domain modules. Ensure that infrastructure (ORM, HTTP, UI) remains outside the `domain/` directory.
