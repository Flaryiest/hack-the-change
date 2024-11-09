from flask import Flask, request, jsonify
from postgrelib import SimpleTable, Database
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
from time import sleep
import threading
import serial_reader

load_dotenv()

app = Flask(__name__)
CORS(app)

database = Database(
    DB_HOST=os.getenv("DB_HOST"),
    DB_PORT=os.getenv("DB_PORT"),
    DB_USER=os.getenv("DB_USER"),
    DB_NAME=os.getenv("DB_NAME"),
    DB_PASSWORD=os.getenv("DB_PASSWORD"),
)

table = SimpleTable("user_data", database, key="id", item="feedback")
table.create_table()

@app.route("/submit", methods=["POST"])
def post():
    id, feedback = request.json["id"], request.json["id"]
    if table.get_data(id):
        table.insert_data(id, {"feedback": feedback})
        return jsonify({"result": True, "info": "Success!"})
    else:
        return jsonify({"result": False, "info": "This government ID does not exist."})

@app.route("/results", methods=["GET"])
def results():
    database.conn
    pass

@app.route("/login")
def login():
    pass
'''def say_hello():
    sleep(2)
    print("Hello, world!")'''

def serial_data_get():
    ser = serial_reader.init_serial()
    serial_reader.get_user_id(ser, 9)
    serial_reader.close_serial(ser)

if __name__ == "__main__":
    #t1 = threading.Thread(target=say_hello, args=())
    t1 = threading.Thread(target=serial_data_get, args=())
    t1.start()

    app.run(host="127.0.0.1", port=3333)

    t1.join()

