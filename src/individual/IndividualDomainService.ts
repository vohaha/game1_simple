// Domain Service for Individual context
// Used to perform operations involving multiple IndividualAggregates or cross-cutting identity/trait logic

import { IndividualAggregate } from './IndividualAggregate';
import { IndividualTraitVO } from './IndividualTraitVO';

export class IndividualDomainService {
  // Compare two individuals' specific traits for compatibility (psychological realism)
  static areTraitsCompatible(
    indA: IndividualAggregate,
    indB: IndividualAggregate,
    traitKey: string,
  ): boolean {
    const traitA = indA.getTrait(traitKey);
    const traitB = indB.getTrait(traitKey);
    return JSON.stringify(traitA) === JSON.stringify(traitB);
  }

  // Example: Calculate similarity score across all traits (basic behavioral/identity similarity)
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

  // Example: Transfer "knowledge" trait between individuals (could cost energy, require trust, etc)
  static transferKnowledge(
    from: IndividualAggregate,
    to: IndividualAggregate,
    trait: IndividualTraitVO,
  ): boolean {
    // Placeholder: In full implementation, would validate preconditions
    to.addTrait(trait);
    return true;
  }
}
