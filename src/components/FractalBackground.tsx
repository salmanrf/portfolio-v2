import { useEffect, useRef } from "react";

// A line segment of a fractal. `order` (0..1) is when the segment starts drawing
// during the grow phase, so fractals appear to build themselves up.
type Segment = { x1: number; y1: number; x2: number; y2: number; order: number };

type Fractal = {
  segments: Segment[];
  hue: number;
  born: number;
  growMs: number;
  holdMs: number;
  fadeMs: number;
};

// Small cat emojis drift down from the top of the page, spinning slowly.
type Cat = { glyph: string; x: number; y: number; size: number; vy: number; drift: number; angle: number; spin: number };

const CAT_EMOJIS = ["🐱", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🐈", "🐈‍⬛"];
const MAX_CATS = 6;
const MIN_CAT_SPAWN_MS = 2000;
const MAX_CAT_SPAWN_MS = 6000;
const CAT_ALPHA = 0.7;

const MAX_ACTIVE = 4;
const MIN_SPAWN_MS = 1500;
const MAX_SPAWN_MS = 4500;
const MAX_ALPHA = 0.35;
// How much of the grow phase a single segment takes to draw.
const SEGMENT_SPAN = 0.15;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function tree(x: number, y: number, size: number): Segment[] {
  const segments: Segment[] = [];
  const maxDepth = 9;
  const spread = rand(0.3, 0.6);
  const ratio = rand(0.65, 0.75);

  const branch = (x1: number, y1: number, angle: number, len: number, depth: number) => {
    const x2 = x1 + Math.cos(angle) * len;
    const y2 = y1 + Math.sin(angle) * len;
    segments.push({ x1, y1, x2, y2, order: (depth / maxDepth) * (1 - SEGMENT_SPAN) });
    if (depth >= maxDepth) return;
    branch(x2, y2, angle - spread, len * ratio, depth + 1);
    branch(x2, y2, angle + spread, len * ratio, depth + 1);
  };

  branch(x, y + size, -Math.PI / 2 + rand(-0.2, 0.2), size * 0.35, 0);
  return segments;
}

function koch(cx: number, cy: number, size: number): Segment[] {
  const radius = size * 0.6;
  const rotation = rand(0, Math.PI * 2);
  let points: [number, number][] = [0, 1, 2].map((i) => {
    const a = rotation + (i * 2 * Math.PI) / 3;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius];
  });

  for (let level = 0; level < 4; level++) {
    const next: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      const [ax, ay] = points[i];
      const [bx, by] = points[(i + 1) % points.length];
      const dx = (bx - ax) / 3;
      const dy = (by - ay) / 3;
      const px = ax + dx;
      const py = ay + dy;
      const qx = ax + 2 * dx;
      const qy = ay + 2 * dy;
      // Peak of the bump: rotate the middle third by -60deg.
      const tx = px + dx * Math.cos(-Math.PI / 3) - dy * Math.sin(-Math.PI / 3);
      const ty = py + dx * Math.sin(-Math.PI / 3) + dy * Math.cos(-Math.PI / 3);
      next.push([ax, ay], [px, py], [tx, ty], [qx, qy]);
    }
    points = next;
  }

  return points.map(([x1, y1], i) => {
    const [x2, y2] = points[(i + 1) % points.length];
    return { x1, y1, x2, y2, order: (i / points.length) * (1 - SEGMENT_SPAN) };
  });
}

function sierpinski(cx: number, cy: number, size: number): Segment[] {
  const segments: Segment[] = [];
  const maxDepth = 5;
  const radius = size * 0.7;
  const rotation = rand(0, Math.PI * 2);
  const corners = [0, 1, 2].map((i) => {
    const a = rotation + (i * 2 * Math.PI) / 3;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius] as [number, number];
  });

  const triangle = (a: [number, number], b: [number, number], c: [number, number], depth: number) => {
    const order = (depth / maxDepth) * (1 - SEGMENT_SPAN);
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      segments.push({ x1: p[0], y1: p[1], x2: q[0], y2: q[1], order });
    }
    if (depth >= maxDepth) return;
    const ab: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const bc: [number, number] = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
    const ca: [number, number] = [(c[0] + a[0]) / 2, (c[1] + a[1]) / 2];
    triangle(a, ab, ca, depth + 1);
    triangle(ab, b, bc, depth + 1);
    triangle(ca, bc, c, depth + 1);
  };

  triangle(corners[0], corners[1], corners[2], 0);
  return segments;
}

const GENERATORS = { tree, koch, sierpinski };
type GeneratorName = keyof typeof GENERATORS;
const GENERATOR_NAMES = Object.keys(GENERATORS) as GeneratorName[];

