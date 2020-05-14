from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import logging

app = Flask(__name__)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "password"
app.config["MYSQL_DB"] = "flasktodo"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

mysql = MySQL(app)
CORS(app)


@app.route("/api/tasks", methods=["GET"])
def get_all_tasks():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM flasktodo.tasks")
    rv = cur.fetchall()
    return jsonify(rv)


@app.route("/api/task", methods=["POST"])
def add_task():
    logging.error(1234)
    cur = mysql.connection.cursor()
    title = request.get_json()["title"]
    cur.execute("INSERT INTO flasktodo.tasks (title) VALUES ('" + str(title) + "')")
    idx = cur.lastrowid
    mysql.connection.commit()
    result = {"id": idx, "title": title, "status": "active"}
    return jsonify({"result": result})


@app.route("/api/task/<id>", methods=["PUT"])
def update_task(id):
    cur = mysql.connection.cursor()
    title = request.get_json()["title"]
    status = request.get_json()["status"]
    cur.execute(
        "UPDATE flasktodo.tasks SET title = '"
        + str(title)
        + "', status = '"
        + str(status)
        + "' where id = "
        + id
    )
    idx = int(id)
    mysql.connection.commit()

    result = {"id": idx, "title": title, "status": status}

    return jsonify({"result": result})


@app.route("/api/task/<id>", methods=["DELETE"])
def delete_task(id):
    cur = mysql.connection.cursor()
    response = cur.execute("DELETE FROM flasktodo.tasks where id = " + id)
    mysql.connection.commit()
    if response > 0:
        result = {"message": "record deleted"}
    else:
        result = {"message": "no record found"}

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)
