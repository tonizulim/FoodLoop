"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Map, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const FOOD_ITEMS = [
  { emoji: "🍞", name: "bread" },
  { emoji: "🍎", name: "apple" },
  { emoji: "🧀", name: "cheese" },
  { emoji: "🥕", name: "carrot" },
  { emoji: "🍒", name: "cherry" },
  { emoji: "🍓", name: "strawberry" },
  { emoji: "🍉", name: "watermelon" },
  { emoji: "🍌", name: "banana" },
  { emoji: "🍕", name: "pizza" },
  { emoji: "🍩", name: "donut" },
  { emoji: "🥐", name: "croissant" },
  { emoji: "🍆", name: "eggplant" },
];

interface FallingItem {
  id: number;
  x: number; // percent
  y: number; // percent
  speed: number; // percent per frame
  food: (typeof FOOD_ITEMS)[number];
  rotation: number;
  rotationSpeed: number;
  size: number; // fontSize in px
}

export default function NotFound() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const lastSpawn = useRef(0);
  const nextId = useRef(0);

  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [plateX, setPlateX] = useState(50);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [catchEffect, setCatchEffect] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = useCallback(() => {
    setScore(0);
    setMissed(0);
    setItems([]);
    setGameOver(false);
    setGameStarted(true);
    nextId.current = 0;
    lastSpawn.current = Date.now();
  }, []);

  // Mouse / touch tracking
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleMove = (clientX: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setPlateX(Math.max(8, Math.min(92, pct)));
    };

    const onMouse = (e: MouseEvent) => handleMove(e.clientX);
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: false });

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const loop = () => {
      const now = Date.now();

      const canvasRect = canvasRef.current?.getBoundingClientRect();
      const canvasWidth = canvasRect?.width || 1;
      const canvasHeight = canvasRect?.height || 1;

      // Spawn new items
      const spawnInterval = Math.max(400, 1000 - score * 15);
      if (now - lastSpawn.current > spawnInterval) {
        const food = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
        setItems((prev) => [
          ...prev,
          {
            id: nextId.current++,
            x: 10 + Math.random() * 80,
            y: -5,
            speed: 0.3 + Math.random() * 0.3 + score * 0.008,
            food,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            size: 28 + Math.random() * 16,
          },
        ]);
        lastSpawn.current = now;
      }

      // Update items and collision detection
      setItems((prev) => {
        const next: FallingItem[] = [];
        let newMissed = 0;
        let caught = false;

        const plateWidth = 80; // pixels
        const plateHeight = 20; // pixels
        const platePixelX = (plateX / 100) * canvasWidth;
        const platePixelY = canvasHeight * 0.85;

        for (const item of prev) {
          const newY = item.y + item.speed;
          const itemPixelX = (item.x / 100) * canvasWidth;
          const itemPixelY = (newY / 100) * canvasHeight;

          // Collision check
          const dx = Math.abs(itemPixelX - platePixelX);
          const dy = Math.abs(itemPixelY - platePixelY);

          if (dx < plateWidth / 2 && dy < plateHeight / 2) {
            caught = true;
            setCatchEffect({
              x: item.x,
              y: newY,
              text: `+1 ${item.food.emoji}`,
            });
            setTimeout(() => setCatchEffect(null), 600);
            continue; // remove item
          }

          if (itemPixelY > canvasHeight) {
            newMissed++;
          } else {
            next.push({
              ...item,
              y: newY,
              rotation: item.rotation + item.rotationSpeed,
            });
          }
        }

        if (newMissed > 0) setMissed((m) => m + newMissed);
        if (caught) setScore((s) => s + 1);

        return next;
      });

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [gameStarted, gameOver, plateX, score]);

  // Game over
  useEffect(() => {
    if (gameStarted && missed >= 5) setGameOver(true);
  }, [missed, gameStarted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden select-none">
      {/* Score display */}
      {gameStarted && !gameOver && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg">
            Score: {score}
          </div>
          <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg">
            Missed: {missed}/5
          </div>
        </div>
      )}

      {/* Game canvas */}
      <div
        ref={canvasRef}
        className="relative w-full max-w-2xl aspect-[3/4] md:aspect-[4/3] mx-auto overflow-hidden rounded-2xl border-2 border-border bg-secondary/30"
        style={{ cursor: gameStarted && !gameOver ? "none" : "default" }}
      >
        {/* Background 404 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[180px] md:text-[260px] font-black text-primary/5 leading-none">
            404
          </span>
        </div>

        {/* Falling food */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute pointer-events-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              fontSize: `${item.size}px`,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
            }}
          >
            {item.food.emoji}
          </div>
        ))}

        {/* Catch effect */}
        {catchEffect && (
          <div
            className="absolute pointer-events-none text-primary font-bold text-lg animate-bounce"
            style={{
              left: `${catchEffect.x}%`,
              top: `${catchEffect.y - 8}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {catchEffect.text}
          </div>
        )}

        {/* Plate */}
        {gameStarted && !gameOver && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${plateX}%`,
              top: "85%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <span
                className="text-5xl md:text-6xl"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}
              >
                🍽️
              </span>
              <div className="absolute -inset-3 bg-primary/20 rounded-full blur-xl -z-10" />
            </div>
          </div>
        )}

        {/* Start screen */}
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-background/80 backdrop-blur-sm z-10 text-center px-4">
            <div className="flex gap-2 text-5xl md:text-6xl justify-center">
              {["🍞", "🍎", "🧀", "🥕"].map((e, i) => (
                <span
                  key={i}
                  className="animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {e}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-primary">
              404
            </h1>
            <p className="text-xl md:text-2xl font-bold text-foreground">
              This page is gone, but the food is falling!
            </p>
            <Button
              size="lg"
              onClick={startGame}
              className="text-lg px-8 py-6 mt-2 shadow-xl shadow-primary/25"
            >
              Start Catching
            </Button>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
            >
              or go back to homepage
            </Link>
          </div>
        )}

        {/* Game over screen */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/85 backdrop-blur-sm z-10 text-center px-4">
            <span className="text-6xl">
              {score >= 20 ? "🎉" : score >= 10 ? "😋" : "😢"}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Game Over!
            </h2>
            <div className="bg-primary/10 border-2 border-primary rounded-2xl px-8 py-4">
              <p className="text-sm text-muted-foreground font-medium">
                Final Score
              </p>
              <p className="text-5xl font-black text-primary">{score}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {score >= 20
                  ? "Food saving champion!"
                  : score >= 10
                  ? "Great catching skills!"
                  : "Better luck next time!"}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button size="lg" onClick={startGame} className="gap-2 shadow-lg">
                <RotateCcw className="h-4 w-4" />
                Play Again
              </Button>
              <div className="flex gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <Link href="/">
                    <Home className="h-4 w-4 mr-1" /> Home
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <Link href="/map">
                    <Map className="h-4 w-4 mr-1" /> Map
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom tagline */}
      <p className="text-xs text-muted-foreground mt-4 text-center px-4">
        The page you're looking for doesn't exist. But at least you can save
        some food while you're here.
      </p>
    </div>
  );
}
