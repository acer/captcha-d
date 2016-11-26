#!flask/bin/python
from flask import Flask, jsonify, abort, send_from_directory
import random

app = Flask(__name__)

pic_base_url = "http://localhost.5000/pics"

shitty_pics = [
    "getprohockey.gif",
    "getproshakew8.gif",
    "getpro.gif",
    "hilary_server.jpg",
    "doge_ad.jpg",
    "ph.jpg",
    "phh.jpg",
    "phhh.jpg"
]

shitty_url = [
    "penisland",
    "speedofart",
    "masterbaitonline",
    "gotahoe",
    "mofo",
    "bendover",
    "pedo",
    "nycanal",
    "auctionshit",
    "teacherstalk"
]

@app.route('/')
def index():
    return "Hello World!"

@app.route('/api/ad', methods=['GET'])
def serve_ads():
    final_filename = pic_base_url + '/' + shitty_pics[random.randint(0,7)]
    final_url = 'http://www.' + shitty_url[random.randint(0,9)] + '.com' 
    return jsonify({'picture': final_filename, 'url': final_url})

@app.route('/pics/<path:filename>')
def serve_pics(filename):
    return send_from_directory('pics', filename)

if __name__ == '__main__':
    app.run(debug=True)
