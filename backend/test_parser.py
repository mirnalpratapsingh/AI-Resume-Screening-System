from app.services.resume_parser import ResumeParser
from app.services.embedding_service import EmbeddingService
from app.services.skill_extractor import SkillExtractor
from app.services.nlp_processor import NLPProcessor
from app.services.resume_storage import ResumeStorage


resume_path = "C:/Users/mirna/OneDrive/Desktop/ML/resume-ai/data/resumes/Mirnal Pratap Singh.pdf"

job_description_path = (
    "C:/Users/mirna/OneDrive/Desktop/ML/resume-ai/data/job_descriptions/ml_engineer.txt"
)

# Extract Resume Text
resume_text = ResumeParser.extract_text(
    resume_path
)

# NLP Processing
processed_data = NLPProcessor.process_text(
    resume_text
)

# Skill Extraction
skills_list = SkillExtractor.load_skills(
    "C:/Users/mirna/OneDrive/Desktop/ML/resume-ai/data/skills/skills.txt"
)

skills = SkillExtractor.extract_skills(
    processed_data["cleaned_text"],
    skills_list
)

# Read Job Description
with open(job_description_path, "r") as file:
    job_description = file.read()

# Generate Embeddings
resume_embedding = (
    EmbeddingService.generate_embedding(
        resume_text
    )
)

job_embedding = (
    EmbeddingService.generate_embedding(
        job_description
    )
)

# Similarity Score
similarity_score = (
    EmbeddingService.calculate_similarity(
        resume_embedding,
        job_embedding
    )
)

# Store Data
resume_data = {
    "resume_text": resume_text,
    "email": processed_data["email"],
    "phone": processed_data["phone"],
    "skills": skills,
    "similarity_score": float(similarity_score)
}

resume_id = ResumeStorage.save_resume(
    resume_data
)

print("\nRESUME STORED SUCCESSFULLY")
print("Resume ID:", resume_id)