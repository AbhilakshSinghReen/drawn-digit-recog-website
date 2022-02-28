import { useCanvas } from '../context/CanvasContext'
import { recognizeDigit } from '../lib/recognizer'

export default function RecognizeButton({ model, setPredictionText }) {
  const { getCanvasImageData } = useCanvas()

  const recognizeButtonOnClick = async () => {
    const imageData = getCanvasImageData();
    const predictionResult = recognizeDigit(model, imageData);

    if (predictionResult.success) {
      setPredictionText(`The digit is: ${predictionResult.prediction}`)
    } else {
      setPredictionText(predictionResult.message)
    }
  }

  return <button className="button" onClick={recognizeButtonOnClick}>Recognize</button>
}