import { Id, ISerializable } from '@game1/types';
import { IDomainEvent } from '../interfaces/IDomainEvent.ts';
import { DomainEventSchema } from '../schemas/DomainEventSchema.ts';

export abstract class DomainEvent
  implements IDomainEvent, ISerializable<IDomainEvent>
{
  public readonly id;
  public readonly type;
  public readonly occurredAt;
  public readonly domainContext;
  public readonly data;
  public readonly metadata;

  protected constructor(
    input: Partial<IDomainEvent> & {
      domainContext: Pick<IDomainEvent, 'domainContext'>;
      type: Pick<IDomainEvent, 'type'>;
    }
  ) {
    const eventData = DomainEventSchema.parse({
      ...input,
      id: input.id ?? Id.generate().value,
      occurredAt: input.occurredAt ?? new Date(),
      metadata: input.metadata ?? {},
      data: input.data ?? {},
    });

    this.id = eventData.id;
    this.type = eventData.type;
    this.occurredAt = eventData.occurredAt;
    this.domainContext = input.domainContext;
    this.data = Object.freeze({ ...eventData.data });
    this.metadata = Object.freeze({ ...eventData.metadata });
  }

  public withMetadata(
    additionalMetadata: Pick<IDomainEvent, 'metadata'>
  ): this {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Constructor = this.constructor as new (...args: any[]) => this;
    return new Constructor({
      eventType: this.type,
      domainContext: this.domainContext,
      data: this.data,
      metadata: { ...this.metadata, ...additionalMetadata },
      eventId: this.id,
      occurredAt: this.occurredAt,
    });
  }

  public deserialize() {
    const eventData: IDomainEvent = {
      id: this.id,
      type: this.type,
      occurredAt: this.occurredAt,
      domainContext: this.domainContext,
      data: this.data,
      metadata: this.metadata,
    };

    return DomainEventSchema.parse(eventData);
  }

  serialize() {
    return JSON.stringify(this);
  }

  /**
   * Validate that this event conforms to the domain event schema.
   */
  public validate(): boolean {
    try {
      DomainEventSchema.parse(this.deserialize());
      return true;
    } catch {
      return false;
    }
  }
}
