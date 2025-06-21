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
import { ChronotypeWindow } from './time/ChronotypeWindowVO';

// Userflow: Simulate an individual joining a group, performing actions, and entering a deal

function userflow() {
  // 1. Create an Individual (with some traits)
  const traitFocus = new IndividualTraitVO('focus', 7, 'cognitive');
  const traitTrust = new IndividualTraitVO('trust', 5, 'personality');

  const individualEntity = new IndividualEntity({
    id: 'ind1',
    name: 'Alice',
    traits: [traitFocus, traitTrust],
  });
  const individualAggregate = new IndividualAggregate(individualEntity);

  // 2. Provision their Energy
  const initialEnergy = 100;
  const maxEnergy = 120;
  const chronoWindow = new ChronotypeWindow();
  const energyEntity = new EnergyEntity({
    id: 'energy1',
    energy: initialEnergy,
    maxEnergy,
    chronotypeWindow: chronoWindow,
  });
  const energyAggregate = new EnergyAggregate(energyEntity);

  // 3. Alice spends energy on a productive action
  const actionEnergyCost = new EnergyValueObject(23);
  const actionResult = energyAggregate.spendEnergy(actionEnergyCost);

  // 4. Alice forms a group, becomes the founder/leader
  const groupPropertyCohesion = new GroupPropertyVO('cohesion', 0.7);
  const groupEntity = new GroupEntity(
    'group1',
    'Pioneers',
    [individualAggregate.getId()],
    { [individualAggregate.getId()]: 'founder' },
    { cohesion: groupPropertyCohesion.value },
  );
  const groupAggregate = new GroupAggregate(groupEntity);

  // 5. Group adds property/role (simulate new member, skip creation)
  groupAggregate.setProperty(groupPropertyCohesion);
  groupAggregate.setRoleForMember(individualAggregate.getId(), 'leader');

  // 6. Form a deal between Alice's group and a theoretical external party
  const dealTerms = [
    new DealTermVO('resource_share', '50/50'),
    new DealTermVO('duration', 7), // days
    // TODO: Add more complex/conditional terms as needed
  ];
  const dealEntity = new DealEntity(
    'deal1',
    ['group1', 'group2'],
    Object.fromEntries(dealTerms.map((term) => [term.key, term.value])),
    new Date(),
  );
  const dealAggregate = new DealAggregate(dealEntity);

  // 7. Fulfill and verify part of the deal
  dealAggregate.verifyClause('group1', true, 'Delivered initial resource.');

  // 8. Output userflow results (snapshots)
  console.log('=== USERFLOW: INITIAL STATE ===');
  console.log('Individual:', individualAggregate.getSnapshot());
  console.log('Energy:', energyAggregate.getSnapshot());
  console.log('Group:', groupAggregate.getSnapshot());
  console.log('Deal:', dealAggregate.getSnapshot());

  // Simulate more turns, e.g., energy regeneration, deal review, group action
  // TODO: Integrate time-based progression, trait mutation, network/service orchestrations
}

userflow();
