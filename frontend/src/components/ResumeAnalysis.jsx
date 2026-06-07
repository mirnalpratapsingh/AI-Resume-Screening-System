function ResumeAnalysis({ response }) {

  if (!response) return null;

  return (
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
          <span className="font-semibold">
            Resume ID:
          </span>{" "}
          {response.resume_id}
        </p>

        {/* Summary */}

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

        {/* Experience */}

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
              {response.experience_years}
              {" "}
              Years
            </p>
          </div>

        </div>

        {/* Education */}

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

        {/* Similarity */}

        <div className="mb-6">

          <p>
            <strong>
              Similarity Score:
            </strong>{" "}
            {
              response.similarity_score
            }
          </p>

        </div>

        {/* Skills */}

        <div className="mt-5">

          <h3
            className="
            text-xl
            font-semibold
            mb-3
          "
          >
            Extracted Skills
          </h3>

          <div
            className="
            flex
            flex-wrap
            gap-2
          "
          >
            {
              response.skills.map(
                (
                  skill,
                  index
                ) => (
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

        {/* Matched Skills */}

        <div className="mt-8">

          <h3
            className="
            text-xl
            font-semibold
            mb-3
          "
          >
            Matched Skills
          </h3>

          <div
            className="
            flex
            flex-wrap
            gap-2
          "
          >
            {
              response.matched_skills.map(
                (
                  skill,
                  index
                ) => (
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
                )
              )
            }
          </div>

        </div>

        {/* Missing Skills */}

        <div className="mt-8">

          <h3
            className="
            text-xl
            font-semibold
            mb-3
          "
          >
            Missing Skills
          </h3>

          <div
            className="
            flex
            flex-wrap
            gap-2
          "
          >
            {
              response.missing_skills.map(
                (
                  skill,
                  index
                ) => (
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
                )
              )
            }
          </div>

        </div>

        {/* Candidate Evaluation */}

        <div className="mt-8">

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

    </div>
  );
}

export default ResumeAnalysis;