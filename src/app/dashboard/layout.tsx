import Sidebar from "@/components/DashboardLayout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside>
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-border bg-card p-4 h-16 flex items-center shrink-0">
          <h1 className="font-semibold">Dashboard</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
