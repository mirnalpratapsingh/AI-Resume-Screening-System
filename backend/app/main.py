from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import traceback
from fastapi.middleware.cors import CORSMiddleware
from backend.app.services.resume_parser import ResumeParser
from backend.app.services.nlp_processor import NLPProcessor
from backend.app.services.skill_extractor import SkillExtractor
from backend.app.services.embedding_service import EmbeddingService
from backend.app.services.resume_storage import ResumeStorage
from backend.app.services.candidate_ranker import (
    CandidateRanker
)
from backend.app.services.skill_gap_analyzer import (
    SkillGapAnalyzer
)
from backend.app.services.resume_summarizer import (
    ResumeSummarizer
)
from backend.app.services.experience_extractor import (
    ExperienceExtractor
)
import shutil


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    experience_years = (
        ExperienceExtractor.extract_experience(
            resume_text
        )
    )
    resume_summary = (
        ResumeSummarizer.summarize(
            resume_text
        )
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

    skill_gap_analysis = (
        SkillGapAnalyzer.analyze(
            skills,
            skills_list
        )
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
        "experience_years": experience_years,
        "summary": resume_summary,
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
        "experience_years": experience_years,
        "summary": resume_summary,
        "similarity_score": float(
            similarity_score
        ),
        "matched_skills": (
            skill_gap_analysis[
                "matched_skills"
            ]
        ),
        "missing_skills": (
            skill_gap_analysis[
                "missing_skills"
            ]
        )
    }

@app.get("/rank-candidates")
async def rank_candidates():

    try:
        # Read Job Description
        with open(job_description_path, "r") as file:
            job_description = file.read()

        ranked_candidates = (
            CandidateRanker.rank_candidates(
                job_description
            )
        )

        return {
            "ranked_candidates": ranked_candidates
        }

    except Exception as e:
        tb = traceback.format_exc()
        return JSONResponse(
            status_code=500,
            content={"error": str(e), "traceback": tb}
        )