import { FC } from 'react';

import App from './app/App';
import { StoreProvider } from './app/providers/StoreProvider';

const Root: FC = () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};

export default Root;
