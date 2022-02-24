from tensorflow.keras.models import load_model
import numpy as np
import matplotlib.pyplot as plt
import os
import json

models_folder = "models"
model_name = "2022-02-22--18-33-10.h5"
model_save_path =  os.path.join(models_folder,model_name)


model = load_model(model_save_path)
print(model.summary())


filename = "image.json"

with open(filename, 'r') as myfile:
    stringifiedData = myfile.read()

    
tda = [json.loads(stringifiedData)]
tda = np.asarray(tda, dtype=np.float32)

print(tda.shape)

print("prediction")
predictions = model.predict(tda)
print(np.argmax(predictions[0]))

plt.imshow(tda[0],cmap=plt.cm.binary)
plt.show()

