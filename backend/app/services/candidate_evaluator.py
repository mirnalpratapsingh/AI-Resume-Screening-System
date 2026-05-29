class CandidateEvaluator:

    @staticmethod
    def evaluate(
        similarity_score,
        skills,
        missing_skills,
        experience_years,
        education_data
    ):

        strengths = []
        weaknesses = []

        # Similarity Score Analysis
        if similarity_score >= 0.80:
            strengths.append(
                "Strong match with job requirements"
            )

        elif similarity_score >= 0.60:
            strengths.append(
                "Moderate alignment with job requirements"
            )

        else:
            weaknesses.append(
                "Low alignment with job requirements"
            )

        # Experience Analysis
        if experience_years >= 3:
            strengths.append(
                f"{experience_years} years of experience"
            )

        elif experience_years > 0:
            strengths.append(
                f"{experience_years} years of experience"
            )

        else:
            weaknesses.append(
                "No significant experience detected"
            )

        # Skill Analysis
        if len(skills) >= 5:
            strengths.append(
                "Strong technical skill set"
            )

        elif len(skills) >= 3:
            strengths.append(
                "Decent technical skill set"
            )

        else:
            weaknesses.append(
                "Limited technical skills detected"
            )

        # Missing Skills
        if len(missing_skills) > 0:
            weaknesses.append(
                f"Missing {len(missing_skills)} required skills"
            )

        # Education Analysis
        degrees = education_data.get(
            "degrees",
            []
        )

        if degrees:
            strengths.append(
                f"Relevant education: {', '.join(degrees)}"
            )

        else:
            weaknesses.append(
                "No degree information detected"
            )

        # Final Recommendation
        if (
            similarity_score >= 0.80
            and experience_years >= 1
        ):
            recommendation = (
                "Strong Candidate"
            )

        elif similarity_score >= 0.60:
            recommendation = (
                "Potential Candidate"
            )

        else:
            recommendation = (
                "Needs Further Review"
            )

        return {
            "strengths": strengths,
            "weaknesses": weaknesses,
            "recommendation": recommendation
        }