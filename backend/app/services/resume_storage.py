from app.database.mongodb import MongoDB


class ResumeStorage:

    @staticmethod
    def save_resume(data):

        result = (
            MongoDB.resumes_collection.insert_one(data)
        )

        return str(result.inserted_id)