import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Root() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="relative w-full max-w-sm min-h-screen bg-[#F7FAF8] shadow-2xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
