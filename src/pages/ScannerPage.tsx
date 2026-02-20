import { useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  QrCode,
  CheckCircle,
  Heart,
  Camera,
  ScanLine
} from "lucide-react";

import DashboardLayout from "@/components/DashboardLayout";
import { mockPatient } from "@/data/mockData";

type ScanState = "idle" | "scanning" | "success";

export default function ScannerPage() {

  const navigate = useNavigate();

  const [scanState, setScanState] = useState<ScanState>("idle");

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  let qrInstance: Html5Qrcode | null = null;


  // CAMERA QR SCAN FUNCTION
  const handleScan = async () => {

    setScanState("scanning");

    setTimeout(async () => {

      try {

        qrInstance = new Html5Qrcode("qr-reader");

        await qrInstance.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250
          },

          (decodedText) => {

            console.log("Scanned:", decodedText);

            if (qrInstance) {
              qrInstance.stop();
            }

            setScanState("success");

            // redirect to patient page
            setTimeout(() => {
              navigate("/patient");
            }, 800);

          },

          (errorMessage) => {
            // ignore scan errors
          }

        );

      } catch (err) {

        console.error("Camera start error:", err);

      }

    }, 300);

  };


  // FILE UPLOAD QR
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setUploadedFile(file.name);

    setScanState("scanning");

    setTimeout(() => {

      setScanState("success");

      setTimeout(() => {
        navigate("/patient");
      }, 1000);

    }, 2000);

  };


  return (

    <DashboardLayout
      title="Smart Health Card Scanner"
      subtitle="Scan patient QR card to instantly access their full medical profile"
    >

      <div className="max-w-2xl mx-auto">

        {/* SCANNER CARD */}

        <div className="card-medical p-8 mb-5 text-center">

          {/* SCANNER BOX */}

          <div className="relative mx-auto w-72 h-72 mb-6">

            {/* border glow */}

            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: "2px solid #3b82f6",
              }}
            />

            {/* CAMERA VIEW */}

            <div className="absolute inset-4 rounded-xl overflow-hidden bg-black">

              {/* idle */}
              {scanState === "idle" && (

                <div className="flex items-center justify-center h-full">

                  <QrCode className="w-20 h-20 text-white opacity-40" />

                </div>

              )}

              {/* camera */}
              {scanState === "scanning" && (

                <div
                  id="qr-reader"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />

              )}

              {/* success */}
              {scanState === "success" && (

                <div className="flex items-center justify-center h-full bg-green-50">

                  <CheckCircle className="w-16 h-16 text-green-600" />

                </div>

              )}

            </div>


            {/* corners */}

            {[
              "top-3 left-3 border-t border-l",
              "top-3 right-3 border-t border-r",
              "bottom-3 left-3 border-b border-l",
              "bottom-3 right-3 border-b border-r"
            ].map((cls, i) => (

              <div
                key={i}
                className={`absolute w-5 h-5 ${cls}`}
                style={{
                  borderColor: "#3b82f6",
                  borderWidth: "3px"
                }}
              />

            ))}

          </div>


          {/* STATUS */}

          {scanState === "idle" && (

            <p className="text-muted-foreground text-sm mb-6">

              Click scan to open camera and scan QR code

            </p>

          )}

          {scanState === "scanning" && (

            <p className="text-blue-600 font-semibold text-sm mb-6">

              Camera is ON — point QR code to scan

            </p>

          )}

          {scanState === "success" && (

            <p className="text-green-600 font-semibold text-sm mb-6">

              Patient Found — Opening profile...

            </p>

          )}


          {/* BUTTONS */}

          {scanState === "idle" && (

            <div className="flex flex-col gap-3">

              <button
                onClick={handleScan}
                className="btn-primary-medical w-full flex items-center justify-center gap-2"
              >

                <Camera className="w-4 h-4" />

                Scan Smart Health Card

              </button>


              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-6 py-2 border rounded-lg"
              >

                <Upload className="w-4 h-4 inline mr-2" />

                Upload QR Image

              </button>


              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

            </div>

          )}

        </div>


        {/* INFO */}

        <div className="card-medical p-5">

          <h3 className="font-bold mb-3 text-sm flex items-center gap-2">

            <Heart className="w-4 h-4 text-primary" />

            Smart Health Card Technology

          </h3>

          <div className="grid grid-cols-3 gap-3 text-xs text-center">

            <div className="p-3 bg-primary-light rounded">

              Unique QR

            </div>

            <div className="p-3 bg-primary-light rounded">

              Instant Scan

            </div>

            <div className="p-3 bg-primary-light rounded">

              Full Profile

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}
```
