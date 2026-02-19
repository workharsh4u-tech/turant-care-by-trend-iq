import { Link } from "react-router-dom";
import { User, Heart, Dna, Shield, Activity, Pill, AlertTriangle, Calendar, Phone, Mail, MapPin, ChevronRight, Droplets } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { mockPatient, mockMedicalHistory, mockGeneticProfile, mockPharmaGuardResult } from "@/data/mockData";
import { cn } from "@/lib/utils";

function RiskGauge({ score }: { score: number }) {
  const color = score >= 70 ? "hsl(var(--destructive))" : score >= 40 ? "hsl(var(--warning))" : "hsl(var(--success))";
  const rotation = (score / 100) * 180 - 90;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-14 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full" style={{ background: `conic-gradient(hsl(var(--success)) 0deg, hsl(var(--warning)) 90deg, hsl(var(--destructive)) 180deg)`, clipPath: "inset(0 0 50% 0)" }} />
        <div className="absolute bottom-0 left-1/2 w-1 h-12 origin-bottom rounded-full" style={{ background: color, transform: `translateX(-50%) rotate(${rotation}deg)` }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-card border-2" style={{ borderColor: color }} />
      </div>
      <div className="text-2xl font-extrabold mt-1" style={{ color }}>
        {score}<span className="text-sm font-medium text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  const p = mockPatient;
  const mh = mockMedicalHistory;
  const gp = mockGeneticProfile;
  const pgx = mockPharmaGuardResult;

  return (
    <DashboardLayout title="Patient Dashboard" subtitle={`Patient: ${p.name} · ${p.id}`}>
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Patient Info Card */}
        <div className="card-medical p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground text-sm">Patient Information</h2>
          </div>
          <div className="flex items-center gap-4 mb-5 pb-4 border-b border-border">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-extrabold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-bold text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.age} yrs · {p.gender}</p>
              <div className="flex items-center gap-1 mt-1">
                <Droplets className="w-3 h-3 text-destructive" />
                <span className="text-xs font-semibold text-destructive">{p.bloodGroup}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2.5 text-xs">
            {[
              { icon: Shield, label: "Patient ID", value: p.id },
              { icon: Calendar, label: "DOB", value: p.dob },
              { icon: Phone, label: "Phone", value: p.phone },
              { icon: Mail, label: "Email", value: p.email },
              { icon: MapPin, label: "Address", value: p.address },
              { icon: Heart, label: "Insurance", value: p.insuranceId },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">{label}: </span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex gap-2">
            <Link to={`/profile/${p.id}`} className="btn-primary-medical flex-1 text-center text-xs py-2">
              Full Profile
            </Link>
            <Link to="/ai-summary" className="flex-1 text-center text-xs py-2 rounded-lg border border-border font-semibold text-muted-foreground hover:bg-muted/50 transition-colors">
              AI Summary
            </Link>
          </div>
        </div>

        {/* Medical History */}
        <div className="card-medical p-5 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground text-sm">Medical History</h2>
          </div>
          
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Active Conditions</p>
            <div className="space-y-1.5">
              {mh.conditions.map((c) => (
                <div key={c} className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg bg-primary-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">⚠️ Allergies</p>
            <div className="flex flex-wrap gap-1.5">
              {mh.allergies.map((a) => (
                <span key={a} className="badge-risk-high">{a}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Current Medications</p>
            <div className="space-y-2">
              {mh.currentMedications.map((med) => (
                <div key={med.name} className="flex items-start gap-2">
                  <Pill className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.frequency} · Since {med.since}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Next Appointment</p>
            <div className="p-2.5 rounded-lg bg-success-light text-xs">
              <p className="font-semibold text-foreground">{mh.upcomingAppointment}</p>
            </div>
          </div>
        </div>

        {/* Genetic Profile */}
        <div className="card-medical p-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-4">
            <Dna className="w-4 h-4" style={{ color: "hsl(var(--secondary))" }} />
            <h2 className="font-bold text-foreground text-sm">Genetic Profile</h2>
          </div>
          <div className="p-3 rounded-xl mb-4" style={{ background: "hsl(var(--secondary-light))" }}>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-muted-foreground">Primary Gene</p>
                <p className="font-bold text-foreground">{gp.primaryGene}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Diplotype</p>
                <p className="font-bold text-foreground">{gp.diplotype}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phenotype</p>
                <p className="font-bold text-foreground text-[10px]">{gp.phenotype}</p>
              </div>
            </div>
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Detected Variants</p>
          <div className="space-y-2">
            {gp.detectedVariants.map((v) => (
              <div key={v.gene + v.variant} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  {v.gene[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{v.gene} {v.variant}</p>
                  <p className="text-xs text-muted-foreground truncate">{v.effect}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{v.alleleFreq}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
            Analyzed: {gp.analysisDate} · {gp.vcfFile}
          </div>
        </div>

        {/* PharmaGuard Risk Card */}
        <div className="lg:col-span-3 card-medical p-5 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-destructive" />
            <h2 className="font-bold text-foreground">PharmaGuard Risk Assessment — {pgx.drug}</h2>
            <span className="ml-2 badge-risk-high text-sm">{pgx.riskLabel}</span>
            <span className="ml-auto text-xs font-semibold text-muted-foreground">Confidence: {pgx.confidence}%</span>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {/* Gauge */}
            <div className="card-medical p-4 bg-muted/20 flex flex-col items-center justify-center text-center">
              <RiskGauge score={pgx.riskScore} />
              <p className="text-xs font-semibold text-muted-foreground mt-2">Risk Score</p>
              <p className="text-xs font-bold text-destructive mt-1">{pgx.severity}</p>
            </div>
            {/* Confidence */}
            <div className="card-medical p-4 bg-muted/20">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Confidence</p>
              <p className="text-2xl font-extrabold text-foreground mb-2">{pgx.confidence}%</p>
              <div className="progress-bar">
                <div className="progress-fill bg-destructive" style={{ width: `${pgx.confidence}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-3">Gene: {pgx.primaryGene}</p>
              <p className="text-xs text-muted-foreground">Diplotype: {pgx.diplotype}</p>
            </div>
            {/* Recommendation */}
            <div className="card-medical p-4 bg-muted/20">
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-warning" /> Recommendation
              </p>
              <p className="text-xs text-foreground font-medium mb-3">{pgx.recommendation}</p>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Safe Alternatives:</p>
              {pgx.alternatives.map((alt) => (
                <div key={alt} className="flex items-center gap-1.5 text-xs text-foreground mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                  {alt}
                </div>
              ))}
            </div>
            {/* Explanation */}
            <div className="card-medical p-4 bg-muted/20">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Explainable AI Reasoning</p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-6">{pgx.explanation}</p>
              <Link to="/pharmaguard" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 mt-2">
                Full Analysis <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
