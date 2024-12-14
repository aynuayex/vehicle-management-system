import axios from "axios";
import { Toaster } from "react-hot-toast";
import { SignIn, SignUp } from "@clerk/clerk-react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";
import HomePage from "./routes/home";
import VehicleForm from "./routes/vehicle-form";
import DashboardPage, { vehiclesDataLoader } from "./routes/dashboard";
import ThemeContextProvider from "@/contexts/theme-context";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="sign-in"
          element={
            <div className="flex justify-center">
              <SignIn />
            </div>
          }
        />
        <Route
          path="sign-up"
          element={
            <div className="flex justify-center">
              <SignUp />
            </div>
          }
        />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={<DashboardPage />}
            loader={vehiclesDataLoader}
          />
          <Route
            path="vehicle"
            element={<VehicleForm />}
            loader={async () => null}
          />
          <Route
            path="vehicle/:id"
            element={<VehicleForm />}
            loader={async ({ params }) => {
              const response = await axios.get(
                `${import.meta.env.VITE_BASE_API}/api/v1/vehicles/${params.id}`
              );
              console.log(response.data);
              return response.data;
            }}
          />
        </Route>
      </Route>,
      {
        future: {
          v7_relativeSplatPath: true,
        },
      }
    )
  );

  return (
    <ThemeContextProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      <Toaster />
    </ThemeContextProvider>
  );
}

export default App;
