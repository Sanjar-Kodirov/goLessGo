import { RouterProvider } from 'react-router-dom';

import { router } from '../shared/config/routeConfig/routes';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
