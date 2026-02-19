import { useState, useRef } from "react";
import { Upload, Dna, AlertTriangle, Check, Loader2, Copy, CheckCheck, Info, ChevronDown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { mockPharmaGuardResult, mockDrugs, mockGeneticProfile } from "@/data/mockData";
import { cn } from "@/lib/utils";

type AnalysisState = "idle" | "uploading" | "analyzing" | "done";

export default function PharmaGuardAnalysis() {
  const [state, setState] = useState<AnalysisState>("idle");
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const result = mockPharmaGuardResult;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file.name);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file.name);
  };

  const toggleDrug = (value: string) => {
    setSelectedDrugs((prev) => prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]);
  };

  const handleAnalyze = () => {
    if (!uploadedFile && selectedDrugs.length === 0) return;
    setState("uploading");
    setTimeout(() => setState("analyzing"), 1200);
    setTimeout(() => setState("done"), 3500);
  };

  const jsonOutput = JSON.stringify({
    patient_id: "TC-2024-001847",
    analysis_timestamp: new Date().toISOString(),
    drug_analyzed: result.drug,
    risk_label: result.riskLabel,
    risk_score: result.riskScore,
    confidence: result.confidence,
    severity: result.severity,
    primary_gene: result.primaryGene,
    diplotype: result.diplotype,
    phenotype: result.phenotype,
    detected_variants: result.variants,
    recommendation: result.recommendation,
    alternatives: result.alternatives,
    cpic_evidence: "Level A",
    references: result.references,
  }, null, 2);

  const copyJSON = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout title="PharmaGuard Analysis" subtitle="AI Pharmacogenomic Drug Risk Prediction Engine">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Input Panel */}
        {state !== "done" && (
          <div className="grid md:grid-cols-2 gap-5 animate-fade-in">
            {/* VCF Upload */}
            <div className="card-medical p-5">
              <h3 className="font-bold text-foreground mb-1 flex items-center gap-2">
                <Dna className="w-4 h-4 text-secondary" />
                Upload Genomic VCF File
              </h3>
              <p className="text-xs text-muted-foreground mb-4">Upload patient's VCF (Variant Call Format) file for pharmacogenomic analysis</p>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                  isDragOver ? "border-primary bg-primary-light" : uploadedFile ? "border-success bg-success-light" : "border-border hover:border-primary/50 hover:bg-primary-light/30"
                )}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedFile ? (
                  <>
                    <Check className="w-10 h-10 text-success mx-auto mb-2" />
                    <p className="font-semibold text-success text-sm">{uploadedFile}</p>
                    <p className="text-xs text-muted-foreground mt-1">VCF file ready for analysis</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-foreground text-sm">Drag & drop VCF file here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse · .vcf, .vcf.gz supported</p>
                  </>
                )}
                <input ref={fileInputRef} type="file" accept=".vcf,.gz" className="hidden" onChange={handleFileSelect} />
              </div>
              <button
                className="mt-3 w-full text-xs py-2 rounded-lg border border-border font-medium text-muted-foreground hover:bg-muted/40 transition-colors"
                onClick={() => setUploadedFile("demo_patient_TC001847.vcf")}
              >
                📁 Use Demo VCF File
              </button>
            </div>

            {/* Drug Selection */}
            <div className="card-medical p-5">
              <h3 className="font-bold text-foreground mb-1">Select Drugs to Analyze</h3>
              <p className="text-xs text-muted-foreground mb-4">Select one or more drugs for pharmacogenomic risk prediction</p>
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {mockDrugs.map((drug) => (
                  <button
                    key={drug.value}
                    onClick={() => toggleDrug(drug.value)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-150 text-sm",
                      selectedDrugs.includes(drug.value)
                        ? "border-primary bg-primary-light"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border",
                      selectedDrugs.includes(drug.value) ? "bg-primary border-primary" : "border-border"
                    )}>
                      {selectedDrugs.includes(drug.value) && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{drug.label}</p>
                      <p className="text-xs text-muted-foreground">Gene: {drug.gene}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!uploadedFile && selectedDrugs.length === 0}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200",
                  (uploadedFile || selectedDrugs.length > 0)
                    ? "btn-primary-medical"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {state === "uploading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading VCF...</>
                  : state === "analyzing" ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing pharmacogenomic profile...</>
                  : <><Dna className="w-4 h-4" /> Analyze Drug Risk</>}
              </button>
            </div>
          </div>
        )}

        {/* Analyzing State */}
        {(state === "uploading" || state === "analyzing") && (
          <div className="card-medical p-8 text-center animate-fade-in">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">
              {state === "uploading" ? "Parsing VCF File..." : "Analyzing Pharmacogenomic Profile..."}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {state === "uploading"
                ? "Extracting genetic variants from VCF file"
                : "Mapping CYP2D6, CYP2C19, SLCO1B1 variants to drug interactions"}
            </p>
            <div className="max-w-sm mx-auto space-y-2 text-xs text-left">
              {[
                { label: "VCF Parsing", done: true },
                { label: "Variant Extraction (47,000+ sites)", done: true },
                { label: "Gene Star Allele Calling", done: state === "analyzing" },
                { label: "Diplotype Determination", done: state === "analyzing" },
                { label: "CPIC Guideline Matching", done: false },
                { label: "Risk Score Calculation", done: false },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-2">
                  {step.done
                    ? <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                    : <Loader2 className="w-3.5 h-3.5 text-primary animate-spin flex-shrink-0" />}
                  <span className={step.done ? "text-foreground" : "text-muted-foreground"}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {state === "done" && (
          <div className="space-y-5 animate-fade-in">
            {/* Result Header */}
            <div className="card-medical p-5 border-l-4" style={{ borderLeftColor: "hsl(var(--destructive))" }}>
              <div className="flex items-center gap-3 flex-wrap">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
                <div>
                  <h2 className="font-extrabold text-foreground text-lg">{result.drug} — {result.riskLabel}</h2>
                  <p className="text-sm text-muted-foreground">CYP2D6 Intermediate Metabolizer · CPIC Level A Evidence</p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <span className="badge-risk-high text-sm">{result.severity}</span>
                  <span className="badge-risk-moderate text-sm">Confidence: {result.confidence}%</span>
                  <button
                    onClick={() => setState("idle")}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    New Analysis
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Risk Assessment */}
              <div className="card-medical p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" /> Risk Assessment
                </h3>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-destructive">{result.riskScore}</div>
                    <div className="text-xs text-muted-foreground">Risk Score /100</div>
                  </div>
                  <div className="flex-1">
                    <div className="progress-bar mb-1.5">
                      <div className="progress-fill bg-destructive" style={{ width: `${result.riskScore}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Confidence: {result.confidence}%</p>
                    <div className="progress-bar mt-1">
                      <div className="progress-fill" style={{ width: `${result.confidence}%`, background: "hsl(var(--success))" }} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Drug", value: result.drug },
                    { label: "Severity", value: result.severity },
                    { label: "Gene", value: result.primaryGene },
                    { label: "Diplotype", value: result.diplotype },
                    { label: "Phenotype", value: result.phenotype },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pharmacogenomic Profile */}
              <div className="card-medical p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Dna className="w-4 h-4 text-secondary" /> Pharmacogenomic Profile
                </h3>
                <div className="space-y-3 mb-4">
                  {mockGeneticProfile.detectedVariants.map((v) => (
                    <div key={v.gene + v.variant} className="flex items-center gap-3 p-2.5 rounded-xl border border-border">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                        {v.gene[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{v.gene} {v.variant}</p>
                        <p className="text-xs text-muted-foreground">{v.effect} · {v.alleleFreq} allele freq</p>
                      </div>
                      <span className={cn(
                        "text-xs font-semibold",
                        v.effect.includes("Loss") ? "text-destructive" : v.effect.includes("Reduced") ? "text-warning" : "text-success"
                      )}>
                        {v.effect.includes("Loss") ? "⬇ LOF" : v.effect.includes("Reduced") ? "⬇ RF" : "✓ NF"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Recommendation */}
              <div className="card-medical p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" /> Clinical Recommendation
                </h3>
                <div className="p-3 rounded-xl bg-destructive-light border border-destructive/20 mb-4">
                  <p className="text-sm font-semibold text-foreground">{result.recommendation}</p>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Safe Alternatives</p>
                <div className="space-y-1.5">
                  {result.alternatives.map((alt) => (
                    <div key={alt} className="flex items-center gap-2 p-2.5 rounded-lg bg-success-light text-sm">
                      <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      <span className="font-medium text-foreground">{alt}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Clinical References</p>
                  {result.references.map((ref) => (
                    <p key={ref} className="text-xs text-primary hover:underline cursor-pointer">• {ref}</p>
                  ))}
                </div>
              </div>

              {/* Explainable AI */}
              <div className="card-medical p-5">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" /> Explainable AI Reasoning
                </h3>
                <div className="p-4 rounded-xl bg-primary-light border border-primary/10">
                  <p className="text-sm text-foreground leading-relaxed">{result.explanation}</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/40 text-center">
                    <p className="font-bold text-foreground">CPIC 2021</p>
                    <p className="text-muted-foreground">Guidelines Source</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40 text-center">
                    <p className="font-bold text-foreground">Level A</p>
                    <p className="text-muted-foreground">Evidence Level</p>
                  </div>
                </div>
              </div>
            </div>

            {/* JSON Output */}
            <div className="card-medical p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">Structured JSON Output</h3>
                <button
                  onClick={copyJSON}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border hover:bg-muted/40 transition-colors"
                >
                  {copied ? <><CheckCheck className="w-3.5 h-3.5 text-success" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy JSON</>}
                </button>
              </div>
              <pre className="bg-muted/30 rounded-xl p-4 text-xs text-foreground overflow-auto max-h-64 font-mono">
                {jsonOutput}
              </pre>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
