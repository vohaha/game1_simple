import { EntityId } from './types';

// ✅ DDD Core Abstractions for Use in Any Domain
// These are reusable, domain-agnostic base contracts and abstract classes
// representing the foundational building blocks of Domain-Driven Design

// 2. Entity
export interface Entity<ID> {
  id: ID;
  equals(other: Entity<ID>): boolean;
}

// 3. Aggregate Root (extends Entity)
export interface AggregateRoot<ID> extends Entity<ID> {
  // Usually emits domain events
  getDomainEvents(): DomainEvent[];
  clearDomainEvents(): void;
}

// 4. Domain Event
export interface DomainEvent {
  readonly eventType: string;
  readonly occurredAt: Date;
  readonly aggregateId: EntityId;
}

// 5. Repository
export interface Repository<ID, T extends AggregateRoot<ID>> {
  findById(id: ID): Promise<T | null>;
  save(entity: T): Promise<void>;
  delete(id: ID): Promise<void>;
}

// 6. Factory (for aggregates/entities)
export interface Factory<T> {
  create(...args: any[]): T;
  restore(snapshot: any): T;
}

// 7. Specification (domain rule encapsulation)
export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: Specification<T>): Specification<T>;
  or(other: Specification<T>): Specification<T>;
  not(): Specification<T>;
}

// 8. Domain Service
export interface DomainService {
  // Marker interface (may expose domain-specific methods)
}

// 9. Application Service
export interface ApplicationService<Request, Response> {
  execute(request: Request): Promise<Response>;
}

// 10. Unit of Work (optional if using transactions)
export interface UnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

// 11. Event Bus / Domain Events Dispatcher
export interface EventBus {
  publish(event: DomainEvent): void;
  publishAll(events: DomainEvent[]): void;
  subscribe(eventType: string, handler: (event: DomainEvent) => void): void;
}

// 12. Snapshotting (optional)
export interface Snapshotable {
  getSnapshot(): any;
}

// 13. Domain Error
export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
// === Abstract Classes ===

export abstract class AbstractEntity<ID> implements Entity<ID> {
  constructor(protected readonly _id: ID) {}
  get id(): ID {
    return this._id;
  }
  equals(other: Entity<ID>): boolean {
    return other.id === this.id;
  }
}

export abstract class AbstractAggregateRoot<ID>
  extends AbstractEntity<ID>
  implements AggregateRoot<ID>
{
  private domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }
}

export abstract class AbstractSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

// === Combinator Specs ===

class AndSpecification<T> extends AbstractSpecification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>,
  ) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) && this.right.isSatisfiedBy(candidate);
  }
}

class OrSpecification<T> extends AbstractSpecification<T> {
  constructor(
    private left: Specification<T>,
    private right: Specification<T>,
  ) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }
}

class NotSpecification<T> extends AbstractSpecification<T> {
  constructor(private spec: Specification<T>) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate);
  }
}

export class Invariants {
  private errors: DomainError[] = [];

  public add(error: DomainError): void {
    this.errors.push(error);
  }

  public check(condition: () => boolean, error: DomainError): void {
    if (!condition()) {
      this.add(error);
    }
  }

  public assert(): void {
    if (this.errors.length > 0) {
      const combinedMessage = this.errors.map((e) => e.message).join(', ');
      this.errors = [];
      throw new ValidationError(combinedMessage);
    }
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

// 1. Value Object
export interface ValueObject<T> {
  equals(other: ValueObject<T>): boolean;
}

export abstract class AbstractValueObject<T extends object> implements ValueObject<T> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  private static readonly _invariants = new Invariants();

  public static get invariants() {
    return this._invariants;
  }

  public equals(other: AbstractValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}

export class DomainTime {
  private readonly timestamp: number;

  private constructor(timestamp: number) {
    this.timestamp = timestamp;
  }

  static now(): DomainTime {
    return new DomainTime(Date.now());
  }

  static fromTimestamp(ms: number): DomainTime {
    return new DomainTime(ms);
  }

  static fromDate(date: Date): DomainTime {
    return new DomainTime(date.getTime());
  }

  toTimestamp(): number {
    return this.timestamp;
  }

  toDate(): Date {
    return new Date(this.timestamp);
  }

  diffMs(other: DomainTime): number {
    return this.timestamp - other.timestamp;
  }

  isBefore(other: DomainTime): boolean {
    return this.timestamp < other.timestamp;
  }

  isAfter(other: DomainTime): boolean {
    return this.timestamp > other.timestamp;
  }

  addMs(ms: number): DomainTime {
    return new DomainTime(this.timestamp + ms);
  }

  hasElapsedSince(other: DomainTime, durationMs: number): boolean {
    return this.timestamp - other.timestamp >= durationMs;
  }

  equals(other: DomainTime): boolean {
    return this.timestamp === other.timestamp;
  }

  isInFuture(): boolean {
    return this.timestamp > Date.now();
  }
}
