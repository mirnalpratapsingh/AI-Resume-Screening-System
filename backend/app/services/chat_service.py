from backend.app.database.mongodb import MongoDB


class ChatService:

    @staticmethod
    def build_candidate_context():

        resumes = list(
            MongoDB.resumes_collection.find()
        )

        context = ""

        for resume in resumes:

            context += f"""
Candidate:

Skills:
{', '.join(resume.get('skills', []))}

Experience:
{resume.get('experience_years', 0)}

Summary:
{resume.get('summary', '')}

--------------------------------
"""

        return context