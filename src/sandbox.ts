import { EnergySystem, demoEntity } from './index';

function runDemo(): void {
  const system = new EnergySystem();
  const status = system.getEnergyStatus();
  const demo = demoEntity();

  console.log('Demo Lib Composition Results:');
  console.log({ energyStatus: status, demoEntity: demo });
}

runDemo();
