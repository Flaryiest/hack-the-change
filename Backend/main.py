from flask import Flask, request, jsonify, make_response
from postgrelib import SimpleTable, Database
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from processing import Feedback
import os, random, json

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

database = Database(
    DB_HOST=os.getenv("DB_HOST"),
    DB_PORT=os.getenv("DB_PORT"),
    DB_USER=os.getenv("DB_USER"),
    DB_NAME=os.getenv("DB_NAME"),
    DB_PASSWORD=os.getenv("DB_PASSWORD"),
)

table = SimpleTable("user_data2", database, key="id", item="feedback")
table.create_table()

bills_table = SimpleTable("bill_data", database, key="bill", item="feedback")
bills_table.create_table()

feedback = Feedback(os.getenv("OPENAI_API_KEY"))
#bill = Bills()

'''
for i in range(0, 10):
    table.insert_data("".join([str(random.randint(0, 9)) for i in range(0, 10)]), {"latest_feedback": "", "feedback_history": [], "admin": True})
'''
bills_table.insert_data("Daylight savings time", {"feedback": [], "description": "City proposal to abolish daylight saving."})


@app.route("/submit", methods=["POST"])
@cross_origin()
def post():
    id, feedback = request.json["id"], request.json["id"]
    if table.get_data(id):
        table.insert_data(id, {"feedback": feedback})
        response = jsonify({"result": True, "info": "Success!"})
    else:
        response = jsonify({"result": False, "info": "This government ID does not exist."})

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/get_cookie", methods=["POST"])
@cross_origin()
def get_cookies():
    id = request.json["id"]

    if id in table.get_data():
        response = jsonify({"success": True})
        response.set_cookie('id', id)
    else:
        response = jsonify({"success": False})
        
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/user_data", methods=["GET", "POST"])
@cross_origin()
def get_user_data():
    id = request.cookies.get('id')
    data = request.json
    user_data = table.get_data(id)
    
    if user_data:
        if request.method == "GET":
            return user_data
        else:
            data["admin"] = user_data["admin"]
            table.insert_data(id, data)
            response = jsonify({"success": True})
    else:
        response = jsonify({"success": False})
    
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/feedback", methods=["GET"])
@cross_origin()
def feedback_endpoint():
    cur = database.conn.cursor()
    cur.execute(f"SELECT feedback FROM user_data2")
    rows = cur.fetchall()

    feedbacks = []

    for row in rows:
        feedbacks.append(row[0]["latest_feedback"])
    print(feedbacks)
    response = jsonify(feedback.generate_feedback(feedbacks))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3333, threaded=True)