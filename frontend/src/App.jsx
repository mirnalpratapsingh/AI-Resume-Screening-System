import { useState } from "react";

function App() {

  const [file, setFile] = useState(null);

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

      const res = await fetch(
        "http://127.0.0.1:8000/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setResponse(data);

    } catch (error) {

      console.error(error);

      alert("Error uploading resume");

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          AI Resume Screening System
        </h1>

        <div className="flex flex-col items-center gap-4">

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="border p-2 rounded w-full"
          />

          <button
            onClick={uploadResume}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            {
              loading
                ? "Processing..."
                : "Upload Resume"
            }
          </button>

        </div>

        {
          response && (

            <div className="mt-10">

              <div className="bg-gray-50 p-6 rounded-xl border">

                <h2 className="text-2xl font-semibold mb-4">
                  Analysis Result
                </h2>

                <p className="mb-3">
                  <span className="font-semibold">
                    Resume ID:
                  </span>
                  {" "}
                  {response.resume_id}
                </p>

                <p className="mb-3">
                  <span className="font-semibold">
                    Similarity Score:
                  </span>
                  {" "}
                  {response.similarity_score}
                </p>

                <div className="mt-5">

                  <h3 className="text-xl font-semibold mb-2">
                    Extracted Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {
                      response.skills.map(
                        (skill, index) => (

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
                        )
                      )
                    }

                  </div>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default App;