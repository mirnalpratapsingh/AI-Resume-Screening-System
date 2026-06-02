import os
import google.generativeai as genai
from dotenv import load_dotenv
from typer import prompt

load_dotenv()

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "gemini-2.0-flash"
)


class GeminiChat:

    @staticmethod
    def ask(
        question,
        candidate_context
    ):
        prompt_text = f"""
You are an AI recruiter.

Candidate Data:

{candidate_context}

Question:

{question}

Answer only using the provided candidate data.
"""

        try:
            response = model.generate_content(prompt=prompt_text)
            return response.text

        except Exception as e:
            return f"""
    AI service unavailable.

Question:
{question}

Available candidates have already been stored in the database.

Error:
{str(e)}
"""