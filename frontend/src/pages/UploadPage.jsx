import { useState } from "react";
import axios from "axios";

export default function UploadPage({ darkMode }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("product_id", 1);
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await axios.post(
        "http://localhost:8000/upload",
        formData
      );

      setSuccess(
        `Uploaded successfully. Document ID: ${res.data.document_id}`
      );
    } catch (err) {
      setSuccess("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div
      className={`min-h-screen p-10 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">

        <div
          className={`rounded-3xl p-10 border ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-slate-200"
          }`}
        >
          <h1 className="text-5xl font-bold mb-4">
            Upload Manuals
          </h1>

          <p className="opacity-70 mb-8">
            Upload service manuals and troubleshooting guides.
          </p>

          <div className="space-y-6">

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="w-full"
            />

            <button
              onClick={uploadFile}
              disabled={uploading}
              className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl"
            >
              {uploading
                ? "Uploading..."
                : "Upload PDF"}
            </button>

            {success && (
              <div className="text-emerald-400">
                {success}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}