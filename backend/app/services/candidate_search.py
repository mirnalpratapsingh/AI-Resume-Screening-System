from backend.app.database.mongodb import MongoDB


class CandidateSearch:

    @staticmethod
    def search_by_skill(skill):
        resumes = list(MongoDB.resumes_collection.find())
        matching_candidates = []

        for resume in resumes:
            skills = resume.get("skills", [])
            normalized_skills = [s.lower() for s in skills]

            if skill.lower() in normalized_skills:
                matching_candidates.append(
                    {
                        "skills": skills,
                        "experience_years": resume.get("experience_years", 0),
                        "similarity_score": resume.get("similarity_score", 0),
                    }
                )

        return matching_candidates

    @staticmethod
    def search_candidates(
        skill=None,
        min_experience=None,
        min_similarity=None,
    ):
        resumes = list(MongoDB.resumes_collection.find())
        results = []

        for resume in resumes:
            skills = resume.get("skills", [])
            normalized_skills = [s.lower() for s in skills]
            experience = resume.get("experience_years", 0)
            similarity = resume.get("similarity_score", 0)

            if skill and skill.lower() not in normalized_skills:
                continue

            if min_experience is not None and experience < min_experience:
                continue

            if min_similarity is not None and similarity < min_similarity:
                continue

            results.append(
                {
                    "skills": skills,
                    "experience_years": experience,
                    "similarity_score": similarity,
                }
            )

        return results
