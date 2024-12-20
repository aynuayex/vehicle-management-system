import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userId) {
      navigate("/sign-in");
    }
  }, [navigate, userId]);

  if (!isLoaded) return "Loading...";

  return <Outlet />;
}
