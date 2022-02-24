import { useCanvas } from '../context/CanvasContext'
import { recognizeDigit } from '../lib/recognizer'

export default function RecognizeButton({ model, setPredictionText }) {
  const { getCanvasImageData } = useCanvas()

  const recognizeButtonOnClick = async () => {
    const imageData = getCanvasImageData();
    const prediction = recognizeDigit(model, imageData);

    setPredictionText(`The digit is: ${prediction}`)
  }

  return <button onClick={recognizeButtonOnClick}>Recognize</button>
}