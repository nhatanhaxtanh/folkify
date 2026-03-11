import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../auth";

export function PublicOnlyRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
