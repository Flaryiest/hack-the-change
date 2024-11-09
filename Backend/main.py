from flask import Flask
from postgrelib import SimpleTable, Database, DataType, Table
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

database = Database(
    DB_HOST=os.getenv("DB_HOST"),
    DB_PORT=os.getenv("DB_PORT"),
    DB_USER=os.getenv("DB_USER"),
    DB_NAME=os.getenv("DB_NAME"),
    DB_PASSWORD=os.getenv("DB_PASSWORD"),
)

table = Table(database, "user_data", [DataType.String("id"), DataType.String("feedback")])
table.create_table()



