import os
import re
from flask import Flask, Response, request
from flask_cors import CORS
from interfaces import Movie
import json
from urllib.parse import unquote_plus
from interfaces import Collection, Serie

app = Flask(__name__)
CORS(app)

def get_collection(path: str) -> Collection:

    movies = []
    series = []

    files_to_ignore = ['.gitkeep']
    
    for element in os.listdir(path):
        if element in files_to_ignore:
            continue
        item = os.path.join(path, element)
        if os.path.isfile(item):
            movies.append(Movie(
                id=0,
                title=element,
                year='2020',
                rating=0,
                description='description',
                uri=item
            ))
        elif os.path.isdir(item):
            episodes = []
            for episode in os.listdir(item):
                episodes.append(Movie(
                    id=0,
                    title=episode,
                    year='2020',
                    rating=0,
                    description='description',
                    uri=os.path.join(item, episode)
                ))
            series.append(Serie(
                id=0,
                title=element,
                year='2020',
                rating=0,
                description='description',
                episodes=episodes
            ))
        else:
            print("Unknown!")

    return Collection(movies=movies, series=series)

def get_chunk(filename:str, byte1=None, byte2=None):
    file_size = os.stat(filename).st_size
    start = 0
    
    if byte1 < file_size:
        start = byte1
    if byte2:
        length = byte2 + 1 - byte1
    else:
        length = file_size - start
    with open(filename, 'rb') as f:
        f.seek(start)
        chunk = f.read(length)
    return chunk, start, length, file_size


@app.route("/movies", methods=["GET"])
def get_movies():
    collection = get_collection("static")

    return json.dumps(collection, default=lambda o: o.__dict__)

@app.route("/stream", methods=["GET"])
def send_movie():
    range_header = request.headers.get('Range', None)
    uri = request.args.get('uri')
    byte1, byte2 = 0, None
    if range_header:
        match = re.search(r'(\d+)-(\d*)', range_header)
        groups = match.groups()

        if groups[0]:
            byte1 = int(groups[0])
        if groups[1]:
            byte2 = int(groups[1])
       
    chunk, start, length, file_size = get_chunk(uri, byte1, byte2)
    resp = Response(chunk, 206, mimetype='video/mp4',
                      content_type='video/mp4', direct_passthrough=True)
    resp.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(start, start + length - 1, file_size))
    return resp


if __name__ == "__main__":
    app.run(threaded=True, host='0.0.0.0', port=5000)