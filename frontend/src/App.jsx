import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect } from "react";
import { useState } from "react";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          AI Resume Screening System
        </h1>

        {/* Upload Section */}

        <div className="flex flex-col items-center gap-4">
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

        {/* Response Section */}

        {response && (
          <div className="mt-10">
            <div className="bg-gray-50 p-6 rounded-xl border">
              <h2 className="text-2xl font-semibold mb-6">Analysis Result</h2>
              {analytics && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-6">
                    Recruiter Analytics Dashboard
                  </h2>

                  {/* Stats */}

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow">
                      <h3 className="text-lg font-semibold">Total Resumes</h3>

                      <p className="text-3xl mt-2">{analytics.total_resumes}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                      <h3 className="text-lg font-semibold">Avg Experience</h3>

                      <p className="text-3xl mt-2">
                        {analytics.average_experience}
                      </p>
                    </div>
                  </div>

                  {/* Skills Chart */}

                  <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h3 className="text-xl font-semibold mb-4">Top Skills</h3>

                    <BarChart
                      width={500}
                      height={300}
                      data={analytics.top_skills.map(([skill, count]) => ({
                        skill,
                        count,
                      }))}
                    >
                      <XAxis dataKey="skill" />

                      <YAxis />

                      <Tooltip />

                      <Bar dataKey="count" />
                    </BarChart>
                  </div>

                  {/* Degree Distribution */}

                  <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-4">
                      Degree Distribution
                    </h3>

                    <PieChart width={400} height={300}>
                      <Pie
                        data={Object.entries(analytics.degree_distribution).map(
                          ([degree, value]) => ({
                            name: degree,
                            value,
                          }),
                        )}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                      >
                        {Object.entries(analytics.degree_distribution).map(
                          (_, index) => (
                            <Cell key={index} />
                          ),
                        )}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </div>
                </div>
              )}
              {/* Resume ID */}

              <p className="mb-3">
                <span className="font-semibold">Resume ID:</span>{" "}
                {response.resume_id}
              </p>

              {/* Resume Summary */}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">
                  AI Resume Summary
                </h3>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700">{response.summary}</p>
                </div>
              </div>

              {/* Experience */}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Experience</h3>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {response.experience_years} Years
                  </p>
                </div>
              </div>

              {/* Education */}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Education</h3>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="mb-2">
                    <span className="font-semibold">Degrees:</span>{" "}
                    {response.education.degrees.join(", ")}
                  </p>

                  <p>
                    <span className="font-semibold">Graduation Years:</span>{" "}
                    {response.education.graduation_years.join(", ")}
                  </p>
                </div>
              </div>

              {/* Similarity Score */}

              <p className="mb-6">
                <span className="font-semibold">Similarity Score:</span>{" "}
                {response.similarity_score}
              </p>

              {/* Extracted Skills */}

              <div className="mt-5">
                <h3 className="text-xl font-semibold mb-3">Extracted Skills</h3>

                <div className="flex flex-wrap gap-2">
                  {response.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="
                              bg-blue-100
                              text-blue-800
                              px-3
                              py-1
                              rounded-full
                              text-sm
                            "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matched Skills */}

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Matched Skills</h3>

                <div className="flex flex-wrap gap-2">
                  {response.matched_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="
                              bg-green-100
                              text-green-800
                              px-3
                              py-1
                              rounded-full
                              text-sm
                            "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Missing Skills</h3>

                <div className="flex flex-wrap gap-2">
                  {response.missing_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="
                              bg-red-100
                              text-red-800
                              px-3
                              py-1
                              rounded-full
                              text-sm
                            "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Candidate Evaluation
              </h3>

              <p>
                <strong>Recommendation:</strong>
                {response.candidate_evaluation.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
