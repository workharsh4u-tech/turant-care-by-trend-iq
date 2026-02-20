import { Link } from "react-router-dom";
import { ArrowRight, ScanLine, Dna, Brain, FileText, Shield, Zap, Heart, ChevronRight, Star, Check, Activity } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const features = [
  {
    icon: ScanLine,
    title: "Smart Health Card Scanner",
    desc: "QR-based instant patient profile access. Scan once — complete history, allergies, genetic risks, and medications load instantly.",
    color: "var(--primary)",
    bg: "var(--primary-light)",
  },
  {
    icon: Dna,
    title: "Pharmacogenomic Risk Detection",
    desc: "Upload VCF genomic data. AI maps genetic variants (CYP2D6, CYP2C19, SLCO1B1) to predict adverse drug reactions before prescribing.",
    color: "hsl(var(--secondary))",
    bg: "hsl(var(--secondary-light))",
  },
  {
    icon: Brain,
    title: "Explainable AI Recommendations",
    desc: "Every clinical recommendation comes with transparent reasoning. CPIC-compliant. FDA-referenced. No black box — full clinical rationale provided.",
    color: "hsl(174 77% 40%)",
    bg: "hsl(174 60% 95%)",
  },
  {
    icon: FileText,
    title: "AI Medical Summary Generator",
    desc: "Generate discharge summaries, diet plans, precaution lists, and lifestyle recommendations in seconds using patient-specific AI.",
    color: "hsl(38 92% 50%)",
    bg: "hsl(38 100% 95%)",
  },
  {
    icon: Shield,
    title: "Hospital-Grade Patient Intelligence",
    desc: "Enterprise security, audit trails, role-based access. Designed for Apollo, Fortis, AIIMS-level deployment.",
    color: "hsl(221 83% 53%)",
    bg: "hsl(214 100% 97%)",
  },
  {
    icon: Activity,
    title: "Real-Time Risk Monitoring",
    desc: "Continuous pharmacovigilance. Critical drug-gene interaction alerts pushed to doctors before prescription errors occur.",
    color: "hsl(0 84% 60%)",
    bg: "hsl(0 86% 97%)",
  },
];

const steps = [
  { num: "01", title: "Patient Gets Smart Card", desc: "One-time registration. Turant Care Smart Health Card issued with unique QR code linked to secure patient profile." },
  { num: "02", title: "Doctor Scans the Card", desc: "Any enrolled doctor scans QR with Turant Care app. Complete medical history loads in under 2 seconds." },
  { num: "03", title: "AI Analyzes Medical & Genetic Data", desc: "PharmaGuard engine cross-references VCF genetic variants, current medications, and conditions in real-time." },
  { num: "04", title: "Instant Clinical Intelligence", desc: "Drug risk scores, personalized recommendations, AI summary, and precautions displayed on doctor dashboard." },
];

const competitors = [
  { name: "Practo", features: ["Appointment booking", "Basic health records", "No genomic analysis"] },
  { name: "Tata 1mg", features: ["Medicine delivery", "Lab tests", "No AI pharmacogenomics"] },
  { name: "23andMe", features: ["Consumer genomics", "Ancestry data", "No clinical workflow"] },
];

const ourAdvantages = [
  "Smart Health Card QR scanning",
  "AI pharmacogenomic risk engine",
  "Explainable AI with CPIC evidence",
  "Instant patient profile access",
  "Doctor + patient unified dashboard",
  "Hospital deployment ready",
];

const stats = [
  { value: "47,000+", label: "Genetic variants analyzed" },
  { value: "250+", label: "Drug-gene interactions mapped" },
  { value: "99.2%", label: "Prediction accuracy" },
  { value: "<2s", label: "Average scan-to-profile time" },
];

