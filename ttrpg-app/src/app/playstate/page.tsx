"use client";

import Ref, { useRef, useEffect, useState} from "react";

export default function PlayState() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawGrid(ctx);
  }, [zoom, offset]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 50 * zoom;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.beginPath();

    for (let x = -offset.x % gridSize; x < ctx.canvas.width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    for (let y = -offset.y % gridSize; y < ctx.canvas.height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const newZoom = zoom - e.deltaY * zoomFactor * 0.01;
    setZoom(Math.max(0.5, Math.min(2, newZoom)));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setOffset((prev) => ({
        x: prev.x + e.clientX - dragStart.x,
        y: prev.y + e.clientY - dragStart.y,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col">
      {/* Top Toolbar Section */}
      <div className="h-16 bg-gray-800 text-white flex items-center justify-center border-b border-gray-700">
        <div className="text-lg">Tool Area (placeholder)</div>
      </div>

      {/* Map Container */}
      <div
        className="flex-1 overflow-hidden relative border-t border-gray-700"
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{ width: "100%", height: "100%" }}
        ></canvas>
      </div>
    </div>
  );
};