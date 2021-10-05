import os

def executeConditionalPath(path, callback, pathExistsCallback = lambda x: x):
    if not os.path.exists(path):
        print("Creating: ", path)

        callback(path)

        return

    pathExistsCallback(path)

def createFile(path, contents):
    file = open(path, "w", encoding="utf-8")
    file.write(contents)
    file.close()