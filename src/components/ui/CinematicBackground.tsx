import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CitySkyline } from './SpiderWeb';

// ─────────────────────────────────────────
// Developer code snippets for data streams
// ─────────────────────────────────────────
const CODE_LINES = [
  'const app = express()',
  'useState<User>(null)',
  'npm run build',
  'git push origin main',
  'app.listen(3000)',
  'useEffect(() => {}, [])',
  'mongoose.connect(uri)',
  'docker-compose up -d',
  '.then(res => res.json())',
  "import React from 'react'",
  'npm install --save',
  'git commit -m "feat:"',
  'SELECT * FROM users',
  'res.status(200).json({})',
];

// ─────────────────────────────────────────
// Layer 2: Neural Network Canvas
// (mouse-reactive nodes + spider web + data packets)
// ─────────────────────────────────────────
const NeuralNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const W = () => canvas.width;
    const H = () => canvas.height;

    const mouse = { x: -9999, y: -9999 };
    const MOUSE_R = 190;
    const NODE_COUNT = window.innerWidth < 768 ? 48 : 88;
    const CONNECT_DIST = 125;

    // Spider red, tech cyan, purple
    const COLORS_RGB = ['255, 0, 60', '0, 217, 255', '124, 58, 237'];

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number; ci: number; // color index
    }

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.8 + 0.7,
      ci: Math.floor(Math.random() * 3),
    }));

    // Diagonal data packets
    interface Packet {
      x: number; y: number;
      speed: number; size: number;
      opacity: number; ci: number;
    }

    const packets: Packet[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      speed: Math.random() * 0.55 + 0.2,
      size: Math.random() * 1.4 + 0.4,
      opacity: Math.random() * 0.22 + 0.05,
      ci: Math.floor(Math.random() * 3),
    }));

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mouseleave', onLeave);

    const draw = () => {
      const w = W(); const h = H();
      ctx.clearRect(0, 0, w, h);

      // ── Update + draw nodes ──
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Gentle mouse repulsion
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_R && d > 1) {
          const f = (MOUSE_R - d) / MOUSE_R * 0.014;
          n.x += dx * f;
          n.y += dy * f;
        }
      });

      // ── Draw connections ──
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];

        // Node↔mouse connection
        const mdx = mouse.x - ni.x;
        const mdy = mouse.y - ni.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        const nearM = md < MOUSE_R;

        if (nearM) {
          const a = (1 - md / MOUSE_R) * 0.45;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(ni.x, ni.y);
          ctx.strokeStyle = `rgba(255, 0, 60, ${a})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Node↔node connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const a = (1 - dist / CONNECT_DIST) * 0.13;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.strokeStyle = `rgba(${COLORS_RGB[ni.ci]}, ${a})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }

        // ── Draw individual node ──
        const nodeR = nearM ? ni.r * 2.2 : ni.r;
        const rgb = nearM ? '255, 0, 60' : COLORS_RGB[ni.ci];
        const alpha = nearM ? 0.95 : 0.38;

        if (nearM) {
          // Red glow halo
          const glow = ctx.createRadialGradient(ni.x, ni.y, 0, ni.x, ni.y, nodeR * 6);
          glow.addColorStop(0, 'rgba(255, 0, 60, 0.28)');
          glow.addColorStop(1, 'rgba(255, 0, 60, 0)');
          ctx.beginPath();
          ctx.arc(ni.x, ni.y, nodeR * 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(ni.x, ni.y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fill();
      }

      // ── Mouse energy field ──
      if (mouse.x > -9000) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110);
        g.addColorStop(0, 'rgba(255, 0, 60, 0.08)');
        g.addColorStop(0.45, 'rgba(124, 58, 237, 0.04)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 110, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── Data packets (diagonal) ──
      packets.forEach(p => {
        p.x += p.speed;
        p.y -= p.speed * 0.65;
        if (p.x > w) p.x = -4;
        if (p.y < -4) p.y = h + 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS_RGB[p.ci]}, ${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

// ─────────────────────────────────────────
// Main Cinematic Background (all 7 layers)
// ─────────────────────────────────────────
export const CinematicBackground = () => {
  return (
    <>
      {/* ── LAYER 1: Deep Space Nebula Gradients ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Base: very dark navy, not pure black */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #020617 0%, #09090b 40%, #0d0414 70%, #020617 100%)',
        }} />
        {/* Purple nebula cloud top-right */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 55% at 75% 15%, rgba(124, 58, 237, 0.1) 0%, transparent 65%)',
        }} />
        {/* Red energy burst bottom-left */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 55% 45% at 15% 75%, rgba(255, 0, 60, 0.08) 0%, transparent 60%)',
        }} />
        {/* Cyan tech glow centre */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 40% 35% at 50% 50%, rgba(0, 217, 255, 0.04) 0%, transparent 65%)',
        }} />
        {/* Purple depth bottom-right */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 45% 35% at 85% 85%, rgba(124, 58, 237, 0.07) 0%, transparent 55%)',
        }} />
      </div>

      {/* ── LAYER 2: Neural Network Canvas ── */}
      <NeuralNetworkCanvas />

      {/* ── LAYER 3: Floating Developer Data Streams ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-[2]">
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            className="absolute font-mono text-[10px] leading-none whitespace-nowrap tracking-tight"
            style={{
              left: `${((i * 7.3) % 87) + 1}%`,
              bottom: '-1.5rem',
              animation: `floatUp ${13 + (i * 1.9) % 11}s linear infinite`,
              animationDelay: `${-(i * 2.4) % 13}s`,
              color: i % 3 === 0 ? '#ff003c' : i % 3 === 1 ? '#00d9ff' : '#7c3aed',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* ── LAYER 4: Spider-Verse Dimensional Portal Corners ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        {/* Top-left */}
        <svg className="absolute top-0 left-0 w-60 h-60" viewBox="0 0 200 200">
          {Array.from({ length: 15 }, (_, i) => (
            <line
              key={i}
              x1={-15 + i * 15} y1={0}
              x2={i * 15 - 35}  y2={210}
              stroke={i % 2 === 0 ? '#ff003c' : '#00d9ff'}
              strokeWidth="1.2"
              opacity={0.06}
            />
          ))}
        </svg>

        {/* Top-right */}
        <svg className="absolute top-0 right-0 w-60 h-60" viewBox="0 0 200 200">
          {Array.from({ length: 15 }, (_, i) => (
            <line
              key={i}
              x1={215 - i * 15} y1={0}
              x2={235 - i * 15} y2={210}
              stroke={i % 2 === 0 ? '#7c3aed' : '#ff003c'}
              strokeWidth="1.2"
              opacity={0.055}
            />
          ))}
        </svg>

        {/* Bottom-left */}
        <svg className="absolute bottom-0 left-0 w-52 h-52" viewBox="0 0 200 200">
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={i}
              x1={-10 + i * 17} y1={200}
              x2={i * 17 - 25}  y2={0}
              stroke={i % 2 === 0 ? '#00d9ff' : '#7c3aed'}
              strokeWidth="1.2"
              opacity={0.045}
            />
          ))}
        </svg>

        {/* Bottom-right */}
        <svg className="absolute bottom-0 right-0 w-52 h-52" viewBox="0 0 200 200">
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={i}
              x1={210 - i * 17} y1={200}
              x2={225 - i * 17} y2={0}
              stroke={i % 2 === 0 ? '#ff003c' : '#00d9ff'}
              strokeWidth="1.2"
              opacity={0.045}
            />
          ))}
        </svg>
      </div>

      {/* ── LAYER 5: Dynamic Lighting Blobs (red/blue/purple mix) ── */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,60,0.06) 0%, transparent 70%)',
            top: '5%', left: '0%',
          }}
          animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,217,255,0.05) 0%, transparent 70%)',
            bottom: '10%', right: '5%',
          }}
          animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          className="absolute w-[380px] h-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
            top: '35%', right: '25%',
          }}
          animate={{ x: [0, 25, 0], y: [0, 35, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />
      </div>

      {/* ── LAYER 6: Cyber City Silhouette ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-50 z-[4] pointer-events-none">
        <CitySkyline />
      </div>

      {/* ── LAYER 7: Scan-line HUD overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(255,255,255,0.015) 50%)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* Top & bottom vignettes to tie everything into the dark background */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#020617] to-transparent pointer-events-none z-[6]" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-[6]" />
    </>
  );
};
