from flask import Flask, request, jsonify, make_response
from postgrelib import SimpleTable, Database
from flask_cors import CORS
from dotenv import load_dotenv
from processing import Feedback
import os, random, json

load_dotenv()

# note: ALL api calls are all in json
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://hack-the-change.pages.dev"}}, supports_credentials=True)

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
# an example for inserting data into the db
bills_table.insert_data("Daylight savings time", {"feedback": [], "description": "City proposal to abolish daylight saving."})


@app.route("/submit", methods=["POST"])
def post():
    id, feedback = request.json["id"], request.json["feedback"]
    if user_data_table.get_data(id):
        user_data_table.insert_data(id, {"feedback": feedback})
        response = jsonify({"result": True, "info": "Success!"})
    else:
        response = jsonify({"result": False, "info": "This government ID does not exist."})

    return response

@app.route("/get_cookie", methods=["POST"])
def get_cookies():
    id = request.json["id"]

    if id in user_data_table.get_data():
        response = jsonify({"success": True})
        response.set_cookie('id', id)
    else:
        response = jsonify({"success": False})
        
    return response

@app.route("/user_data", methods=["GET", "POST"])
def get_user_data():
    id = request.cookies.get('id')
    data = request.json
    user_data = user_data_table.get_data(id)
    
    if user_data:
        if request.method == "GET":
            return user_data
        else:
            data["admin"] = user_data["admin"]
            user_data_table.insert_data(id, data)
            response = jsonify({"success": True})
    else:
        response = jsonify({"success": False})
    
    return response


@app.route("/feedback", methods=["GET"])
def feedback_endpoint():
    cur = database.conn.cursor()
    cur.execute(f"SELECT feedback FROM user_data2")
    rows = cur.fetchall()

    feedbacks = []

    for row in rows:
        feedbacks.append(row[0]["latest_feedback"])
    print(feedbacks)
    response = jsonify(feedback.generate_feedback(feedbacks))
    return response

# showing the bill data
@app.route("/bills", methods=["GET"])
def bill_endpoint():
    cur = database.conn.cursor()
    cur.execute(f"SELECT feedback FROM bill_data")

@app.route("/add_bill", methods=["POST"])
def add_bill():
    # get the title of the bill from the call and add it to the database
    # users can only create bills if they are an admin
    # INPUT 
        # title = name of the bill
        # text = description of the bill
    # OUTPUT
        # {"success": True/False}

    response = jsonify({"success": False})

    user_id = request.cookies.get('id')
    user_data = user_data_table.get_data(id)

    if (user_data["admin"] == True):
        raw_json_data = request.json # gets the request data in the form of 
            # a python dictionary
        bills_table.insert_data(raw_json_data["title"], {"feedback": [], "description": raw_json_data["text"]})
        response = jsonify({"success": True}) 

    return response

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, threaded=True)
