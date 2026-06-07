import { useState, useEffect } from "react";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ResumeAnalysis from "./components/ResumeAnalysis";
import CandidateSearch from "./components/CandidateSearch";

function App() {
  const [file, setFile] = useState(null);

  const [analytics, setAnalytics] = useState(null);

  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResponse(data);
    } catch (error) {
      console.error(error);

      alert("Error uploading resume");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/analytics");

      const data = await res.json();

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      p-10
    "
    >
      <div
        className="
        bg-white
        w-full
        max-w-4xl
        rounded-2xl
        shadow-xl
        p-8
      "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-center
          mb-8
        "
        >
          AI Resume Screening System
        </h1>

        {/* Upload Section */}

        <div
          className="
          flex
          flex-col
          items-center
          gap-4
        "
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="
              border
              p-3
              rounded-lg
              w-full
            "
          />

          <button
            onClick={uploadResume}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
              transition
            "
          >
            {loading ? "Processing..." : "Upload Resume"}
          </button>
        </div>

        {/* Analytics */}

        <AnalyticsDashboard analytics={analytics} />

        <CandidateSearch />

        <ResumeAnalysis response={response} />

        {/* Resume Analysis */}

        <ResumeAnalysis response={response} />
      </div>
    </div>
  );
}

export default App;
