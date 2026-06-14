import { useState } from "react";

export default function UploadForm() {

  const [file, setFile] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Upload Documentation
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        className="block mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
      >
        Upload PDF
      </button>

      {file && (
        <p className="mt-3">
          Selected: {file.name}
        </p>
      )}

    </div>
  );
}