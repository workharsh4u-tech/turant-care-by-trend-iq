import { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { ScanLine, Upload, QrCode, Loader2, CheckCircle, Heart, Camera } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { mockPatient } from "@/data/mockData";

type ScanState = "idle" | "scanning" | "success";

export default function ScannerPage() {
  const navigate = useNavigate();
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

 const handleScan = async () => {
  setScanState("scanning");

  try {
    const qr = new Html5Qrcode("qr-reader");

    await qr.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      (decodedText) => {
        console.log("Scanned:", decodedText);
        setScanState("success");

        qr.stop();

        setTimeout(() => {
          navigate("/patient");
        }, 1500);
      },
      (error) => {}
    );
  } catch (err) {
    console.error("Camera error:", err);
  }
};


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setScanState("scanning");
      setTimeout(() => {
        setScanState("success");
        setTimeout(() => navigate("/patient"), 1500);
      }, 2000);
    }
  };

  return (
    <DashboardLayout title="Smart Health Card Scanner" subtitle="Scan patient QR card to instantly access their full medical profile">
      <div className="max-w-2xl mx-auto">
        {/* Scanner Card */}
        <div className="card-medical p-8 mb-5 text-center">
          {/* Scanner Frame */}
          <div className="relative mx-auto w-72 h-72 mb-6">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-2xl animate-pulse-ring"
              style={{
                background: scanState === "success"
                  ? "hsl(var(--success)/0.08)"
                  : "hsl(var(--primary)/0.05)",
                border: `2px solid ${scanState === "success" ? "hsl(var(--success)/0.4)" : "hsl(var(--primary)/0.3)"}`,
              }}
            />

            {/* Scanner Frame */}
            <div
              id="qr-reader"
              className="absolute inset-4 rounded-xl overflow-hidden"
              style={{ background: "black" }}
            ></div>


              {scanState === "idle" && (
  <div id="qr-reader" className="w-full h-full flex items-center justify-center"></div>
)}


              {scanState === "scanning" && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-primary opacity-40" />
                  {/* Scan line */}
                  <div
                    className="absolute left-4 right-4 h-0.5 animate-scan-line"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)), transparent)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                </div>
              )}

              {scanState === "success" && (
                <div className="flex flex-col items-center gap-2 animate-fade-in-up">
                  <CheckCircle className="w-16 h-16 text-success" />
                  <p className="text-sm font-bold text-success">Patient Found!</p>
                </div>
              )}
            </div>

            {/* Corners */}
            {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-5 h-5 ${cls} rounded-sm`}
                style={{
                  borderColor: scanState === "success" ? "hsl(var(--success))" : "hsl(var(--primary))",
                  borderWidth: "3px",
                }}
              />
            ))}
          </div>

          {/* Status Text */}
          {scanState === "idle" && (
            <p className="text-muted-foreground text-sm mb-6">
              Hold the Smart Health Card QR code in front of the camera, or upload a QR image below.
            </p>
          )}
          {scanState === "scanning" && (
            <p className="text-primary font-semibold text-sm mb-6 animate-pulse">
              {uploadedFile ? `Processing ${uploadedFile}...` : "Scanning patient card... Please hold steady"}
            </p>
          )}
          {scanState === "success" && (
            <div className="mb-6 animate-fade-in-up">
              <p className="text-success font-bold text-sm">✓ Patient identified: {mockPatient.name}</p>
              <p className="text-muted-foreground text-xs mt-1">Redirecting to patient dashboard...</p>
            </div>
          )}

          {/* Action Buttons */}
          {scanState === "idle" && (
            <div className="flex flex-col gap-3">
              <button onClick={handleScan} className="btn-primary-medical w-full flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" />
                Scan Smart Health Card
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-2 font-semibold text-sm transition-all duration-200 hover:bg-muted/30"
                style={{ borderColor: "hsl(var(--secondary))", color: "hsl(var(--secondary))" }}
              >
                <Upload className="w-4 h-4" />
                Upload QR Code Image
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </div>
          )}
        </div>

        {/* Demo Quick Access */}
        {scanState === "idle" && (
          <div className="card-medical p-5">
            <h3 className="font-bold text-foreground mb-3 text-sm">Demo Patient Cards</h3>
            <div className="space-y-2">
              {[
                { id: "TC-2024-001847", name: "Priya Sharma", risk: "High Risk", path: "/patient" },
                { id: "TC-2024-001823", name: "Amit Verma", risk: "Moderate Risk", path: "/patient" },
                { id: "TC-2024-001799", name: "Sunita Rao", risk: "Low Risk", path: "/patient" },
              ].map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => { setScanState("scanning"); setTimeout(() => { setScanState("success"); setTimeout(() => navigate(demo.path), 1500); }, 1800); }}
                  className="w-full flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary-light transition-all text-left"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                    {demo.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{demo.name}</p>
                    <p className="text-xs text-muted-foreground">{demo.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={demo.risk === "High Risk" ? "badge-risk-high" : demo.risk === "Moderate Risk" ? "badge-risk-moderate" : "badge-risk-low"}>
                      {demo.risk}
                    </span>
                    <ScanLine className="w-4 h-4 text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        {scanState === "idle" && (
          <div className="mt-5 card-medical p-5">
            <h3 className="font-bold text-foreground mb-3 text-sm flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              Smart Health Card Technology
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              {[
                { step: "1", title: "Unique QR", desc: "Each patient card has encrypted QR code" },
                { step: "2", title: "Instant Scan", desc: "Sub-2 second profile retrieval" },
                { step: "3", title: "Full Profile", desc: "Medical history + genetics + AI risks" },
              ].map((s) => (
                <div key={s.step} className="p-3 rounded-xl bg-primary-light">
                  <div className="w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold" style={{ background: "var(--gradient-primary)" }}>
                    {s.step}
                  </div>
                  <p className="font-semibold text-foreground mb-0.5">{s.title}</p>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
