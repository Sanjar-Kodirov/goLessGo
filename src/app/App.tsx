import { RouterProvider } from "react-router-dom";

import { router } from "../shared/config/routeConfig/routes";
import { Suspense } from "react";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
