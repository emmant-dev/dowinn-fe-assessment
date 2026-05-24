// app/dashboard/layout.tsx
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar projects={[]} onSelectProject={() => {}} />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
