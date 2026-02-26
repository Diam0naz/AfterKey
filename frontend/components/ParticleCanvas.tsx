"use client";
import { useEffect, useRef } from "react";

interface Triangle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number; 
  spin: number; 
  alpha: number;
  color: string;
}

const COLORS = [
  "rgba(99, 102, 241,",
  "rgba(139, 92, 246,",
  "rgba(56, 189, 248,", 
  "rgba(168, 85, 247,", 
];


function drawTriangle(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const θ = (i * 2 * Math.PI) / 3 - Math.PI / 2; 
    const px = Math.cos(θ) * size;
    const py = Math.sin(θ) * size;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let triangles: Triangle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const spawn = (): Triangle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 10 + 5, 
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.012, 
      alpha: Math.random() * 0.35 + 0.08,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const init = () => {
      resize();
      triangles = Array.from({ length: 80 }, spawn);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      triangles.forEach((t) => {
        t.x += t.vx;
        t.y += t.vy;
        t.angle += t.spin;

        if (t.x < -t.size) t.x = canvas.width + t.size;
        if (t.x > canvas.width + t.size) t.x = -t.size;
        if (t.y < -t.size) t.y = canvas.height + t.size;
        if (t.y > canvas.height + t.size) t.y = -t.size;

        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);

        drawTriangle(ctx, t.size);
        ctx.fillStyle = `${t.color}${t.alpha * 0.4})`;
        ctx.fill();

        drawTriangle(ctx, t.size);
        ctx.strokeStyle = `${t.color}${t.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
