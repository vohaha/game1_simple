# Game1 Domain Architecture Overview

## Purpose

This repository implements the domain architecture for **Game1**, a simulation game modeling real-world social, psychological, and economic systems via abstraction. The approach is grounded in **Domain-Driven Design (DDD)**, with clearly defined core domains, bounded contexts, and domain-first code structure to facilitate robust, maintainable, and evolution-prone development.

---

## Core Domain

Game1 simulates human-like decision-making and social-economic interaction by abstracting:

- **Energy-as-Action System**: Models action capacity, sleep, tokenization, and energy regeneration.
- **Deal System**: Governs formal agreements, obligation enforcement, and social trust.
- **Individual Identity Mechanics**: Represents psychological traits, identity spectrum, and skills.
- **Production and Value Creation**: Captures real-time production, efficiency, value exchange, and cooperation.

These modules encode cognitive limits, energy depletion, social mechanisms, and time-bound behaviors, rooting gameplay mechanics in real-life constraints.

---

## Bounded Contexts & Directory Structure

This repo is organized around the following DDD bounded contexts—each mapped to a dedicated source directory under `domain/`:

| Context         | Directory                  | Responsibility                                              |
|-----------------|---------------------------|-------------------------------------------------------------|
| Energy System   | `domain/energy`           | Manages energy/action capacity, tokenization, sleep cycles  |
| Individual      | `domain/individual`       | Player characters, identity, psychology, and skills         |
| Production      | `domain/production`       | Product/service creation, efficiency, complexity            |
| Group           | `domain/group`            | Group formation, roles, specialization, social dynamics     |
| Deal System     | `domain/deal`             | Agreements, enforcement, formal cooperation, reputation     |
| Network         | `domain/network`          | Social connections, comms, reputation propagation           |
| Time System     | `domain/time`             | Time-tracking, circadian patterns, scheduling, debuffs      |
| Progression     | `domain/progression`      | Skill evolution, diminishing returns, identity shifts       |
| Balance         | `domain/balance`          | Monitors system dynamics, applies balancing interventions   |
| Common          | `domain/common`           | Shared value objects/utilities (immutable, cross-context)   |

**Supporting layers**:

- `application/` &ndash; Application services for context orchestration, user-facing scenarios.
- `infrastructure/` &ndash; Persistence, messaging, and technical integrations.
- `interfaces/` &ndash; Context interaction contracts (see `/docs/interfaces.md`).
- `tests/` &ndash; Domain/test fixtures and acceptance scenarios.
- `scripts/` &ndash; Tooling, migration, admin support.

---

## Context Relationships

Interactions across contexts follow DDD strategic design:

- **Customer/Supplier**: Energy & Individual → Production
- **Composite/Aggregate**: Group aggregates Individuals
- **Mediator Pattern**: Deal System mediates Group/Individual; Network mediates signaling
- **Observer Pattern**: Progression observes Individual/Production; Balance observes all

Events and interface contracts are preferred for integration.

---

## Strategic Role Summary

- **Core:** Energy System, Individual, Production
- **Supporting:** Group, Deal System, Progression
- **Generic:** Network, Time System, Balance

---

## Contribution & Evolution

- Maintainers and context ownership are tracked per directory.
- New contexts emerge via capability discovery and event storming.
- Update the architecture and context map quarterly for responsiveness.

---

## References

- "Domain-Driven Architecture Diagrams" — Nick Tune
- Game1 Core Documentation (2025-05)
- Evans, *Domain-Driven Design*
- Vernon, *Implementing DDD*

---
