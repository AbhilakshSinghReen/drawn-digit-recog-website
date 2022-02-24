from os import system, path

if __name__ == "__main__":
    models_folder = "models"
    model_name = "2022-02-24--16-26-51"
    model_extension = ".h5"
    model_save_path =  path.join(models_folder, model_name + model_extension)

    destination_folder = "tfjs-models"
    tfjs_model_save_path = path.join(destination_folder,model_name)

    system(f"tensorflowjs_converter --input_format keras {model_save_path} {tfjs_model_save_path}")