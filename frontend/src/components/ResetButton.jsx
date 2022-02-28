import { useCanvas } from '../context/CanvasContext'

export default function ResetButton({ setPredictionText }) {
  const { clearCanvas } = useCanvas()

  const resetButtonOnClick = () => {
    clearCanvas();
    setPredictionText("Draw a digit and hit recognize!");
  }

  return <button className="button" onClick={resetButtonOnClick}>Reset</button>
}