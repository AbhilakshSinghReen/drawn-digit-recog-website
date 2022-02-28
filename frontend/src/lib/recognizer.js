import { tensor } from '@tensorflow/tfjs'
import resizeImageData from 'resize-image-data';
import cropImageData from 'crop-image-data';

import { indexOfMax } from "./jsHelpers";
import { convertImageToGrey, padPixelData4OnEachSide, getRoiForCrop, isImageBlank } from "./imageProcessing"

function processImageData(imageData) {
    const croppedImageData = cropImageData(imageData, getRoiForCrop(imageData.data, imageData.width, imageData.height));
    const resizedImage = resizeImageData(croppedImageData, 20, 20, 'bilinear-interpolation')
    const greyPixelData = convertImageToGrey(resizedImage.data, resizedImage.width, resizedImage.height);

    if (isImageBlank(greyPixelData, resizedImage.width, resizedImage.height)) {
        return {
            success: false,
            message: "Image is blank!",
        }
    }

    const paddedGreyPixelData = padPixelData4OnEachSide(greyPixelData);

    return {
        success: true,
        data: paddedGreyPixelData,
    };
}

export function recognizeDigit(model, imageData) {
    const imageProcessingResult = processImageData(imageData);

    if (!imageProcessingResult.success) {
        return imageProcessingResult;
    }

    const inputVals = tensor([imageProcessingResult.data])

    const probabilities = model.predict(inputVals).dataSync();

    const prediction = indexOfMax(probabilities)

    return {
        success: true,
        prediction: prediction,
    };
}
