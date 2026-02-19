import { Link } from "react-router-dom";
import { Users, AlertTriangle, ScanLine, Activity, Dna, TrendingUp, ArrowRight, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { mockDoctorStats, mockRecentPatients } from "@/data/mockData";
import { cn } from "@/lib/utils";

const riskColors: Record<string, string> = {
  High: "badge-risk-high",
  Moderate: "badge-risk-moderate",
  Low: "badge-risk-low",
};

const statCards = [
  {
    title: "Total Patients",
    value: "1,847",
    change: "+12 this week",
    icon: Users,
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary-light))",
  },
  {
    title: "Risk Alerts",
    value: "23",
    change: "3 critical",
    icon: AlertTriangle,
    color: "hsl(var(--warning))",
    bg: "hsl(var(--warning-light))",
  },
  {
    title: "Today's Scans",
    value: "8",
    change: "Active now",
    icon: ScanLine,
    color: "hsl(var(--secondary))",
    bg: "hsl(var(--secondary-light))",
  },
  {
    title: "PGx Analyses",
    value: "312",
    change: "+28 this month",
    icon: Dna,
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary-light))",
  },
];

const alerts = [
  { patient: "Priya Sharma", alert: "Codeine CONTRAINDICATED — CYP2D6*4", severity: "Critical", time: "2 hrs ago" },
  { patient: "Rajesh Kumar", alert: "Warfarin dose adjustment needed — VKORC1", severity: "High", time: "4 hrs ago" },
  { patient: "Amit Verma", alert: "Clopidogrel reduced efficacy — CYP2C19*2", severity: "Moderate", time: "6 hrs ago" },
];

export default function DoctorDashboard() {
  return (
    <DashboardLayout title="Doctor Dashboard" subtitle="Welcome back, Dr. Anand Kapoor · Apollo Hospital, Gurgaon">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <div key={card.title} className="stat-card animate-fade-in">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: card.bg }}>
              <card.icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-extrabold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 card-medical p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground">Recent Patient Scans</h2>
            <Link to="/profile/TC-2024-001847" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockRecentPatients.map((patient, i) => (
              <div
                key={patient.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  {patient.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground">{patient.name}</p>
                    <span className={cn("text-xs", riskColors[patient.riskLevel])}>
                      {patient.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{patient.condition} · {patient.id}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {patient.lastScan}
                  </div>
                  <Link to={`/profile/${patient.id}`} className="text-xs font-semibold text-primary hover:underline">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex gap-3">
            <Link to="/scanner" className="btn-primary-medical flex-1 text-center text-sm py-2 flex items-center justify-center gap-2">
              <ScanLine className="w-4 h-4" />
              Scan New Patient
            </Link>
            <Link to="/pharmaguard" className="flex-1 text-center text-sm py-2 rounded-lg border-2 font-semibold flex items-center justify-center gap-2 transition-colors" style={{ borderColor: "hsl(var(--secondary))", color: "hsl(var(--secondary))" }}>
              <Dna className="w-4 h-4" />
              Run PGx Analysis
            </Link>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="space-y-4">
          <div className="card-medical p-5">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Critical Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className="p-3 rounded-xl border animate-fade-in"
                  style={{
                    background: alert.severity === "Critical" ? "hsl(var(--destructive-light))" : "hsl(var(--warning-light))",
                    borderColor: alert.severity === "Critical" ? "hsl(var(--destructive)/0.2)" : "hsl(var(--warning)/0.2)",
                    animationDelay: `${i * 0.08}s`
                  }}>
                  <p className="text-xs font-bold text-foreground">{alert.patient}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.alert}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className={cn("text-xs font-semibold", alert.severity === "Critical" ? "text-destructive" : "text-warning")}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-medical p-5">
            <h2 className="font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Scan Health Card", icon: ScanLine, href: "/scanner" },
                { label: "PharmaGuard Analysis", icon: Dna, href: "/pharmaguard" },
                { label: "AI Medical Summary", icon: Activity, href: "/ai-summary" },
                { label: "Patient Analytics", icon: TrendingUp, href: "/admin" },
              ].map((action) => (
                <Link key={action.label} to={action.href}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary-light hover:text-primary transition-colors text-sm font-medium text-muted-foreground group"
                >
                  <action.icon className="w-4 h-4 flex-shrink-0 group-hover:text-primary" />
                  {action.label}
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
