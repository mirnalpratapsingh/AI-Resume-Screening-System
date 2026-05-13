import re
import spacy


nlp = spacy.load("en_core_web_sm")


class NLPProcessor:

    @staticmethod
    def clean_text(text):

        text = text.lower()

        text = re.sub(r'\n+', ' ', text)

        text = re.sub(r'\s+', ' ', text)

        text = re.sub(r'[^\w\s]', '', text)

        return text.strip()

    @staticmethod
    def extract_email(text):

        match = re.search(
            r'[\w\.-]+@[\w\.-]+',
            text
        )

        return match.group(0) if match else None

    @staticmethod
    def extract_phone(text):

        match = re.search(
            r'(\+?\d[\d\s\-]{8,}\d)',
            text
        )

        return match.group(0) if match else None

    @staticmethod
    def process_text(text):

        cleaned_text = NLPProcessor.clean_text(text)

        email = NLPProcessor.extract_email(text)

        phone = NLPProcessor.extract_phone(text)

        return {
            "cleaned_text": cleaned_text,
            "email": email,
            "phone": phone
        }