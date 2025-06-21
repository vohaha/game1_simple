import { z } from 'zod/v4';
import { Affordance, AffordanceDomainEventSchema } from 'src/index.ts';

export type AffordanceDomainEvent = z.infer<typeof AffordanceDomainEventSchema>;

export class AffordanceAggregate {
  private readonly knownAffordances: Map<string, Affordance>;

  constructor(initialAffordances: Affordance[] = []) {
    this.knownAffordances = new Map(initialAffordances.map((a) => [a.id, a]));
  }

  discover(affordance: Affordance): void {
    if (!this.knownAffordances.has(affordance.id)) {
      this.knownAffordances.set(affordance.id, affordance);
    }
  }

  forget(affordanceId: string): void {
    this.knownAffordances.delete(affordanceId);
  }

  hasAffordance(affordanceId: string): boolean {
    return this.knownAffordances.has(affordanceId);
  }

  listAffordances(): Affordance[] {
    return Array.from(this.knownAffordances.values());
  }
}
