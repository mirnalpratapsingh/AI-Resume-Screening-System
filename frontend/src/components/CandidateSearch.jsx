import { useState } from "react";

function CandidateSearch() {

  const [skill, setSkill] =
    useState("");

  const [
    minExperience,
    setMinExperience
  ] = useState("");

  const [
    minSimilarity,
    setMinSimilarity
  ] = useState("");

  const [results, setResults] =
    useState([]);

  const searchCandidates =
    async () => {

      try {

        const res =
          await fetch(
            "http://127.0.0.1:8000/search-candidates",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                skill,
                min_experience:
                  minExperience
                    ? Number(
                        minExperience
                      )
                    : null,

                min_similarity:
                  minSimilarity
                    ? Number(
                        minSimilarity
                      )
                    : null,
              }),
            }
          );

        const data =
          await res.json();

        setResults(
          data.results
        );

      } catch (error) {

        console.error(
          error
        );

      }
    };

  return (
    <div className="mt-10">

      <h2
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Candidate Search
      </h2>

      <div
        className="
        grid
        grid-cols-3
        gap-4
        mb-4
      "
      >
        <input
          type="text"
          placeholder="Skill"

          value={skill}

          onChange={(e) =>
            setSkill(
              e.target.value
            )
          }

          className="
          border
          p-3
          rounded-lg
        "
        />

        <input
          type="number"
          placeholder="Min Experience"

          value={
            minExperience
          }

          onChange={(e) =>
            setMinExperience(
              e.target.value
            )
          }

          className="
          border
          p-3
          rounded-lg
        "
        />

        <input
          type="number"
          step="0.1"

          placeholder="Min Similarity"

          value={
            minSimilarity
          }

          onChange={(e) =>
            setMinSimilarity(
              e.target.value
            )
          }

          className="
          border
          p-3
          rounded-lg
        "
        />
      </div>

      <button
        onClick={
          searchCandidates
        }

        className="
        bg-green-600
        text-white
        px-5
        py-3
        rounded-lg
      "
      >
        Search
      </button>

      <div className="mt-8">

        {results.map(
          (
            candidate,
            index
          ) => (

            <div
              key={index}

              className="
              bg-white
              p-4
              rounded-xl
              shadow
              mb-4
            "
            >
              <p>
                <strong>
                  Experience:
                </strong>{" "}
                {
                  candidate.experience_years
                }
              </p>

              <p>
                <strong>
                  Similarity:
                </strong>{" "}
                {
                  candidate.similarity_score
                }
              </p>

              <p>
                <strong>
                  Skills:
                </strong>{" "}
                {
                  candidate.skills.join(
                    ", "
                  )
                }
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default CandidateSearch;