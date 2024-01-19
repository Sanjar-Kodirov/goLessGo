import { createRoot } from 'react-dom/client';

import Root from './Root';
import './app/styles/index.scss';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}
