class SkillExtractor:

    @staticmethod
    def load_skills(file_path):

        with open(file_path, "r") as file:
            skills = [
                line.strip().lower()
                for line in file.readlines()
            ]

        return skills

    @staticmethod
    def extract_skills(text, skills_list):

        text = text.lower()

        extracted_skills = []

        for skill in skills_list:

            if skill in text:
                extracted_skills.append(skill)

        return list(set(extracted_skills))