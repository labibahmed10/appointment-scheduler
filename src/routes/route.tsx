import App from "@/App";
import Registration from "@/pages/registration/Registration";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoutes"; // Make sure the import path is correct

const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

export default allRoutes;
