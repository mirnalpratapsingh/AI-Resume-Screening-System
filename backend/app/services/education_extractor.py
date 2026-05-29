import re


class EducationExtractor:

    @staticmethod
    def extract_education(text):

        text_lower = text.lower()

        degrees = [

            "btech",
            "mtech",
            "b.e",
            "be",
            "bca",
            "mca",
            "mba",
            "bsc",
            "msc",
            "phd"
        ]

        found_degrees = []

        for degree in degrees:

            if degree in text_lower:
                found_degrees.append(
                    degree.upper()
                )

        # Graduation Years
        years = re.findall(
            r'(19\d{2}|20\d{2})',
            text
        )

        return {
            "degrees": list(set(found_degrees)),
            "graduation_years": list(set(years))
        }