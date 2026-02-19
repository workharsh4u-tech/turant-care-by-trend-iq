import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, Heart, Dna, Shield, Activity, Pill, AlertTriangle, Calendar, Phone, Mail, MapPin, Droplets, FileText, ChevronRight, Download, Share2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { mockPatient, mockMedicalHistory, mockGeneticProfile, mockPharmaGuardResult } from "@/data/mockData";

export default function PatientProfile() {
  const { patientId } = useParams();
  const p = mockPatient;
  const mh = mockMedicalHistory;
  const gp = mockGeneticProfile;
  const pgx = mockPharmaGuardResult;

  return (
    <DashboardLayout title={`Patient Profile — ${p.name}`} subtitle={`ID: ${patientId || p.id} · Last updated: ${mh.lastVisit}`}>
      {/* Header Actions */}
      <div className="flex items-center gap-3 mb-5">
        <Link to="/doctor" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-muted/40 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-muted/40 transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <Link to="/pharmaguard" className="btn-primary-medical text-xs flex items-center gap-1.5 py-1.5">
            <Dna className="w-3.5 h-3.5" /> Run PGx Analysis
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Patient Card */}
        <div className="card-medical overflow-hidden">
          <div className="h-24" style={{ background: "var(--gradient-primary)" }} />
          <div className="px-5 pb-5">
            <div className="w-16 h-16 rounded-2xl border-4 border-card flex items-center justify-center text-white text-xl font-extrabold -mt-8 mb-3" style={{ background: "var(--gradient-primary)" }}>
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h2 className="font-extrabold text-foreground text-lg">{p.name}</h2>
            <p className="text-sm text-muted-foreground">{p.age} years · {p.gender}</p>
            <div className="flex items-center gap-2 mt-2">
              <Droplets className="w-3.5 h-3.5 text-destructive" />
              <span className="text-sm font-bold text-destructive">{p.bloodGroup}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="badge-risk-high">Codeine ⚠️</span>
            </div>

            <div className="mt-4 space-y-2.5 border-t border-border pt-4">
              {[
                { icon: Shield, label: p.id },
                { icon: Calendar, label: p.dob },
                { icon: Phone, label: p.phone },
                { icon: Mail, label: p.email },
                { icon: MapPin, label: p.address },
                { icon: Heart, label: p.registeredAt },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to="/ai-summary" className="btn-primary-medical text-center text-xs py-2">
                AI Summary
              </Link>
              <Link to="/scanner" className="text-center text-xs py-2 rounded-lg border border-border font-semibold text-muted-foreground hover:bg-muted/40 transition-colors">
                Rescan
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Medical Conditions */}
          <div className="card-medical p-5">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Medical Conditions & History
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Active Conditions</p>
                <div className="space-y-1.5">
                  {mh.conditions.map((c) => (
                    <div key={c} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-light text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="font-medium text-foreground">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Allergies</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mh.allergies.map((a) => (
                    <span key={a} className="badge-risk-high">{a}</span>
                  ))}
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Past Surgeries</p>
                {mh.pastSurgeries.map((s) => (
                  <div key={s} className="text-sm text-foreground">{s}</div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Current Medications</p>
              <div className="grid md:grid-cols-3 gap-2">
                {mh.currentMedications.map((med) => (
                  <div key={med.name} className="p-3 rounded-xl border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Pill className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                      <p className="text-xs font-bold text-foreground">{med.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{med.frequency}</p>
                    <p className="text-xs text-muted-foreground">Since {med.since}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Genetic Profile */}
          <div className="card-medical p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Dna className="w-4 h-4 text-secondary" /> Pharmacogenomic Profile
              </h3>
              <span className="badge-risk-moderate">{gp.phenotype}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl" style={{ background: "hsl(var(--secondary-light))" }}>
              {[
                { label: "Primary Gene", value: gp.primaryGene },
                { label: "Diplotype", value: gp.diplotype },
                { label: "Analysis Date", value: gp.analysisDate },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-bold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {gp.detectedVariants.map((v) => (
                <div key={v.gene + v.variant} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                    {v.gene[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{v.gene} {v.variant}</p>
                    <p className="text-xs text-muted-foreground">{v.effect}</p>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">{v.alleleFreq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PGx Risk Summary */}
          <div className="card-medical p-5 border-l-4" style={{ borderLeftColor: "hsl(var(--destructive))" }}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <h3 className="font-bold text-foreground">PharmaGuard Risk Alert — {pgx.drug}</h3>
              <span className="badge-risk-high ml-auto">{pgx.riskLabel}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{pgx.recommendation}</p>
            <div className="flex items-center gap-3">
              <Link to="/pharmaguard" className="btn-primary-medical text-xs flex items-center gap-1.5 py-2">
                <FileText className="w-3.5 h-3.5" /> Full Analysis Report
              </Link>
              <span className="text-xs text-muted-foreground">Risk Score: <strong className="text-destructive">{pgx.riskScore}/100</strong> · Confidence: {pgx.confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
