import { createRoot } from 'react-dom/client';
import { array } from 'zod';

import Root from './Root';
import './app/styles/index.scss';
// @ts-ignore
import { makeServer } from './server.js';

const container = document.getElementById('root');

makeServer();
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}
