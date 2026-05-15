from pymongo import MongoClient


class MongoDB:

    client = MongoClient(
        "mongodb://localhost:27017"
    )

    database = client["resume_ai"]

    resumes_collection = database["resumes"]