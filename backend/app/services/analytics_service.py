from collections import Counter

from backend.app.database.mongodb import (
    MongoDB
)


class AnalyticsService:

    @staticmethod
    def generate_analytics():

        resumes = list(
            MongoDB.resumes_collection.find()
        )

        total_resumes = len(resumes)

        # Average Experience
        experiences = [
            resume.get(
                "experience_years",
                0
            )
            for resume in resumes
        ]

        average_experience = (
            sum(experiences) / len(experiences)
            if experiences else 0
        )

        # Skills Count
        all_skills = []

        for resume in resumes:

            all_skills.extend(
                resume.get("skills", [])
            )

        top_skills = Counter(
            all_skills
        ).most_common(5)

        # Degree Count
        all_degrees = []

        for resume in resumes:

            education = resume.get(
                "education",
                {}
            )

            all_degrees.extend(
                education.get(
                    "degrees",
                    []
                )
            )

        degree_distribution = Counter(
            all_degrees
        )

        return {

            "total_resumes": total_resumes,

            "average_experience": round(
                average_experience,
                2
            ),

            "top_skills": top_skills,

            "degree_distribution": (
                degree_distribution
            )
        }