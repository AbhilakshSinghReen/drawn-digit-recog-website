import { loadLayersModel, tensor } from '@tensorflow/tfjs'
import resizeImageData from 'resize-image-data';
import cropImageData from 'crop-image-data';

import { indexOfMax } from "./jsHelpers";
import { convertImageToGrey, padPixelData4OnEachSide, getRoiForCrop } from "./imageProcessing"

function processImageData(imageData) {
    const croppedImageData = cropImageData(imageData, getRoiForCrop(imageData.data, imageData.width, imageData.height));
    const resizedImage = resizeImageData(croppedImageData, 20, 20, 'bilinear-interpolation')
    const greyPixelData = convertImageToGrey(resizedImage.data, resizedImage.width, resizedImage.height);
    const paddedGreyPixelData = padPixelData4OnEachSide(greyPixelData);

    return paddedGreyPixelData;
}

export function recognizeDigit(model, imageData) {
    const paddedGreyPixelData = processImageData(imageData);

    const inputVals = tensor([paddedGreyPixelData])

    const probabilities = model.predict(inputVals).dataSync();
    
    const prediction = indexOfMax(probabilities)

    return prediction;
}
