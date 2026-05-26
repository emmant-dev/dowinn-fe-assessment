// app/dashboard/layout.tsx
import Navbar from "../../../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden bg-gray-50">{children}</main>
    </div>
  );
}