// `?shape=tree` (or koch, sierpinski) forces one fractal kind, handy when tweaking a drawing.
function pickGenerator() {
  const forced = new URLSearchParams(window.location.search).get("shape") as GeneratorName | null;
  if (forced && forced in GENERATORS) return GENERATORS[forced];
  return GENERATORS[GENERATOR_NAMES[Math.floor(Math.random() * GENERATOR_NAMES.length)]];
}

function spawn(width: number, height: number, now: number): Fractal {
  const size = Math.min(width, height) * rand(0.12, 0.25);
  const generate = pickGenerator();

  return {
    segments: generate(rand(size, width - size), rand(size, height - size), size),
    // Between the site's primary blue (205) and the container purple (254).
    hue: rand(220, 235),
    born: now,
    growMs: rand(2500, 4000),
    holdMs: 1500,
    fadeMs: 2000,
  };
}

function spawnCat(width: number): Cat {
  const size = rand(14, 20);
  return {
    glyph: CAT_EMOJIS[Math.floor(Math.random() * CAT_EMOJIS.length)],
    x: rand(size, width - size),
    y: -size,
    size,
    vy: rand(18, 34), // px per second
    drift: rand(-6, 6), // px per second sideways
    angle: rand(0, Math.PI * 2),
    spin: rand(0.25, 0.6) * (Math.random() < 0.5 ? -1 : 1), // radians per second
  };
}

function stepCat(cat: Cat, dtSeconds: number) {
  cat.y += cat.vy * dtSeconds;
  cat.x += cat.drift * dtSeconds;
  cat.angle += cat.spin * dtSeconds;
}

function drawCat(ctx: CanvasRenderingContext2D, cat: Cat) {
  ctx.save();
  ctx.globalAlpha = CAT_ALPHA;
  ctx.translate(cat.x, cat.y);
  ctx.rotate(cat.angle);
  ctx.font = `${cat.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(cat.glyph, 0, 0);
  ctx.restore();
}

function draw(ctx: CanvasRenderingContext2D, fractal: Fractal, now: number) {
  const age = now - fractal.born;
  const progress = Math.min(age / fractal.growMs, 1);
  const fadeStart = fractal.growMs + fractal.holdMs;
  const alpha = age < fadeStart ? MAX_ALPHA : MAX_ALPHA * (1 - (age - fadeStart) / fractal.fadeMs);

  ctx.strokeStyle = `hsla(${fractal.hue}, 70%, 60%, ${alpha})`;
  ctx.beginPath();
  for (const s of fractal.segments) {
    const t = (progress - s.order) / SEGMENT_SPAN;
    if (t <= 0) continue;
    const k = Math.min(t, 1);
    ctx.moveTo(s.x1, s.y1);
    ctx.lineTo(s.x1 + (s.x2 - s.x1) * k, s.y1 + (s.y2 - s.y1) * k);
  }
  ctx.stroke();
}

function FractalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let fractals: Fractal[] = [];
    let cats: Cat[] = [];
    let frame = 0;
    let spawnTimer = 0;
    let catTimer = 0;
    let lastFrame = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 1;
    };

    const scheduleSpawn = () => {
      spawnTimer = window.setTimeout(() => {
        if (!document.hidden && fractals.length < MAX_ACTIVE) {
          fractals.push(spawn(window.innerWidth, window.innerHeight, performance.now()));
        }
        scheduleSpawn();
      }, rand(MIN_SPAWN_MS, MAX_SPAWN_MS));
    };

    const scheduleCat = () => {
      catTimer = window.setTimeout(() => {
        if (!document.hidden && cats.length < MAX_CATS) {
          cats.push(spawnCat(window.innerWidth));
        }
        scheduleCat();
      }, rand(MIN_CAT_SPAWN_MS, MAX_CAT_SPAWN_MS));
    };

    const render = (now: number) => {
      // Cap the step so a backgrounded tab doesn't teleport cats when it wakes.
      const dt = Math.min((now - lastFrame) / 1000, 0.1);
      lastFrame = now;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      fractals = fractals.filter((f) => now - f.born < f.growMs + f.holdMs + f.fadeMs);
      for (const f of fractals) draw(ctx, f, now);

      for (const c of cats) stepCat(c, dt);
      cats = cats.filter((c) => c.y < window.innerHeight + c.size);
      for (const c of cats) drawCat(ctx, c);

      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    scheduleSpawn();
    scheduleCat();
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.clearTimeout(spawnTimer);
      window.clearTimeout(catTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} id="fractal-background" aria-hidden="true" />;
}

export default FractalBackground;
