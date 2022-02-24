import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const canvasWidth = window.innerWidth * 0.5;
  const canvasHeight = window.innerHeight * 0.5;
  const canvasSideLength = canvasWidth > canvasHeight ? canvasHeight : canvasWidth;

  const prepareCanvas = () => {
    const canvas = canvasRef.current

    canvas.width = canvasSideLength;
    canvas.height = canvasSideLength
    canvas.style.width = `${canvasSideLength}px`;
    canvas.style.height = `${canvasSideLength}px`;
    canvas.style.border = "1px solid black";

    const boundingRects = canvas.getBoundingClientRect();
    // console.log("posx: ", boundingRects.x);
    // console.log("posy: ", boundingRects.y);
    setPosX(boundingRects.x);
    setPosY(boundingRects.y);

    // canvas.offsetX = -posX;


    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    // console.log(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const getCanvasImageData = () => {
    const imgData = contextRef.current.getImageData(0, 0, canvasSideLength, canvasSideLength);
    return imgData;
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        getCanvasImageData
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
