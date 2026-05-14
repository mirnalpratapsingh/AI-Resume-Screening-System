from app.services.resume_parser import ResumeParser
from app.services.embedding_service import EmbeddingService


resume_path = "C:/Users/mirna/OneDrive/Desktop/ML/resume-ai/data/resumes/kristi laar.docx"

job_description_path = "C:/Users/mirna/OneDrive/Desktop/ML/resume-ai/data/job_descriptions/ml_engineer.txt"


# Extract Resume Text
resume_text = ResumeParser.extract_text(
    resume_path
)

# Read Job Description
with open(job_description_path, "r") as file:
    job_description = file.read()

# Generate Embeddings
resume_embedding = EmbeddingService.generate_embedding(
    resume_text
)

job_embedding = EmbeddingService.generate_embedding(
    job_description
)

# Calculate Similarity
similarity_score = (
    EmbeddingService.calculate_similarity(
        resume_embedding,
        job_embedding
    )
)

print("\nSIMILARITY SCORE:\n")
print(similarity_score)