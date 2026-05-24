class SkillGapAnalyzer:

    @staticmethod
    def analyze(
        candidate_skills,
        required_skills
    ):

        candidate_skills_set = set(
            skill.lower()
            for skill in candidate_skills
        )

        required_skills_set = set(
            skill.lower()
            for skill in required_skills
        )

        matched_skills = list(
            candidate_skills_set.intersection(
                required_skills_set
            )
        )

        missing_skills = list(
            required_skills_set.difference(
                candidate_skills_set
            )
        )

        return {
            "matched_skills": matched_skills,
            "missing_skills": missing_skills
        }