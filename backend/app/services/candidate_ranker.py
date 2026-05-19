from backend.app.database.mongodb import MongoDB
from backend.app.services.embedding_service import (
    EmbeddingService
)


class CandidateRanker:

    @staticmethod
    def rank_candidates(job_description):

        resumes = list(
            MongoDB.resumes_collection.find()
        )

        # Generate Job Description Embedding
        job_embedding = (
            EmbeddingService.generate_embedding(
                job_description
            )
        )

        ranked_candidates = []

        for resume in resumes:

            resume_text = resume["resume_text"]

            # Generate Resume Embedding
            resume_embedding = (
                EmbeddingService.generate_embedding(
                    resume_text
                )
            )

            # Calculate Similarity
            similarity_score = (
                EmbeddingService.calculate_similarity(
                    resume_embedding,
                    job_embedding
                )
            )

            ranked_candidates.append({
                "resume_id": str(resume["_id"]),
                "email": resume.get("email"),
                "skills": resume.get("skills"),
                "score": float(similarity_score)
            })

        # Sort Descending
        ranked_candidates.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        return ranked_candidates