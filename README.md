# ChangePod
[hack-the-change.pages.dev](url)

Created during Hack The Change YYC 2024.

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
