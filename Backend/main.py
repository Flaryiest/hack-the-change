from flask import Flask, request, jsonify, make_response
from postgrelib import SimpleTable, Database
from flask_cors import CORS
from dotenv import load_dotenv
from processing import Feedback, Bills
import os, random, json

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, supports_credentials=True)
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
table.create_table()


cur = database.conn.cursor()
cur.execute(f"DROP TABLE user_data;")

feedback = Feedback(os.getenv("OPENAI_API_KEY"))
bill = Bills()

'''
for i in range(0, 10):
    table.insert_data("".join([str(random.randint(0, 9)) for i in range(0, 10)]), {"latest_feedback": "", "feedback_history": [], "admin": True})
'''
bills_table.insert_data("Daylight savings time", {"feedback": [], "description": "City proposal to abolish daylight saving."})


@app.route("/submit", methods=["POST"])
def post():
    id, feedback = request.json["id"], request.json["id"]
    if table.get_data(id):
        table.insert_data(id, {"feedback": feedback})
        return jsonify({"result": True, "info": "Success!"})
    else:
        return jsonify({"result": False, "info": "This government ID does not exist."})

@app.route("/get_cookie", methods=["POST"])
def get_cookies():
    id = request.json["id"]

    if id in table.get_data():
        response = jsonify({"success": True})
        response.set_cookie('id', id)
    else:
        response = jsonify({"success": False})
    return response

@app.route("/user_data", methods=["GET"])
def get_user_data():
    id = request.cookies.get('id')
    user_data = table.get_data(id)
    if user_data:
        return user_data
    else:
        return jsonify({"success": False})
    

@app.route("/feedback", methods=["GET"])
def feedback_endpoint():
    cur = database.conn.cursor()
    cur.execute(f"SELECT feedback FROM user_data2")
    rows = cur.fetchall()

    feedbacks = []

    for row in rows:
        feedbacks.append(row[0]["latest_feedback"])
    print(feedbacks)
    return jsonify(feedback.generate_feedback(feedbacks))

@app.route("/login")
def login():
    pass

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3333, threaded=True)