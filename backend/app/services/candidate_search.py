from backend.app.database.mongodb import MongoDB


class CandidateSearch:

    @staticmethod
    def search_by_skill(skill):

        resumes = list(
            MongoDB.resumes_collection.find()
        )

        matching_candidates = []

        for resume in resumes:

            skills = resume.get(
                "skills",
                []
            )

            if skill.lower() in [
                s.lower()
                for s in skills
            ]:

                matching_candidates.append(
                    {
                        "skills": skills,
                        "experience_years":
                            resume.get(
                                "experience_years",
                                0
                            ),
                        "similarity_score":
                            resume.get(
                                "similarity_score",
                                0
                            )
                    }
                )

        return matching_candidates