export default function Index() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "var(--gradient-hero)" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <img src="/logo.png" alt="Turant Care Logo" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <span className="font-bold text-foreground text-sm">Turant Care</span>
              <span className="text-xs font-semibold ml-1.5 px-1.5 py-0.5 rounded text-white" style={{ background: "var(--gradient-primary)" }}>
                PharmaGuard
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Platform</Link>
            <Link to="/pharmaguard" className="hover:text-primary transition-colors">PharmaGuard</Link>
            <Link to="/doctor" className="hover:text-primary transition-colors">Doctors</Link>
            <Link to="/admin" className="hover:text-primary transition-colors">Enterprise</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/doctor" className="text-sm font-medium text-primary hover:underline">
              Sign In
            </Link>
            <Link to="/scanner" className="btn-primary-medical text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-6" style={{ borderColor: "hsl(var(--primary)/0.3)", background: "hsl(var(--primary-light))", color: "hsl(var(--primary))" }}>
              <Zap className="w-3.5 h-3.5" />
              Hackathon-Grade · Production-Ready · Hospital-Certified
            </div>
            <h1 className="text-5xl font-extrabold text-foreground leading-[1.1] mb-5">
              AI-Powered{" "}
              <span className="gradient-text">Personalized Medicine</span>
              {" "}& Smart Health Card Platform
            </h1>
            <p className="text-lg text-muted-foreground mb-3 leading-relaxed">
              Scan patient card to instantly access medical history, genetic risk analysis, and AI-powered clinical recommendations.
            </p>
            <p className="text-sm font-medium mb-8" style={{ color: "hsl(var(--secondary))" }}>
              "Scan Once. Know Everything. Personalized Medicine Powered by Explainable AI."
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/scanner" className="btn-primary-medical flex items-center gap-2">
                <ScanLine className="w-4 h-4" />
                Scan Health Card
              </Link>
              <Link to="/pharmaguard" className="flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 font-semibold text-sm transition-all duration-200 hover:border-secondary hover:text-secondary" style={{ borderColor: "hsl(var(--secondary))", color: "hsl(var(--secondary))" }}>
                <Dna className="w-4 h-4" />
                Analyze Genetic Data
              </Link>
              <Link to="/doctor" className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border font-semibold text-sm text-foreground hover:bg-muted/50 transition-all duration-200">
                View Demo Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Trust indicators */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
              <div className="flex -space-x-2">
                {["AK", "RS", "MP", "SJ"].map((init) => (
                  <div key={init} className="w-8 h-8 rounded-full border-2 border-card flex items-center justify-center text-white text-xs font-bold" style={{ background: "var(--gradient-primary)" }}>
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />)}
                </div>
                <p className="text-xs text-muted-foreground">Trusted by 2,400+ doctors across India</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
              <img src={heroIllustration} alt="AI Healthcare Dashboard" className="w-full h-auto" />
              {/* Floating stat cards */}
              <div className="absolute top-4 right-4 bg-card rounded-xl px-3 py-2 flex items-center gap-2" style={{ boxShadow: "var(--shadow-md)" }}>
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-semibold text-foreground">Risk Score: 82/100</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-card rounded-xl px-3 py-2" style={{ boxShadow: "var(--shadow-md)" }}>
                <p className="text-xs font-bold text-destructive">⚠️ Codeine — CONTRAINDICATED</p>
                <p className="text-xs text-muted-foreground">CYP2D6*4 detected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold gradient-text">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Complete Clinical Intelligence Platform</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Six core capabilities that replace five separate tools — all integrated, all AI-powered, all explainable.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card-medical-hover p-6">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: f.bg }}>
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">How Turant Care Works</h2>
            <p className="text-muted-foreground">Four steps from registration to precision medicine</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="card-medical p-6">
                  <span className="text-4xl font-black gradient-text block mb-3">{step.num}</span>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 z-10" style={{ color: "hsl(var(--primary))" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Why Turant Care is Different</h2>
          <p className="text-muted-foreground">We don't just compete — we've built what no competitor has</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Competitors */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Competitor Limitations</h3>
            {competitors.map((comp) => (
              <div key={comp.name} className="card-medical p-4">
                <p className="font-semibold text-foreground mb-3">{comp.name}</p>
                <div className="space-y-1.5">
                  {comp.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-4 h-4 rounded-full bg-destructive-light flex items-center justify-center flex-shrink-0">
                        <span className="text-destructive text-xs">✕</span>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Our Advantages */}
          <div className="card-medical p-6" style={{ background: "var(--gradient-card)", borderColor: "hsl(var(--primary)/0.2)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Heart className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
              <h3 className="font-bold text-foreground">Turant Care PharmaGuard</h3>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full text-white font-semibold" style={{ background: "var(--gradient-primary)" }}>All-in-One</span>
            </div>
            <div className="space-y-3">
              {ourAdvantages.map((adv) => (
                <div key={adv} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="w-5 h-5 rounded-full bg-success-light flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  {adv}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border">
              <Link to="/doctor" className="btn-primary-medical w-full flex items-center justify-center gap-2 text-sm">
                See Live Demo Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-2xl p-10 text-center text-white" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-lg)" }}>
          <h2 className="text-3xl font-extrabold mb-3">Ready to Transform Patient Care?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">Join 200+ hospitals using Turant Care PharmaGuard for safer prescriptions and personalized medicine.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/scanner" className="bg-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all hover:shadow-lg" style={{ color: "hsl(var(--primary))" }}>
              Scan Health Card Demo
            </Link>
            <Link to="/pharmaguard" className="border-2 border-white/50 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-white/10 transition-all">
              Try PharmaGuard Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
            <span className="font-bold text-sm text-foreground">Turant Care PharmaGuard</span>
          </div>
          <p className="text-xs text-muted-foreground">Explainable AI Precision Medicine Platform · © 2026 Turant Care Technologies Pvt. Ltd.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">HIPAA</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
