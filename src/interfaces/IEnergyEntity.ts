export type EnergySnapshot = {
  id: string;
  energy: number;
  maxEnergy: number;
  chronotypeWindow: unknown; // Adjust this type if you have a more specific VO/interface.
  lastUpdated: number;
};

export interface IEnergyEntity {
  getId(): string;
  getSnapshot(): EnergySnapshot;
  getCurrentEnergy(): number;
  spend(amount: number): boolean;
  regenerate(amount: number): void;
  // TODO: Add further required methods after integrating event/circadian systems.
}
