import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ScanLine,
  Dna,
  Users,
  Brain,
  Settings,
  ChevronRight,
  Heart,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/doctor" },
  { label: "Scan Patient Card", icon: ScanLine, href: "/scanner" },
  { label: "PharmaGuard Analysis", icon: Dna, href: "/pharmaguard" },
  { label: "Patient Profiles", icon: Users, href: "/profile/TC-2024-001847" },
  { label: "AI Medical Summary", icon: Brain, href: "/ai-summary" },
  { label: "Settings", icon: Settings, href: "/doctor" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full" style={{ background: "var(--gradient-hero)" }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-card border-r border-border flex flex-col" style={{ boxShadow: "var(--shadow-md)" }}>
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground leading-tight">Turant Care</p>
              <p className="text-xs font-medium" style={{ color: "hsl(var(--secondary))" }}>PharmaGuard</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-2 pb-1">Main Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/doctor" && location.pathname.startsWith(item.href.split("/")[1] ? "/" + item.href.split("/")[1] : "/"));
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "sidebar-link",
                  location.pathname === item.href && "active"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {location.pathname === item.href && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: "var(--gradient-primary)" }}>
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Dr. Anand Kapoor</p>
              <p className="text-xs text-muted-foreground truncate">Endocrinologist</p>
            </div>
            <LogOut className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center gap-4 sticky top-0 z-10">
          <div className="flex-1">
            {title && (
              <div>
                <h1 className="text-lg font-bold text-foreground">{title}</h1>
                {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-9 pr-4 py-1.5 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-52"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-success/30 bg-success-light">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success">Live</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
