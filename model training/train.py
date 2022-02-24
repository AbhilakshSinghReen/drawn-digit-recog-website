import tensorflow as tf
from os import path
from datetime import datetime

def create_model():
    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.Flatten())
    model.add(tf.keras.layers.Dense(128,activation=tf.nn.relu))
    model.add(tf.keras.layers.Dense(128,activation=tf.nn.relu))
    model.add(tf.keras.layers.Dense(10,activation=tf.nn.softmax))

    model.compile(optimizer = "adam", loss = "sparse_categorical_crossentropy",
        metrics = ["accuracy"]
    )

    return model

if __name__ == "__main__":
    models_folder = "models"
    model_name = datetime.now().strftime("%Y-%m-%d--%H-%M-%S")
    model_extension = ".h5"
    model_name = model_name + model_extension
    print(f"Model name: {model_name}")
    model_save_path =  path.join(models_folder,model_name)


    mnist = tf.keras.datasets.mnist
    (x_train, y_train), (x_test,y_test) = mnist.load_data()

    x_train = tf.keras.utils.normalize(x_train, axis =1)
    x_test = tf.keras.utils.normalize(x_test, axis =1)

    model = create_model()

    model.fit(x_train, y_train, epochs =3)
    val_loss, val_acc = model.evaluate(x_test, y_test)
    print(f"V loss: {val_loss}, V acc: {val_acc}")

    model.save(model_save_path)
