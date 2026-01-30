import NavbarComponent from "@/components/NavbarConponent";
import SideBarComponent from "@/components/SideBarComponent";
import Profile from "./profile/page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <NavbarComponent />

      <div className="flex">
        {/* Sidebar with fixed width */}
        <div className="hidden sm:block w-64">
          <SideBarComponent />
        </div>

        <main className="flex-1 p-2 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
