from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class EmbeddingService:

    model = SentenceTransformer(
        "all-MiniLM-L6-v2"
    )

    @staticmethod
    def generate_embedding(text):

        embedding = EmbeddingService.model.encode(text)

        return embedding

    @staticmethod
    def calculate_similarity(
        embedding1,
        embedding2
    ):

        similarity = cosine_similarity(
            [embedding1],
            [embedding2]
        )

        return similarity[0][0]