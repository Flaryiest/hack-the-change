from bertopic import BERTopic
from sentence_transformers import SentenceTransformer
from openai import OpenAI


class Feedback:
    def __init__(self, api_key):
        self.embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        self.model = BERTopic(embedding_model=self.embedding_model, min_topic_size=2)
        self.client = OpenAI(api_key=api_key)

    def generate_feedback(self, feedback):
        topics, _ = self.model.fit_transform(feedback)
        topic_info = self.model.get_topic_info()

        result = {}
        
        for topic_id in topic_info['Topic']:
            if topic_id == -1:
                continue
            theme = ", ".join([word[0] for word in self.model.get_topic(topic_id)])
            feedback = [feedback[i] for i in range(len(feedback)) if topics[i] == topic_id]
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": f"Create a generalized feedback sentence by citizens using the following theme words: {theme}. The following is a list of feedbacks as examples: {feedback[:5]}",
                    }
                ],
                model="gpt-4",
            )
            
            result[chat_completion.choices[0].message.content] = feedback[:10]

        return result
'''
feedbacks = """The buses are often late and unreliable.
The new recycling program is very effective
The garbage collection is good
I like the recycling duties
The garbage truck arrives on time
Buses are always late
The time in between buses is too long
There are not enough buses in the system
I always miss the bus
""".split("\n")

feedback = Feedback(api_key="")
print(feedback.generate_feedback(feedbacks))'''