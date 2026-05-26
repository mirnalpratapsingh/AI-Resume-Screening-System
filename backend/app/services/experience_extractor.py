import re


class ExperienceExtractor:

    @staticmethod
    def extract_experience(text):

        text = text.lower()

        patterns = [

            r'(\d+)\+?\s+years',

            r'(\d+)\+?\s+yrs',

            r'(\d+)\+?\s+year',

            r'experience\s+of\s+(\d+)'
        ]

        experience_years = []

        for pattern in patterns:

            matches = re.findall(
                pattern,
                text
            )

            for match in matches:

                experience_years.append(
                    int(match)
                )

        if experience_years:

            return max(experience_years)

        return 0