import { Link } from "react-router-dom";
import { Users, Dna, AlertTriangle, TrendingUp, Activity, Shield, Brain, ScanLine, BarChart3, PieChart, Globe, ArrowRight, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { mockRecentPatients } from "@/data/mockData";

const globalStats = [
  { label: "Total Patients", value: "12,847", change: "+234 this month", icon: Users, color: "hsl(var(--primary))", bg: "hsl(var(--primary-light))" },
  { label: "PGx Analyses", value: "4,312", change: "+89 this week", icon: Dna, color: "hsl(var(--secondary))", bg: "hsl(var(--secondary-light))" },
  { label: "Risk Alerts Prevented", value: "847", change: "Drug errors avoided", icon: Shield, color: "hsl(var(--success))", bg: "hsl(var(--success-light))" },
  { label: "AI Summaries Generated", value: "23,411", change: "+1.2k this month", icon: Brain, color: "hsl(var(--warning))", bg: "hsl(var(--warning-light))" },
];

const hospitalStats = [
  { name: "Apollo Hospital, Gurgaon", patients: 3241, pgx: 912, risk: 8 },
  { name: "Fortis Memorial, Delhi", patients: 2187, pgx: 634, risk: 5 },
  { name: "AIIMS, New Delhi", patients: 4812, pgx: 1847, risk: 14 },
  { name: "Max Super Specialty", patients: 1934, pgx: 521, risk: 3 },
  { name: "Medanta, Gurugram", patients: 673, pgx: 398, risk: 2 },
];

const geneDistribution = [
  { gene: "CYP2D6", percentage: 45, count: 1941, color: "hsl(var(--primary))" },
  { gene: "CYP2C19", percentage: 28, count: 1207, color: "hsl(var(--secondary))" },
  { gene: "SLCO1B1", percentage: 15, count: 647, color: "hsl(var(--warning))" },
  { gene: "TPMT", percentage: 7, count: 302, color: "hsl(var(--success))" },
  { gene: "DPYD", percentage: 5, count: 215, color: "hsl(var(--destructive))" },
];

const topDrugAlerts = [
  { drug: "Codeine", alerts: 312, gene: "CYP2D6", trend: "+12%" },
  { drug: "Warfarin", alerts: 287, gene: "CYP2C9/VKORC1", trend: "+8%" },
  { drug: "Clopidogrel", alerts: 198, gene: "CYP2C19", trend: "+15%" },
  { drug: "Simvastatin", alerts: 134, gene: "SLCO1B1", trend: "+3%" },
  { drug: "Fluorouracil", alerts: 89, gene: "DPYD", trend: "+22%" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Turant Care PharmaGuard · Enterprise Analytics · All Hospitals">
      {/* Global Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {globalStats.map((stat, i) => (
          <div key={stat.label} className="stat-card animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: stat.bg }}>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
              <p className="text-xs text-success">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Hospital Performance */}
        <div className="lg:col-span-2 card-medical p-5 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Hospital Network Performance
            </h2>
            <span className="text-xs text-muted-foreground">{hospitalStats.length} Hospitals</span>
          </div>
          <div className="space-y-3">
            {hospitalStats.map((h, i) => (
              <div key={h.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{h.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{h.patients.toLocaleString()}</span> patients</span>
                    <span className="text-xs text-muted-foreground"><span className="font-medium text-secondary">{h.pgx.toLocaleString()}</span> PGx</span>
                    <span className="text-xs text-destructive font-medium">{h.risk} alerts</span>
                  </div>
                </div>
                <div className="w-24">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(h.patients / 5000) * 100}%`, background: "var(--gradient-primary)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gene Distribution */}
        <div className="card-medical p-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-secondary" />
            Gene Variant Distribution
          </h2>
          <div className="space-y-3">
            {geneDistribution.map((g) => (
              <div key={g.gene}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-foreground">{g.gene}</span>
                  <span className="text-muted-foreground">{g.count.toLocaleString()} cases ({g.percentage}%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${g.percentage}%`, background: g.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
            Based on {(4312).toLocaleString()} analyses across all hospitals
          </div>
        </div>

        {/* Top Drug Alerts */}
        <div className="card-medical p-5 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Top Drug-Gene Alerts
          </h2>
          <div className="space-y-2">
            {topDrugAlerts.map((d, i) => (
              <div key={d.drug} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
                <span className="text-xs font-bold text-muted-foreground w-5 text-center">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{d.drug}</p>
                  <p className="text-xs text-muted-foreground">Gene: {d.gene}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-destructive">{d.alerts}</p>
                  <p className="text-xs text-success">{d.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients Across System */}
        <div className="lg:col-span-2 card-medical p-5 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent System Activity
            </h2>
            <Link to="/doctor" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {mockRecentPatients.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  {p.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.condition}</p>
                </div>
                <div className="text-right">
                  <span className={p.riskLevel === "High" ? "badge-risk-high" : p.riskLevel === "Moderate" ? "badge-risk-moderate" : "badge-risk-low"}>
                    {p.riskLevel}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.lastScan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="card-medical p-5 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-success" />
            System Health
          </h2>
          <div className="space-y-3">
            {[
              { label: "API Uptime", value: "99.99%", status: "Operational" },
              { label: "PGx Engine", value: "Online", status: "Operational" },
              { label: "AI Summary Engine", value: "Online", status: "Operational" },
              { label: "Scanner Service", value: "Online", status: "Operational" },
              { label: "Database", value: "Healthy", status: "Operational" },
              { label: "Avg Response Time", value: "127ms", status: "Excellent" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{s.label}</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-success" />
                  <span className="font-semibold text-foreground">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground text-center">
            All systems operational · Last checked 2 min ago
          </div>
        </div>
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        {[
          { label: "Doctor Dashboard", icon: Users, href: "/doctor" },
          { label: "Scan Health Card", icon: ScanLine, href: "/scanner" },
          { label: "PharmaGuard", icon: Dna, href: "/pharmaguard" },
          { label: "AI Summary", icon: Brain, href: "/ai-summary" },
        ].map((item) => (
          <Link key={item.label} to={item.href} className="card-medical-hover p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--primary-light))" }}>
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">{item.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
