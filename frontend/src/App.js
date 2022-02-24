import { useState, useEffect } from 'react';
import { loadLayersModel } from '@tensorflow/tfjs'

import Canvas from './components/Canvas';
import ResetButton from './components/ResetButton';
import RecognizeButton from './components/RecognizeButton';

import "./App.css"


function App() {
  const [model, setModel] = useState(null);
  const [predictionText, setPredictionText] = useState("Draw a digit and hit recognize!")

  const loadModel = async () => {
    const model = await loadLayersModel("http://localhost:3000/tfjs_model/model.json");
    setModel(model);
  }

  useEffect(() => {
    loadModel();
  }, [])


  return (
    <div className="BackgroundContainer">
      <div className="Container">
        <Canvas />

        <div className="ButtonsDiv">
          <ResetButton setPredictionText={setPredictionText} />
          <RecognizeButton model={model} setPredictionText={setPredictionText} />
        </div>

        <h4 className="predictionText">{predictionText}</h4>
      </div>
    </div>
  );
}

export default App;
