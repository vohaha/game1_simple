import { PlayerFactory } from '@game1/player';

export function App() {
  const player = PlayerFactory.create({
    name: 'vh',
  });
  console.log(player);
  return <pre>{JSON.stringify(player, null, 2)}</pre>;
}

export default App;
