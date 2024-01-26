import { FC } from 'react';

import App from './app/App';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider/themeProvider';

const Root: FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default Root;
