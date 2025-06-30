import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/app/server.ts',
  output: {
    file: 'dist/server.js',
  },
  platform: "node",
  watch: true
});
