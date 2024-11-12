# ChangePod
[hack-the-change.pages.dev](url)
[https://devpost.com/software/changepod](url)
Created during Hack The Change YYC 2024.

Inspiration

We were heavily inspired by the US election and that fact citizens are only represented once every four years. We also thought of elections in Canada and how many of the opinions that we have heard about may not be represented at all in the election.
What it does

This is a hardware-software implementation ready for mass production and roll out that allows the users of the product to directly interact with the legislative branch in their country. Users are able to speak their opinion through our hardware and ChangePod is able to take their input and parse it into an easy to read way for politicians and lawmakers to view.
How we built it

We built it using Python, ReactJS, JSON, BERTopic, SentenceTransformer, and OpenAI. For the project, we mostly split it into two parts. Hardware, Backend and Frontend.
Challenges we ran into

One of the predominant issues that hinder our progress was with CORS headers that stopped us from receiving api calls altogether. In the end, we were able to find an alternative solution that allowed us to perpetuate the user identification.
Accomplishments that we're proud of

We are extremely proud of our full integration of hardware, backend, and frontend in a unified and holistic project that we envisioned.
What we learned

This Hackathon was by far the largest learning experience we have ever had, with many of our members experiencing an in-person hackathon for the first time. In addition, we learned how to structure our workflow using git and railway in a way that reduced potential confusion and allowed us to work on our parts of the product without going into significant file desync issues.
What's next for ChangePod

As our project has followed through with our vision for this hackathon, we strive to bring the project to its fullest potential by allowing large-scale deployment and as much automation as possible, as our esp does not take pictures automatically yet. In addition, we will create a case for our hardware to create a robust end product.

# Documentation and Instructions for Software Use (Backend and API):

POST https://swag.up.railway.app/get_cookie 
Input: {"id"}
Output {“success”} and COOKIE {“id”} if success

GET https://swag.up.railway.app/user_data 
Input: COOKIE
Output: {latest_feedback: “”, feedback_history: [], admin: bool}

GET https://swag.up.railway.app/result/feedback 
Output: {"paragraph": [top 10 feedback], ...}

GET https://swag.up.railway.app/result/bills
Output:{"bill name" : {"description", "feedback": {}}

POST https://swag.up.railway.app/feedback/submit NOT FOR FRONTEND
Input: {“id”, “feedback”}
Output {“success”, “info”}

POST https://swag.up.railway.app/bill/submit 
Input: {“id”, “feedback”, “bill”}
Output {“success”, “info”}

POST https://swag.up.railway.app/add_bill 
Input: COOKIE {“text”, “description”}
Output: {“success”, “info”}
