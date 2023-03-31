import { useEffect, useRef, useState } from 'react'
import './App.css'
import { createEngine } from './lib/engine';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(!canvasRef.current) return;
    return createEngine(canvasRef.current);
  }, [canvasRef])


  return (
    <canvas style={{ width: '100vw', height: '100vh' }} ref={canvasRef} />
  )
}

export default App
