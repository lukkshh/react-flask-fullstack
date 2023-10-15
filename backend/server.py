import flask
from flask_cors import CORS

data = [
    {"name": "apple", "type": "fruit", "instock": False, "quantity": 0},
    {"name": "bannana", "type": "fruit", "instock": True, "quantity": 2},
    {"name": "blueberries", "type": "fruit", "instock": True, "quantity": 15},
    {"name": "oranges", "type": "fruit", "instock": False, "quantity": 0},
    {"name": "avocados", "type": "fruit", "instock": True, "quantity": 40},

    {"name": "potato", "type": "vegetable", "instock": True, "quantity": 150},
    {"name": "cabbage", "type": "vegetable", "instock": False, "quantity": 0},
    {"name": "tomato", "type": "vegetable", "instock": True, "quantity": 232},
    {"name": "carrot", "type": "vegetable", "instock": True, "quantity": 34},
    {"name": "beans", "type": "vegetable", "instock": False, "quantity": 0}
]


app = flask.Flask(__name__)

CORS(app)  # Set Access-Control-Allow-Origin To All


@app.route("/api/")
def index():
    return data


@app.route("/api/<filter>")
def api(filter):
    json = []

    if filter == "instock":
        for i in data:
            if (i["instock"] == True):
                json.append(i)

        return json

    if filter == "fruits":
        for i in data:
            if (i["type"] == "fruit"):
                json.append(i)
        return json

    if filter == "vegs":
        for i in data:
            if (i["type"] == "vegetable"):
                json.append(i)
        return json

    if filter == "fruits_in_stock":
        for i in data:
            if (i["type"] == "fruit" and i['instock'] == True):
                json.append(i)
        return json

    if filter == "vegs_in_stock":
        for i in data:
            if (i["type"] == "vegetable" and i['instock'] == True):
                json.append(i)
        return json

    if filter == "vegs_fruits":
        for i in data:
            if (i["type"] == "vegetable"):
                json.append(i)
            if (i["type"] == "fruit"):
                json.append(i)
        return json

    if filter == "vegs_fruits_instock":
        for i in data:
            if (i["type"] == "fruit" and i['instock'] == True):
                json.append(i)
            if (i["type"] == "vegetable" and i['instock'] == True):
                json.append(i)
        return json


app.run(debug=True)
