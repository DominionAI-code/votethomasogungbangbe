"use client";
import { QRCodeSVG } from "qrcode.react";
import { Share2, Download } from "lucide-react";

export default function SignupQR({ url }) {
  const downloadQR = () => {
    const svg = document.getElementById("qr-gen");
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(xml);
    const image64 = "data:image/svg+xml;base64," + svg64;

    const downloadLink = document.createElement("a");
    downloadLink.href = image64;
    downloadLink.download = "WuraDidan_Signup_QR.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center bg-white p-10 rounded-[50px] shadow-2xl border border-slate-50">
      <div className="p-6 bg-slate-50 rounded-[40px] mb-6">
        <QRCodeSVG
          id="qr-gen"
          value={url}
          size={240}
          bgColor={"#f8fafc"}
          fgColor={"#D4AF37"} // Your Campaign Gold
          level={"H"}
          includeMargin={false}
        />
      </div>

      <h3 className="text-xl font-black italic uppercase text-slate-900 mb-2">
        Scan to Join
      </h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
        Official Supporter Registry
      </p>

      <button
        onClick={downloadQR}
        className="flex items-center gap-2 bg-black text-[#D4AF37] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
      >
        <Download size={16} /> Download for Posters
      </button>
    </div>
  );
}
