from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer


class ResumeSummarizer:

    @staticmethod
    def summarize(text, sentence_count=2):

        parser = PlaintextParser.from_string(
            text,
            Tokenizer("english")
        )

        summarizer = LsaSummarizer()

        summary = summarizer(
            parser.document,
            sentence_count
        )

        summarized_text = " ".join(
            [str(sentence) for sentence in summary]
        )

        return summarized_text