import { IndividualFactory } from '@game1/individual';

export function App() {
  const player = IndividualFactory.create({
    name: 'vh',
  });
  console.log(player);
  player.energy.change(-1);
  console.log(player.energy.value);
  return <pre>{player.serialize()}</pre>;
}

export default App;
