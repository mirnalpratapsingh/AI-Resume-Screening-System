import {
  useState,
  useEffect
} from "react";

import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  const [file, setFile] = useState(null);

  const [analytics, setAnalytics] =
    useState(null);

  const [response, setResponse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {
      const res =
        await fetch(
          "http://127.0.0.1:8000/upload-resume",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await res.json();

      setResponse(data);

    } catch (error) {

      console.error(error);

      alert(
        "Error uploading resume"
      );

    } finally {

      setLoading(false);

    }
  };

  const fetchAnalytics =
    async () => {

      try {

        const res =
          await fetch(
            "http://127.0.0.1:8000/analytics"
          );

        const data =
          await res.json();

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
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="
              border
              p-3
              rounded-lg
              w-full
            "
          />

          <button
            onClick={
              uploadResume
            }
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
            {loading
              ? "Processing..."
              : "Upload Resume"}
          </button>
        </div>

        {/* Analytics */}

        <AnalyticsDashboard
          analytics={analytics}
        />

        {/* Resume Analysis */}

        {response && (
          <div className="mt-10">

            <div
              className="
              bg-gray-50
              p-6
              rounded-xl
              border
            "
            >
              <h2
                className="
                text-2xl
                font-semibold
                mb-6
              "
              >
                Analysis Result
              </h2>

              <p className="mb-3">
                <span
                  className="
                  font-semibold
                "
                >
                  Resume ID:
                </span>{" "}
                {response.resume_id}
              </p>

              <div className="mb-6">

                <h3
                  className="
                  text-xl
                  font-semibold
                  mb-3
                "
                >
                  AI Resume Summary
                </h3>

                <div
                  className="
                  bg-gray-100
                  p-4
                  rounded-lg
                "
                >
                  <p>
                    {response.summary}
                  </p>
                </div>

              </div>

              <div className="mb-6">

                <h3
                  className="
                  text-xl
                  font-semibold
                  mb-3
                "
                >
                  Experience
                </h3>

                <div
                  className="
                  bg-gray-100
                  p-4
                  rounded-lg
                "
                >
                  <p>
                    {
                      response.experience_years
                    }{" "}
                    Years
                  </p>
                </div>

              </div>

              <div className="mb-6">

                <h3
                  className="
                  text-xl
                  font-semibold
                  mb-3
                "
                >
                  Education
                </h3>

                <div
                  className="
                  bg-gray-100
                  p-4
                  rounded-lg
                "
                >
                  <p>
                    <strong>
                      Degrees:
                    </strong>{" "}
                    {
                      response.education
                        .degrees
                    .join(", ")
                    }
                  </p>

                  <p>
                    <strong>
                      Graduation Years:
                    </strong>{" "}
                    {
                      response.education
                        .graduation_years
                    .join(", ")
                    }
                  </p>
                </div>

              </div>

              <p className="mb-6">

                <strong>
                  Similarity Score:
                </strong>{" "}

                {
                  response
                    .similarity_score
                }

              </p>

              <h3
                className="
                text-xl
                font-semibold
                mb-3
              "
              >
                Candidate Evaluation
              </h3>

              <p>
                <strong>
                  Recommendation:
                </strong>{" "}

                {
                  response
                    .candidate_evaluation
                    .recommendation
                }
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;