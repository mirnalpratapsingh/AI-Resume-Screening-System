from app.services.resume_parser import ResumeParser


file_path = "data/resumes/Mirnal Pratap Singh.pdf"

text = ResumeParser.extract_text(file_path)

print(text)