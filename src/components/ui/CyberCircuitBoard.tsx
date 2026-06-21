import { useEffect, useRef } from 'react';

interface CNode {
  x: number;
  y: number;
  glow: number;
  pulsePhase: number; // for organic random pulse
}

interface CEdge {
  from: number;
  to: number;
  colorRgb: string;
}

interface EnergyPacket {
  edgeIdx: number;
  progress: number;
  speed: number;
  colorRgb: string;
  forward: boolean;
  size: number;
}

const PALETTE = [
  '255, 0, 60',    // spider red
  '0, 217, 255',   // tech cyan
  '124, 58, 237',  // purple
];

export const CyberCircuitBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -9999, y: -9999 };

    let nodes: CNode[] = [];
    let edges: CEdge[] = [];
    let packets: EnergyPacket[] = [];

    const COLS = 18;
    const ROWS = 4;

    const build = () => {
      nodes = [];
      edges = [];
      packets = [];

      const w = canvas.width;
      const h = canvas.height;
      const colW = w / (COLS - 1);
      const rowH = h / (ROWS + 1);

      // Grid nodes with slight organic offset
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          nodes.push({
            x: c * colW + (Math.random() - 0.5) * colW * 0.25,
            y: (r + 1) * rowH + (Math.random() - 0.5) * rowH * 0.35,
            glow: 0,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      }

      const id = (r: number, c: number) => r * COLS + c;

      // Horizontal traces (dense — 88% chance)
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          if (Math.random() > 0.12) {
            edges.push({
              from: id(r, c),
              to: id(r, c + 1),
              colorRgb: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            });
          }
        }
      }

      // Vertical connectors (sparse — 38% chance)
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS; c++) {
          if (Math.random() > 0.62) {
            edges.push({
              from: id(r, c),
              to: id(r + 1, c),
              colorRgb: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            });
          }
        }
      }

      // Energy packets along edges
      packets = Array.from({ length: 28 }, () => {
        const edgeIdx = Math.floor(Math.random() * edges.length);
        return {
          edgeIdx,
          progress: Math.random(),
          speed: 0.0008 + Math.random() * 0.0025,
          colorRgb: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          forward: Math.random() > 0.5,
          size: Math.random() * 1.5 + 1.5,
        };
      });
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      build();
    };

    resize();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);

    let tick = 0;

    const draw = () => {
      tick++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // ── Top fade mask (circuit blends into neural net above) ──
      const topFade = ctx.createLinearGradient(0, 0, 0, h);
      topFade.addColorStop(0, 'rgba(2,6,23,1)');
      topFade.addColorStop(0.25, 'rgba(2,6,23,0)');
      topFade.addColorStop(1, 'rgba(2,6,23,0)');

      // ── Update node glow (mouse + autonomous pulse) ──
      nodes.forEach(n => {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const mouseTarget = d < 110 ? (1 - d / 110) * 0.95 : 0;
        // Autonomous faint pulse
        const pulse = (Math.sin(tick * 0.015 + n.pulsePhase) + 1) * 0.04;
        n.glow += (Math.max(mouseTarget, pulse) - n.glow) * 0.07;
      });

      // ── Draw edges ──
      edges.forEach(e => {
        const A = nodes[e.from];
        const B = nodes[e.to];
        if (!A || !B) return;

        const maxGlow = Math.max(A.glow, B.glow);
        const baseAlpha = 0.09 + maxGlow * 0.35;

        // Main trace
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.strokeStyle = `rgba(${e.colorRgb}, ${baseAlpha})`;
        ctx.lineWidth = 0.7 + maxGlow * 2;
        ctx.stroke();

        // Soft glow bloom on active traces
        if (maxGlow > 0.08) {
          ctx.save();
          ctx.filter = 'blur(2px)';
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(B.x, B.y);
          ctx.strokeStyle = `rgba(${e.colorRgb}, ${maxGlow * 0.18})`;
          ctx.lineWidth = 5;
          ctx.stroke();
          ctx.restore();
        }
      });

      // ── Draw junction nodes ──
      nodes.forEach(n => {
        const g = n.glow;
        const r = 2.2 + g * 4;
        const rgb = g > 0.35 ? '255, 0, 60' : '0, 217, 255';

        // Glow halo
        if (g > 0.04) {
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 7);
          halo.addColorStop(0, `rgba(${rgb}, ${g * 0.35})`);
          halo.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 7, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${0.3 + g * 0.7})`;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + g * 0.6})`;
        ctx.fill();
      });

      // ── Update + draw energy packets ──
      packets.forEach(p => {
        p.progress += p.forward ? p.speed : -p.speed;
        if (p.progress > 1) { p.progress = 0; }
        if (p.progress < 0) { p.progress = 1; }

        const edge = edges[p.edgeIdx];
        if (!edge) return;
        const A = nodes[edge.from];
        const B = nodes[edge.to];
        if (!A || !B) return;

        const px = A.x + (B.x - A.x) * p.progress;
        const py = A.y + (B.y - A.y) * p.progress;

        // Trailing glow
        const trail = ctx.createRadialGradient(px, py, 0, px, py, p.size * 5);
        trail.addColorStop(0, `rgba(${p.colorRgb}, 0.55)`);
        trail.addColorStop(0.4, `rgba(${p.colorRgb}, 0.15)`);
        trail.addColorStop(1, `rgba(${p.colorRgb}, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, p.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = trail;
        ctx.fill();

        // Packet core
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorRgb}, 0.9)`;
        ctx.fill();

        // Bright centre
        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      // ── Top fade overlay ──
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, w, h);

      // ── Bottom edge darkens completely ──
      const bottomFade = ctx.createLinearGradient(0, h * 0.75, 0, h);
      bottomFade.addColorStop(0, 'rgba(2,6,23,0)');
      bottomFade.addColorStop(1, 'rgba(2,6,23,1)');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

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
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
      style={{ height: '200px' }}
    />
  );
};
