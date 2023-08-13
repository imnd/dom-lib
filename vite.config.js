import path  from 'path'
import { defineConfig } from 'vite'

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'dom.js'),
      name: 'dom',
      fileName: 'dom'
    },
  }
});

export default config;
