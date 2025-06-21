import { EnergyEntity } from './energy/EnergyEntity';
import { EnergyAggregate } from './energy/EnergyAggregate';
import { EnergyValueObject } from './energy/EnergyValueObject';

import { IndividualEntity } from './individual/IndividualEntity';
import { IndividualAggregate } from './individual/IndividualAggregate';
import { IndividualTraitVO } from './individual/IndividualTraitVO';

import { GroupEntity } from './group/GroupEntity';
import { GroupAggregate } from './group/GroupAggregate';
import { GroupPropertyVO } from './group/GroupPropertyVO';

import { DealEntity } from './deal/DealEntity';
import { DealAggregate } from './deal/DealAggregate';
import { DealTermVO } from './deal/DealTermVO';

// MOCK: ChronotypeWindow placeholder for EnergyEntity construction
class ChronotypeWindow {}
// Simple "event log" to mimic basic domain events (no infra bus)
const eventLog: Array<{ event: string; payload: unknown }> = [];

class ApplicationService {
  // Registers an individual, provisions energy, and returns both aggregates
  static registerIndividual(
    id: string,
    name: string,
    traits: IndividualTraitVO[],
    maxEnergy = 120,
    initialEnergy = 100,
  ) {
    const individual = new IndividualAggregate(new IndividualEntity({ id, name, traits }));
    const energy = new EnergyAggregate(
      new EnergyEntity({
        id: `energy_${id}`,
        energy: initialEnergy,
        maxEnergy,
        chronotypeWindow: new ChronotypeWindow(),
      }),
    );
    eventLog.push({ event: 'IndividualRegistered', payload: { id, name, traits } });
    eventLog.push({ event: 'EnergyProvisioned', payload: { id, initialEnergy, maxEnergy } });
    return { individual, energy };
  }

  // Forms a group around an individual (initiator is founder/leader)
  static createGroup(id: string, name: string, founder: IndividualAggregate) {
    const founderId = founder.getId();
    const group = new GroupAggregate(
      new GroupEntity(id, name, [founderId], { [founderId]: 'founder' }, {}),
    );
    eventLog.push({ event: 'GroupCreated', payload: { id, name, founder: founder.getName() } });
    return group;
  }

  // Adds an individual to a group, assigns role
  static addMemberToGroup(group: GroupAggregate, individual: IndividualAggregate, role = 'member') {
    group.addMember(individual.getId(), role);
    group.setRoleForMember(individual.getId(), role);
    eventLog.push({
      event: 'GroupMemberAdded',
      payload: { group: group.getName(), member: individual.getName(), role },
    });
  }

  // Group and counterparty negotiate a deal. Returns a deal aggregate.
  static negotiateDeal(
    dealId: string,
    groupA: GroupAggregate,
    counterpartyId: string,
    terms: DealTermVO[],
  ) {
    const deal = new DealAggregate(
      new DealEntity(
        dealId,
        [groupA.getId(), counterpartyId],
        Object.fromEntries(terms.map((term) => [term.key, term.value])),
        new Date(),
      ),
    );
    eventLog.push({
      event: 'DealNegotiated',
      payload: { dealId, parties: [groupA.getId(), counterpartyId], terms },
    });
    return deal;
  }

  // Orchestrate a productive action by an individual, consuming energy
  static performProductiveAction(
    energy: EnergyAggregate,
    cost: number,
    actor: IndividualAggregate,
    group?: GroupAggregate,
  ) {
    const costVO = new EnergyValueObject(cost);
    const spent = energy.spendEnergy(costVO);
    if (spent) {
      eventLog.push({
        event: 'EnergySpentForAction',
        payload: {
          actor: actor.getName(),
          amount: cost,
          context: group ? group.getName() : undefined,
        },
      });
    } else {
      eventLog.push({
        event: 'ActionFailed_InsufficientEnergy',
        payload: { actor: actor.getName(), attempted: cost, available: energy.getCurrentEnergy() },
      });
    }
    return spent;
  }

  // Fulfill part of a deal and verify a clause (e.g., after a productive group project)
  static fulfillDealClause(deal: DealAggregate, verifyingPartyId: string, note: string) {
    deal.verifyClause(verifyingPartyId, true, note);
    eventLog.push({
      event: 'DealClauseVerified',
      payload: {
        deal: deal.getId(),
        verifier: verifyingPartyId,
        note,
      },
    });
  }
}

// Application scenario: Orchestrated multi-context business flow
function mainScenario() {
  // 1. Register Alice & provision energy
  const traitFocus = new IndividualTraitVO('focus', 8, 'cognitive');
  const traitTrust = new IndividualTraitVO('trust', 6, 'personality');
  const { individual: alice, energy: aliceEnergy } = ApplicationService.registerIndividual(
    'alice',
    'Alice',
    [traitFocus, traitTrust],
  );

  // 2. Alice forms group "Pioneers"
  const pioneers = ApplicationService.createGroup('group1', 'Pioneers', alice);

  // 3. Alice adds herself as official leader (demonstrate role mutation)
  pioneers.setRoleForMember(alice.getId(), 'leader');
  eventLog.push({
    event: 'RoleAssigned',
    payload: { group: pioneers.getName(), member: alice.getName(), role: 'leader' },
  });

  // 4. Alice expends energy for a group project
  ApplicationService.performProductiveAction(aliceEnergy, 20, alice, pioneers);

  // 5. Add a group property (cohesion)
  const cohesionVO = new GroupPropertyVO('cohesion', 0.85);
  pioneers.setProperty(cohesionVO);
  eventLog.push({
    event: 'GroupPropertySet',
    payload: { group: pioneers.getName(), property: 'cohesion', value: 0.85 },
  });

  // 6. Negotiate deal with "Explorers" group
  const dealTerms = [new DealTermVO('resource_share', '60/40'), new DealTermVO('duration', 14)];
  const deal = ApplicationService.negotiateDeal('deal1', pioneers, 'group2', dealTerms);

  // 7. Pioneers fulfill first obligation in the deal
  ApplicationService.fulfillDealClause(
    deal,
    pioneers.getId(),
    'Delivered initial resources to Explorers',
  );

  // Output whole flow: Events & final states
  console.log('=== APPLICATION INTEGRATION EVENT LOG ===');
  for (const evt of eventLog) {
    console.log(evt.event, evt.payload);
  }

  console.log('\n=== FINAL STATE SNAPSHOTS ===');
  console.log('Alice:', alice.getSnapshot());
  console.log('Energy:', aliceEnergy.getSnapshot());
  console.log('Pioneers:', pioneers.getSnapshot());
  console.log('Deal:', deal.getSnapshot());
  // TODO: Integrate network, progression, and timeline/circadian debuff mechanics
  // TODO: Replace eventLog with actual event bus/publisher for distributed or message-driven design
}

mainScenario();
