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

latest_bill_changes = []
'''
[\
    {"title":"", "latest_feedback": ""},\
    {"title":"", "latest_feedback": ""},\
    {"title":"", "latest_feedback": ""}\
    ]'''

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
    # this should be run along with submit bill
    # changes a user's feedback data
    # the bills that these are a part of are not stored ???
    # INPUT
        # {"id": "...", "feedback": "..."}
    # OUTPUT
        # {"result": True/False, "info": "..."}
    id, feedback = request.json["id"], request.json["feedback"]

    user_data = user_data_table.get_data(id) # this is a dictionary with the json
        # section user format

    # return if the user does not exit (user_data would be empty)
    if not user_data:
        return jsonify({"result": False, "info": "This government ID does not exist."})
    
    # add the old latest feedback to the feedback_history
    user_data["feedback_history"].append(user_data["latest_feedback"])

    # ----- FEEDBACK FORMAT -----
    # {"feedback_history": [old -----> new]

    # remove the oldest feedback when the length is greater than 10
    if len(user_data["feedback_history"]) > 10:
        user_data["feedback_history"].pop(0)

    # set the feedback to the lastest_feedback
    user_data["latest_feedback"] = feedback

    # change the database
    user_data_table.insert_data(id, user_data)

    return jsonify({"result": True, "info": "Success!"})


@app.route("/bill/submit", methods=["POST"])
def submit_bill():
    # submits a bill's feedback into the BILL database (Y/N)
    # to create a bill, use add_bill
    # INPUT (roughly)
        # {"id": ..., "feedback": ..., "bill": ...}
    # OUTPUT
        # {"result": True/False}
    id, feedback, bill = request.json['id'], request.json["feedback"], request.json["bill"]

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
    
    # update the latest
    latest_bill_changes.append({"title": bill_data["title"], "latest_feedback": feedback}) # update latest_bill_changes. This follows the same format as feedback

    # remove the zero index element if the length is too big (default is 3)
    if len(latest_bill_changes) > 3:
        latest_bill_changes.pop(0)


    bill_data["feedback"][id] = feedback
    bills_table.insert_data(bill, bill_data)
    return jsonify({"result": True, "info": "Success!"})

@app.route("/verify", methods=["POST"])
def verify():
    # gets the id from the user and returns a cookie for them to use
    # INPUT
        # {"id": ...}
    # OUTPUT
        # {"success": True/False}
    id = request.json["id"]

    if user_data_table.get_data(id):
        response = jsonify({"success": True})
    else:
        response = jsonify({"success": False})
        
    return response

@app.route("/user_data", methods=["POST"])
def get_user_data():
    # gets the user data based on their id (given by json)
    # INPUT
        # {"id": "..."}
    # OUTPUT
        # {"success": True, "data": {...}}
        # OR
        # {"success": False}
    id = request.json.get('id')
    user_data = user_data_table.get_data(id)
    
    if user_data:
        return jsonify({"success": True, "data": user_data})
    else:
        response = jsonify({"success": False})
    return response


@app.route("/result/feedback", methods=["POST"])
def feedback_results():
    # outputs the feedback to the user
    # INPUT
        # none
    # OUTPUT
        # 
    cur = database.conn.cursor()
    cur.execute(f"SELECT feedback FROM user_data2")
    rows = cur.fetchall() # rows is a list of tuples? each tuple stores a uesr

    feedbacks = []

    for row in rows:
        if not row[0]["latest_feedback"] == "":
            feedbacks.append(row[0]["latest_feedback"])
    # from proccessing.py
    response = jsonify(feedback.generate_feedback(feedbacks))
    return response

@app.route("/result/bills", methods=["POST"])
def bills_result():

    cur = database.conn.cursor()
    cur.execute("SELECT bill, feedback FROM bill_data")
    rows = cur.fetchall() # rows is now a list of tuples?

    results = {row[0]: row[1] for row in rows}

    return jsonify(results)

@app.route("/add_bill", methods=["POST"])
def add_bill():
    # get the title of the bill from the call and add it to the database
    # users can only create bills if they are an admin
    # INPUT 
        # {"id": "..."}
    # OUTPUT
        # {"success": True/False}

    id = request.json.get('id')
    user_data = user_data_table.get_data(id)

    if (user_data["admin"] == True):
        raw_json_data = request.json # gets the request data in the form of 
            # a python dictionary
        bills_table.insert_data(raw_json_data["title"], {"feedback": {}, "description": raw_json_data["text"]})
        response = jsonify({"success": True}) 
    else:
        response = jsonify({"success": False, "info": "you are not an admin"})
    return response

@app.route("/latest", methods=["POST"])
def latest():
    # gets the last three latest bill database edits (only updates when submit_bill is run)
    # INPUT
        # none
    # OUTPUT
        # [{"title": "...", "latest_feedback": "..."}, ...] (dictionary in a list
    return latest_bill_changes

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, threaded=True)
