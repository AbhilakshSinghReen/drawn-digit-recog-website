import numpy as np
import matplotlib.pyplot as plt
import json

filename = "image.json"

with open(filename, 'r') as myfile:
    stringifiedData = myfile.read()

tda = [json.loads(stringifiedData)]
tda = np.asarray(tda, dtype=np.float32)

plt.imshow(tda[0],cmap=plt.cm.binary)
plt.show()

