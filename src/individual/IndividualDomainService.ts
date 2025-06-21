// Domain Service for Individual context.
// Used to perform operations involving multiple IndividualAggregates or cross-cutting identity/trait logic.

import { IndividualAggregate } from './IndividualAggregate';
import { IndividualTraitVO } from './IndividualTraitVO';

export class IndividualDomainService {
  /**
   * Compares two individuals' specific traits for compatibility (psychological realism).
   * TODO: Consider domain-driven logic for advanced trait compatibility at type and value-object level.
   */
  static areTraitsCompatible(
    indA: IndividualAggregate,
    indB: IndividualAggregate,
    traitKey: string,
  ): boolean {
    const traitA = indA.getTrait(traitKey);
    const traitB = indB.getTrait(traitKey);
    return JSON.stringify(traitA) === JSON.stringify(traitB);
  }

  /**
   * Calculates similarity score across given trait keys.
   * TODO: Refine to use domain rules (weighted traits, psychological spectra, etc.).
   */
  static calculateSimilarityScore(
    indA: IndividualAggregate,
    indB: IndividualAggregate,
    traitKeys: string[],
  ): number {
    let score = 0;
    traitKeys.forEach((key) => {
      if (JSON.stringify(indA.getTrait(key)) === JSON.stringify(indB.getTrait(key))) {
        score += 1;
      }
    });
    return score / traitKeys.length;
  }

  /**
   * Transfers a "knowledge" or other transferable trait.
   * TODO: Enforce preconditions: trust, cost (energy), and relevant event publishing to downstream contexts.
   */
  static transferKnowledge(
    from: IndividualAggregate,
    to: IndividualAggregate,
    trait: IndividualTraitVO,
  ): boolean {
    // TODO: Enforce trait transfer invariants before mutation—see game rules on transfer, trust, and cost.
    to.setTrait(trait);
    return true;
  }
}
