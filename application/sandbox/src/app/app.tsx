import { IndividualFactory } from '@game1/individual';

export function App() {
  const player = IndividualFactory.create({
    name: 'vh',
  });
  console.log(player);
  return <pre>{JSON.stringify(player, null, 2)}</pre>;
}

export default App;
