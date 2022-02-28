import { createContext, useContext, useRef, useState } from "react";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const canvasWidth = window.innerWidth * 0.5;
    const canvasHeight = window.innerHeight * 0.5;
    const canvasSideLength = canvasWidth > canvasHeight ? canvasHeight : canvasWidth;

    const prepareCanvas = () => {
        const canvas = canvasRef.current

        canvas.width = canvasSideLength * 2;
        canvas.height = canvasSideLength * 2;
        canvas.style.width = `${canvasSideLength}px`;
        canvas.style.height = `${canvasSideLength}px`;
        canvas.style.border = "1px solid black";

        const context = canvas.getContext("2d")
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = Math.floor(canvasSideLength / 10);
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
        const imgData = contextRef.current.getImageData(0, 0, canvasSideLength * 2, canvasSideLength * 2);
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
                getCanvasImageData,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);
