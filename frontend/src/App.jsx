import { useState } from "react";

function App() {

  const [file, setFile] = useState(null);

  const [response, setResponse] = useState(null);

  const uploadResume = async () => {

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(
      "http://127.0.0.1:8000/upload-resume",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setResponse(data);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          AI Resume Screening System
        </h1>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-4"
        />

        <button
          onClick={uploadResume}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Resume
        </button>

        {
          response && (

            <div className="mt-6">

              <h2 className="text-xl font-semibold">
                Results
              </h2>

              <p className="mt-2">
                Similarity Score:
                {" "}
                {response.similarity_score}
              </p>

              <div className="mt-4">

                <h3 className="font-semibold">
                  Skills
                </h3>

                <ul className="list-disc ml-6">

                  {
                    response.skills.map(
                      (skill, index) => (
                        <li key={index}>
                          {skill}
                        </li>
                      )
                    )
                  }

                </ul>

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default App;