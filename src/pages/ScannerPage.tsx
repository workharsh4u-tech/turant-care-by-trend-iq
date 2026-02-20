import { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { QrCode, CheckCircle, Camera } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

type ScanState = "idle" | "scanning" | "success";

export default function ScannerPage() {

  const navigate = useNavigate();

  const [scanState, setScanState] = useState<ScanState>("idle");

  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {

    if (scanState !== "scanning") return;

    const startScanner = async () => {

      try {

        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        const cameras = await Html5Qrcode.getCameras();

        if (!cameras.length) {
          alert("No camera found");
          return;
        }

        // select back camera if available
        const backCamera =
          cameras.find(c => c.label.toLowerCase().includes("back")) ||
          cameras[cameras.length - 1];

        await scanner.start(
          backCamera.id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1
          },
          (decodedText) => {

            console.log("QR SCANNED:", decodedText);

            scanner.stop();

            setScanState("success");

            let patientId = "TC-2024-001847";

            if (decodedText.startsWith("TC-")) {
              patientId = decodedText;
            }

            if (decodedText.includes("/")) {
              const parts = decodedText.split("/");
              const last = parts[parts.length - 1];

              if (last.startsWith("TC-")) {
                patientId = last;
              }
            }

            console.log("Opening:", patientId);

            setTimeout(() => {
              navigate(`/profile/${patientId}`);
            }, 500);

          },
          (error) => {
            // ignore scan errors
          }
        );

      } catch (err) {
        console.error("Scanner error:", err);
      }

    };

    setTimeout(startScanner, 300);

    return () => {
      scannerRef.current?.stop().catch(()=>{});
    };

  }, [scanState, navigate]);


  const handleScan = () => {
    setScanState("scanning");
  };


  return (

    <DashboardLayout
      title="Smart Health Card Scanner"
      subtitle="Scan patient QR card"
    >

      <div className="max-w-2xl mx-auto">

        <div className="card-medical p-8 text-center">

          <div className="relative mx-auto w-72 h-72">

            <div className="absolute inset-0 rounded-xl overflow-hidden">

              {scanState === "idle" && (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <QrCode className="w-20 h-20 opacity-40"/>
                </div>
              )}

              {scanState === "scanning" && (
                <div
                  id="qr-reader"
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />
              )}

              {scanState === "success" && (
                <div className="flex items-center justify-center h-full bg-green-100">
                  <CheckCircle className="w-16 h-16 text-green-600"/>
                </div>
              )}

            </div>

          </div>

          {scanState === "idle" && (
            <button
              onClick={handleScan}
              className="btn-primary-medical w-full mt-6 flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4"/>
              Scan Smart Health Card
            </button>
          )}

          {scanState === "scanning" && (
            <p className="mt-4 text-blue-600 font-semibold">
              Camera is ON — show QR code
            </p>
          )}

          {scanState === "success" && (
            <p className="mt-4 text-green-600 font-semibold">
              Patient Found — opening profile...
            </p>
          )}

        </div>

      </div>

    </DashboardLayout>

  );

}
