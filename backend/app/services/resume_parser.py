import fitz
from docx import Document
from pathlib import Path


class ResumeParser:

    @staticmethod
    def extract_text_from_pdf(file_path):
        text = ""

        pdf = fitz.open(file_path)

        for page in pdf:
            text += page.get_text()

        return text

    @staticmethod
    def extract_text_from_docx(file_path):
        doc = Document(file_path)

        text = "\n".join(
            [paragraph.text for paragraph in doc.paragraphs]
        )

        return text

    @staticmethod
    def extract_text(file_path):

        file_extension = Path(file_path).suffix.lower()

        if file_extension == ".pdf":
            return ResumeParser.extract_text_from_pdf(file_path)

        elif file_extension == ".docx":
            return ResumeParser.extract_text_from_docx(file_path)

        else:
            raise ValueError("Unsupported file format")