from flask import Flask, request, send_file, Response
from flask_cors import CORS
import base64
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def index():
    """
    POST route handler that accepts an image, manipulates it and returns a JSON containing a possibly different image with more fields
    """
    # Read image from request and write to server's file system
    data = request.files['file'] 
    data.save('save_pic.jpg')

    # Do something with the image e.g. transform, crop, scale, computer vision detection
    # some_function_you_want()

    # Return the original/manipulated image with more optional data as JSON
    saved_img = open('save_pic.jpg', 'rb').read() # Read as binary
    saved_img_b64 = base64.b64encode(saved_img).decode('utf-8') # UTF-8 can be converted to JSON
    response = {}
    response['data'] = saved_img_b64
    response['more_fields'] = 'more data' # Can return values such as Machine Learning accuracy or precision

    # If only the image is required, you can use send_file instead
    # return send_file('save_pic.jpg', mimetype='image/jpg') 
    return Response(json.dumps(response))