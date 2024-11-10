from flask import Flask, request, jsonify
from postgrelib import SimpleTable, Database
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from processing import Feedback, Bills
import os, random, json

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

database = Database(
    DB_HOST=os.getenv("DB_HOST"),
    DB_PORT=os.getenv("DB_PORT"),
    DB_USER=os.getenv("DB_USER"),
    DB_NAME=os.getenv("DB_NAME"),
    DB_PASSWORD=os.getenv("DB_PASSWORD"),
)

table = SimpleTable("user_data", database, key="id", item="feedback")
table.create_table()

feedback = Feedback(os.getenv("OPENAI_API_KEY"))
bill = Bills()

'''
for i in range(0, 10):
    table.insert_data("".join([str(random.randint(0, 9)) for i in range(0, 10)]), {"latest_feedback": "", "feedback_history": [], "admin": True, "latest_bill": "", "bill_history": []})
'''
@app.route("/submit", methods=["POST"])
def post():
    id, feedback = request.json["id"], request.json["id"]
    if table.get_data(id):
        table.insert_data(id, {"feedback": feedback})
        return jsonify({"result": True, "info": "Success!"})
    else:
        return jsonify({"result": False, "info": "This government ID does not exist."})


@app.route("/feedback", methods=["GET"])
def feedback_endpoint():
    cur = database.conn.cursor()
    cur.execute(f"SELECT feedback FROM user_data")
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
    app.run(host="127.0.0.1", port=3333)