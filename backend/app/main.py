from fastapi import FastAPI, UploadFile, File
from backend.app.services.resume_parser import ResumeParser
from backend.app.services.nlp_processor import NLPProcessor
from backend.app.services.skill_extractor import SkillExtractor
from backend.app.services.embedding_service import EmbeddingService
from backend.app.services.resume_storage import ResumeStorage

import shutil


app = FastAPI()


# Skills File Path
skills_file_path = (
    "C:/Users/mirna/OneDrive/Desktop/ML/resume-ai/data/skills/skills.txt"
)

# Job Description Path
job_description_path = (
    "C:/Users/mirna/OneDrive/Desktop/ML/resume-ai/data/job_descriptions/ml_engineer.txt"
)


@app.get("/")
def home():

    return {
        "message": "Resume AI Backend Running"
    }


@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    # Save Uploaded Resume
    file_location = (
        f"data/resumes/{file.filename}"
    )

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract Resume Text
    resume_text = ResumeParser.extract_text(
        file_location
    )

    # NLP Processing
    processed_data = NLPProcessor.process_text(
        resume_text
    )

    # Load Skills
    skills_list = SkillExtractor.load_skills(
        skills_file_path
    )

    # Extract Skills
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

    # Resume Data
    resume_data = {
        "resume_text": resume_text,
        "email": processed_data["email"],
        "phone": processed_data["phone"],
        "skills": skills,
        "similarity_score": float(
            similarity_score
        )
    }

    # Store Resume
    resume_id = ResumeStorage.save_resume(
        resume_data
    )

    return {
    "message": "Resume uploaded successfully",
    "resume_id": resume_id,
    "skills": skills,
    "similarity_score": float(similarity_score)
}