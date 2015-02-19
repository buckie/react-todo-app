import os
import json
try:
    from flask import Flask, Response, request
except:
    raise "You need to install flask for this to work (`pip install flask`)"

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
app.add_url_rule('/index.html', 'index', lambda: app.send_static_file('index.html'))

@app.route('/json/<fname>', methods=['GET', 'POST'])
def json_handler(fname):
    
    filename = "_{fname}.json".format(fname=fname)
    if os.path.exists(filename):
        with open(filename, 'r') as file:
            json_data = json.loads(file.read())
    else:
        print "Filename {fname} does not exist! We will create one for you when you send some data".format(fname=fname)
        json_data = []

    if request.method == 'POST':
        json_data.append(request.form.to_dict())

        with open(filename, 'w') as file:
            file.write(json.dumps(json_data, indent=4, separators=(',', ': ')))
    print "Server sent file '{fname}' with contents:".format(fname=filename)
    print json.dumps(json_data)
    return Response(json.dumps(json_data), mimetype='application/json')

if __name__ == '__main__':
    app.run(port=3000, debug=True)

