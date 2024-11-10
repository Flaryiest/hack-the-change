from flask import Flask, request, jsonify, make_response
from postgrelib import SimpleTable, Database
from flask_cors import CORS
from dotenv import load_dotenv
from processing import Feedback
import os, random, json

load_dotenv()

# note: ALL api calls are all in json
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

database = Database(
    DB_HOST=os.getenv("DB_HOST"),
    DB_PORT=os.getenv("DB_PORT"),
    DB_USER=os.getenv("DB_USER"),
    DB_NAME=os.getenv("DB_NAME"),
    DB_PASSWORD=os.getenv("DB_PASSWORD"),
)

user_data_table = SimpleTable("user_data2", database, key="id", item="feedback")
user_data_table.create_table()

bills_table = SimpleTable("bill_data", database, key="bill", item="feedback")
bills_table.create_table()

feedback = Feedback(os.getenv("OPENAI_API_KEY"))
#bill = Bills()

'''
for i in range(0, 10):
    user_data_table.insert_data("".join([str(random.randint(0, 9)) for i in range(0, 10)]), {"latest_feedback": "", "feedback_history": [], "admin": True})
'''
bills_table.insert_data("Daylight savings time", {"feedback": {}, "description": "City proposal to abolish daylight saving."})


@app.route("/feedback/submit", methods=["POST"])
def submit_feedback():
    id, feedback = request.json["id"], request.json["feedback"]

    user_data = user_data_table.get_data(id)

    if not user_data:
        return jsonify({"result": False, "info": "This government ID does not exist."})
    
    user_data["feedback_history"].append(user_data["latest_feedback"])

    if len(user_data["feedback_history"]) > 10:
        user_data["feedback_history"].pop(0)

    user_data["latest_feedback"] = feedback
    user_data_table.insert_data(id, user_data)

    return jsonify({"result": True, "info": "Success!"})


@app.route("/bill/submit", methods=["POST"])
def submit_bill():
    id, feedback, bill = request.cookies.get('id'), request.json["feedback"], request.json["bill"]

    if not feedback in ["yes", "no"]:
        return jsonify({"success": False, "info": "Invalid response"})
    
    user_data = user_data_table.get_data(id)
    bill_data = bills_table.get_data(bill)

    if not bill_data:
        return jsonify({"result": False, "info": "This bill does not exist"})

    if not user_data:
        return jsonify({"result": False, "info": "Your government ID does not exist."})
    
    if id in bill_data["feedback"]:
        return jsonify({"result": False, "info": "You have already voted"})
    
    bill_data["feedback"][id] = feedback
    bills_table.insert_data(bill, bill_data)
    return jsonify({"result": True, "info": "Success!"})


@app.route("/get_cookie", methods=["POST"])
def get_cookies():
    id = request.json["id"]

    if user_data_table.get_data(id):
        response = jsonify({"success": True})
        response.set_cookie('id', id, samesite="None", secure=True, httponly=True)
        response.headers.add(
            'Set-Cookie',
            f'id={id}; HttpOnly; Secure; SameSite=None; Partitioned'
        )

    else:
        response = jsonify({"success": False})
        
    return response

@app.route("/user_data", methods=["GET"])
def get_user_data():
    id = request.cookies.get('id')
    user_data = user_data_table.get_data(id)
    
    if user_data:
        return jsonify({"success": True, "data": user_data})
    else:
        response = jsonify({"success": False})
    return response


@app.route("/result/feedback", methods=["GET"])
def feedback_results():
    cur = database.conn.cursor()
    cur.execute(f"SELECT feedback FROM user_data2")
    rows = cur.fetchall()

    feedbacks = []

    for row in rows:
        if not row[0]["latest_feedback"] == "":
            feedbacks.append(row[0]["latest_feedback"])
    response = jsonify(feedback.generate_feedback(feedbacks))
    return response

@app.route("/result/bills", methods=["GET"])
def bills_result():
    cur = database.conn.cursor()
    cur.execute("SELECT bill, feedback FROM bill_data")
    rows = cur.fetchall()

    results = {row[0]: row[1] for row in rows}

    return jsonify(results)

@app.route("/add_bill", methods=["POST"])
def add_bill():
    # get the title of the bill from the call and add it to the database
    # users can only create bills if they are an admin
    # INPUT 
        # title = name of the bill
        # text = description of the bill
    # OUTPUT
        # {"success": True/False}


    user_id = request.cookies.get('id')
    user_data = user_data_table.get_data(user_id)

    if (user_data["admin"] == True):
        raw_json_data = request.json # gets the request data in the form of 
            # a python dictionary
        bills_table.insert_data(raw_json_data["title"], {"feedback": {}, "description": raw_json_data["text"]})
        response = jsonify({"success": True}) 
    else:
        response = jsonify({"success": False, "info": "you are not an admin"})
    return response

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, threaded=True)
