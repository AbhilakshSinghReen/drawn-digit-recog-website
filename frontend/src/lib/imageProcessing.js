import { minOfArray } from "./jsHelpers";

export function convertImageToGrey(pixelData, width, height) {
    const greyImage = [];

    let i = 0;
    while (i < width) {
        let j = 0;
        const row = [];
        while (j < height) {
            const pixelIndex = (i * width + j) * 4;
            const lightness = (255 - parseInt((pixelData[pixelIndex] + pixelData[pixelIndex + 1] + pixelData[pixelIndex + 2]) / 3)) * pixelData[pixelIndex + 3] / 255;
            row.push(lightness / 255);
            j += 1
        }
        greyImage.push(row);
        i += 1;
    }

    return greyImage;
}

export function padPixelData4OnEachSide(arr) {
    const output = [];
    const emptyRow = Array(28).fill(0);

    for (let i = 0; i < 4; i++) {
        output.push(emptyRow);
    }

    for (let j = 0; j < arr.length; j++) {
        const nonEmptyRow = Array(4).fill(0);

        for (let k = 0; k < arr[j].length; k++) {
            nonEmptyRow.push(arr[j][k]);
        }

        for (let i = 0; i < 4; i++) {
            nonEmptyRow.push(0);
        }

        output.push(nonEmptyRow);
    }

    for (let i = 0; i < 4; i++) {
        output.push(emptyRow);
    }

    return output;
}

export function getRoiForCrop(pixelData, width, height) {
    const arr2dData = convertImageToGrey(pixelData, width, height);

    if (arr2dData.length === 0) {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    let roiStartX = arr2dData[0].length;
    let roiEndX = 0;
    let roiStartY = arr2dData.length;
    let roiEndY = 0;

    for (let i = 0; i < arr2dData.length; i++) {
        for (let j = 0; j < arr2dData[0].length; j++) {
            if (arr2dData[i][j] !== 0) {
                if (j < roiStartX) {
                    roiStartX = j;
                }
                if (j > roiEndX) {
                    roiEndX = j;
                }

                if (i < roiStartY) {
                    roiStartY = i;
                }
                if (i > roiEndY) {
                    roiEndY = i;
                }
            }
        }
    }

    const xLen = roiEndX - roiStartX;
    const yLen = roiEndY - roiStartY;

    if (xLen === arr2dData.length || yLen === arr2dData.length) {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    const top = roiStartY;
    const bottom = height - roiEndY;

    const left = roiStartX;
    const right = width - roiEndX;

    const minCrop = minOfArray([top, right, bottom, left]);

    let rv = { top: minCrop, right: minCrop, bottom: minCrop, left: minCrop };

    return rv;
}

export function isImageBlank(pixelData, width, height) {
    let isBlank = true;

    for (let i = 0; i < height; i++) {
        if (isBlank) {
            for (let j = 0; j < width; j++) {
                if (isBlank) {
                    if (pixelData[i][j] !== 0) {
                        isBlank = false;
                    }
                }
            }
        }
    }

    return isBlank;
}