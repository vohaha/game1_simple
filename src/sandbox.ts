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

// Application scenario: Geopolitical userflow: multi-country, conflict, and support dynamics

function geopoliticalUserflow() {
  // 1. Create individuals that will act as founders/leaders of each country
  const countries = [
    { id: 'usa', name: 'USA' },
    { id: 'chn', name: 'China' },
    { id: 'ukr', name: 'Ukraine' },
    { id: 'fra', name: 'France' },
    { id: 'ger', name: 'Germany' },
    { id: 'ita', name: 'Italy' },
    { id: 'pol', name: 'Poland' },
    { id: 'c404', name: 'Country404' },
  ];

  // Each gets a leader (traits are minimal for this demo)
  const leaders: Record<string, IndividualAggregate> = {};
  const energies: Record<string, EnergyAggregate> = {};
  for (const country of countries) {
    const { individual, energy } = ApplicationService.registerIndividual(
      `${country.id}_ldr`,
      `${country.name}Leader`,
      [new IndividualTraitVO('leadership', 8, 'personality')],
    );
    leaders[country.name] = individual;
    energies[country.name] = energy;
  }

  // 2. Create groups ("countries"), each led by its founder
  const groups: Record<string, GroupAggregate> = {};
  for (const country of countries) {
    groups[country.name] = ApplicationService.createGroup(
      `group_${country.id}`,
      country.name,
      leaders[country.name],
    );
    groups[country.name].setRoleForMember(leaders[country.name].getId(), 'leader');
  }

  // 3. Country404 declares war on Ukraine (special domain event + relationship)
  eventLog.push({
    event: 'CountryDeclaredWar',
    payload: { aggressor: 'Country404', target: 'Ukraine' },
  });
  // TODO: Implement actual war state/deal in Group/Deal aggregate as needed

  // 4. Ukraine seeks allies/support: creates "UkraineAllies" group and tries to add countries
  const ukrSupportGroup = ApplicationService.createGroup(
    'group_ukr_support',
    'UkraineAllies',
    leaders['Ukraine'],
  );
  ApplicationService.addMemberToGroup(ukrSupportGroup, leaders['France'], 'ally');
  ApplicationService.addMemberToGroup(ukrSupportGroup, leaders['Germany'], 'ally');
  ApplicationService.addMemberToGroup(ukrSupportGroup, leaders['Poland'], 'ally');
  // TODO: Add more dynamic logic/negotiation for support agreements

  // 5. Country404 seeks relationship/support from China (deal/alliance)
  const c404_china_terms = [
    new DealTermVO('military_support', true),
    new DealTermVO('resource_aid', 1000),
  ];
  const c404_china_deal = ApplicationService.negotiateDeal(
    'deal_c404_china_support',
    groups['Country404'],
    groups['China'].getId(),
    c404_china_terms,
  );
  ApplicationService.fulfillDealClause(
    c404_china_deal,
    groups['Country404'].getId(),
    'China agrees to support Country404 in the conflict',
  );

  // Print event log for this scenario
  console.log('=== GEOPOLITICAL USERFLOW EVENT LOG ===');
  for (const evt of eventLog) {
    console.log(evt.event, evt.payload);
  }

  // Print final state snapshots
  console.log('\n=== FINAL STATE SNAPSHOTS ===');
  for (const name of Object.keys(groups)) {
    console.log(`${name} group:`, groups[name].getSnapshot());
    if (leaders[name]) {
      console.log(`${name} leader:`, leaders[name].getSnapshot());
      console.log(`${name} energy:`, energies[name].getSnapshot());
    }
  }
  console.log('UkraineAllies group:', ukrSupportGroup.getSnapshot());
  console.log('C404-China Deal:', c404_china_deal.getSnapshot());
  // TODO: Model ongoing war/peace negotiations, resource transfer events, and full alliance mechanics
}

geopoliticalUserflow();
