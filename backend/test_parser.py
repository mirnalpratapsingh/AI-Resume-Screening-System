from app.services.resume_parser import ResumeParser
from app.services.nlp_processor import NLPProcessor
from app.services.skill_extractor import SkillExtractor


file_path = "../data/resumes/kristi laar.docx"

text = ResumeParser.extract_text(file_path)

processed_data = NLPProcessor.process_text(text)

skills_list = SkillExtractor.load_skills(
    "../data/skills/skills.txt"
)

skills = SkillExtractor.extract_skills(
    processed_data["cleaned_text"],
    skills_list
)

print("\nEXTRACTED SKILLS:\n")
print(skills)