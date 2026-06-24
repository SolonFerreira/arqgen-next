import { useState, useRef, useEffect, useCallback } from "react";
import { Send, ZoomIn, ZoomOut, ChevronDown, X, Maximize2 } from "lucide-react";

const COLORS = {
  ink: "#1A202C",
  ink2: "#11151d",
  inkCard: "#20262f",
  green: "#01AD6E",
  green2: "#33E0A1",
  purple: "#564FFF",
  yellow: "#FFBC00",
  red: "#FD4848",
  gray: "#718096",
  gray2: "#CBD5E0",
  paper: "#F7FAFC",
};

const TERRAIN_POINTS = "160,60 480,40 560,120 540,360 420,400 180,380 80,280 100,140";

const INITIAL_TOWERS = [
  { id: "A", x: 180, y: 140, w: 72, h: 52, floors: 12, units: 48, area: 2304, type: "Studio 44m²" },
  { id: "B", x: 310, y: 160, w: 88, h: 60, floors: 15, units: 75, area: 5100, type: "Studio 44m²" },
  { id: "C", x: 390, y: 270, w: 64, h: 48, floors: 10, units: 40, area: 1920, type: "1 dorm 52m²" },
];

const LOT_AREA = 847;

const MOCK_MESSAGES = [
  { role: "user", text: "Quero avaliar este terreno no Brooklin.\nGera três alternativas priorizando\nunidades, mantendo CA abaixo de 12.", time: "14:22" },
  { role: "agent", text: "Entendido. Identifiquei duas premissas\nausentes antes de gerar:\n· Confirma 1 vaga por unidade?\n· Tipologias preferidas: studio 44m²,\n  1 dorm 52m² ou ambas?", time: "14:22" },
  { role: "user", text: "Confirmo 1 vaga. Usa ambas as tipologias.", time: "14:23" },
  {
    role: "skill",
    fn: "gerar_solucoes_implantacao()",
    subtitle: "3 alternativas geradas · Versão 01 ativa",
    text: "Solução com 163 unidades posicionada.\nTorre B concentra maior densidade.\nTaxa de ocupação em 38% — dentro do limite.\nQuer explorar reduzir Torre A para\nabrir área de permeabilidade?",
    time: "14:23",
  },
];

const MOCK_REPLY = "Entendido. Analisando o impacto no estudo atual. Posso ajustar as torres conforme solicitado — qual elemento quer priorizar: unidades, permeabilidade ou recuos?";

// ── helpers ────────────────────────────────────────────────────────────────────

function pointInPolygon(px, py, polyStr) {
  const pts = polyStr.split(" ").map((p) => p.split(",").map(Number));
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function rectInPolygon(x, y, w, h, poly) {
  return (
    pointInPolygon(x, y, poly) &&
    pointInPolygon(x + w, y, poly) &&
    pointInPolygon(x, y + h, poly) &&
    pointInPolygon(x + w, y + h, poly)
  );
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function calcMetrics(towers) {
  const totalUnits = towers.reduce((s, t) => s + t.units, 0);
  const totalArea = towers.reduce((s, t) => s + t.area, 0);
  const baseArea = towers.reduce((s, t) => s + (t.w * t.h) / 100, 0); // px² → rough m²
  const occupancy = Math.min(99, Math.round((baseArea / LOT_AREA) * 100));
  const ca = Math.round((totalArea / LOT_AREA) * 10) / 10;
  return { totalUnits, totalArea, occupancy, ca };
}

// ── MetricBar ──────────────────────────────────────────────────────────────────

function MetricBar({ value, max, warn, danger }) {
  const pct = max ? Math.min(100, (value / max) * 100) : 100;
  const color = max
    ? value >= danger
      ? COLORS.red
      : value >= warn
      ? COLORS.yellow
      : COLORS.green2
    : COLORS.green2;
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginTop: 6 }}>
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          borderRadius: 2,
          transition: "width 0.3s ease, background 0.3s ease",
        }}
      />
    </div>
  );
}

// ── FlipNumber ─────────────────────────────────────────────────────────────────

function FlipNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(value);
  const [flip, setFlip] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true);
      setTimeout(() => { setDisplay(value); setFlip(false); }, 150);
      prev.current = value;
    }
  }, [value]);
  return (
    <span
      style={{
        display: "inline-block",
        transition: "transform 0.15s ease, opacity 0.15s ease",
        transform: flip ? "translateY(-4px)" : "translateY(0)",
        opacity: flip ? 0 : 1,
        fontFamily: "'Sora', sans-serif",
        fontSize: 22,
        fontWeight: 700,
        color: "#fff",
      }}
    >
      {typeof display === "number" ? display.toLocaleString("pt-BR") : display}
      {suffix}
    </span>
  );
}

// ── Typing indicator ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 14px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: COLORS.green2,
            animation: `bounce 1s ease ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── ChatBubble ─────────────────────────────────────────────────────────────────

function ChatBubble({ msg }) {
  if (msg.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <div style={{ maxWidth: "80%" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: "12px 12px 2px 12px",
              padding: "10px 14px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: COLORS.gray2,
              whiteSpace: "pre-line",
            }}
          >
            {msg.text}
          </div>
          <div style={{ textAlign: "right", marginTop: 3, fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.gray }}>
            {msg.time}
          </div>
        </div>
      </div>
    );
  }
  if (msg.role === "skill") {
    return (
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            background: "rgba(86,79,255,0.12)",
            border: "1px solid rgba(203,200,255,0.2)",
            borderRadius: "2px 12px 12px 12px",
            padding: "10px 14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span
              style={{
                background: COLORS.purple,
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: 4,
                letterSpacing: "0.05em",
              }}
            >
              Skill
            </span>
            <code style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(203,200,255,0.8)" }}>
              {msg.fn}
            </code>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gray, marginBottom: 6 }}>
            ↳ {msg.subtitle}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.gray2, whiteSpace: "pre-line" }}>
            {msg.text}
          </div>
        </div>
        <div style={{ marginTop: 3, fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.gray }}>
          {msg.time}
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          background: "rgba(1,173,110,0.1)",
          border: "1px solid rgba(51,224,161,0.15)",
          borderRadius: "2px 12px 12px 12px",
          padding: "10px 14px",
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: COLORS.gray2,
          whiteSpace: "pre-line",
          maxWidth: "90%",
        }}
      >
        {msg.text}
      </div>
      <div style={{ marginTop: 3, fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.gray }}>
        {msg.time}
      </div>
    </div>
  );
}

// ── PropPanel ──────────────────────────────────────────────────────────────────

function PropPanel({ tower, onClose, style }) {
  return (
    <div
      style={{
        position: "absolute",
        background: COLORS.inkCard,
        border: "1px solid rgba(51,224,161,0.2)",
        borderRadius: 10,
        padding: 14,
        minWidth: 180,
        zIndex: 30,
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>
          Torre {tower.id}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: COLORS.green2 }}>Selecionada</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.gray, cursor: "pointer", padding: 0, marginLeft: 8 }}>
          <X size={12} />
        </button>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>
        {[
          ["Pavimentos", tower.floors],
          ["Unidades", tower.units],
          ["Área total", `${tower.area.toLocaleString("pt-BR")} m²`],
          ["Tipologia", tower.type],
        ].map(([label, val]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gray }}>{label}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gray2, fontWeight: 500 }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <button
          style={{
            flex: 1,
            background: "rgba(1,173,110,0.15)",
            border: "1px solid rgba(1,173,110,0.4)",
            borderRadius: 6,
            color: COLORS.green2,
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            padding: "5px 0",
            cursor: "pointer",
          }}
        >
          Ajustar
        </button>
        <button
          style={{
            flex: 1,
            background: "rgba(253,72,72,0.1)",
            border: "1px solid rgba(253,72,72,0.3)",
            borderRadius: 6,
            color: COLORS.red,
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            padding: "5px 0",
            cursor: "pointer",
          }}
        >
          Remover
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ArqgenNext() {
  const [towers, setTowers] = useState(INITIAL_TOWERS);
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [version, setVersion] = useState("Versão 01");
  const [view, setView] = useState("2D");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shakeId, setShakeId] = useState(null);

  // drag state
  const dragging = useRef(null);
  const resizing = useRef(null);
  const svgRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const metrics = calcMetrics(towers);

  // detect conflicts
  function getTowerState(t) {
    const inPoly = rectInPolygon(t.x, t.y, t.w, t.h, TERRAIN_POINTS);
    if (!inPoly) return "conflict";
    const overlaps = towers.some((o) => o.id !== t.id && rectsOverlap(t, o));
    if (overlaps) return "overlap";
    return selected === t.id ? "selected" : "normal";
  }

  function getSvgPoint(e) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  // drag handlers
  function onTowerMouseDown(e, id) {
    e.stopPropagation();
    setSelected(id);
    const t = towers.find((t) => t.id === id);
    const pt = getSvgPoint(e);
    dragging.current = { id, ox: pt.x - t.x, oy: pt.y - t.y, orig: { x: t.x, y: t.y } };
  }

  function onHandleMouseDown(e, id, corner) {
    e.stopPropagation();
    const t = towers.find((t) => t.id === id);
    const pt = getSvgPoint(e);
    resizing.current = { id, corner, startPt: pt, origW: t.w, origH: t.h, origX: t.x, origY: t.y };
  }

  const onSvgMouseMove = useCallback(
    (e) => {
      if (dragging.current) {
        const { id, ox, oy } = dragging.current;
        const pt = getSvgPoint(e);
        setTowers((prev) =>
          prev.map((t) => (t.id === id ? { ...t, x: pt.x - ox, y: pt.y - oy } : t))
        );
      }
      if (resizing.current) {
        const { id, corner, startPt, origW, origH, origX, origY } = resizing.current;
        const pt = getSvgPoint(e);
        const dx = pt.x - startPt.x;
        const dy = pt.y - startPt.y;
        setTowers((prev) =>
          prev.map((t) => {
            if (t.id !== id) return t;
            let { x, y, w, h } = { x: origX, y: origY, w: origW, h: origH };
            if (corner.includes("e")) w = Math.max(30, origW + dx);
            if (corner.includes("s")) h = Math.max(20, origH + dy);
            if (corner.includes("w")) { x = origX + dx; w = Math.max(30, origW - dx); }
            if (corner.includes("n")) { y = origY + dy; h = Math.max(20, origH - dy); }
            const ratio = (w * h) / (origW * origH);
            return {
              ...t, x, y, w, h,
              units: Math.round(t.units * ratio),
              area: Math.round(t.area * ratio),
            };
          })
        );
      }
    },
    []
  );

  const onSvgMouseUp = useCallback(() => {
    if (dragging.current) {
      const { id, orig } = dragging.current;
      setTowers((prev) => {
        const t = prev.find((t) => t.id === id);
        if (!rectInPolygon(t.x, t.y, t.w, t.h, TERRAIN_POINTS)) {
          setShakeId(id);
          setTimeout(() => setShakeId(null), 400);
          return prev.map((tt) => (tt.id === id ? { ...tt, x: orig.x, y: orig.y } : tt));
        }
        return prev;
      });
      dragging.current = null;
    }
    resizing.current = null;
  }, []);

  function sendMessage() {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { role: "user", text: input, time: now }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { role: "agent", text: MOCK_REPLY, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1200);
  }

  // ── render ───────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-3px)} 40%{transform:translateX(3px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.015)} }
        .tower-selected { animation: pulse 200ms ease 1; }
        .tower-shake { animation: shake 300ms ease; }
        transition-all { transition: all 0.15s ease; }
      `}</style>

      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: COLORS.ink2,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif",
          overflow: "hidden",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
        onKeyDown={(e) => e.key === "Escape" && setSelected(null)}
        tabIndex={-1}
      >
        {/* TOPBAR */}
        <div
          style={{
            height: 48,
            background: COLORS.ink2,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 16,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.green }}>
              arqgen
            </span>
            <span
              style={{
                background: COLORS.purple,
                color: "#fff",
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: 20,
                letterSpacing: "0.04em",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Next
            </span>
          </div>

          <div style={{ flex: 1, textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: 13, color: COLORS.gray }}>
            Estudo · Lote Brooklin 847m²
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={{
                background: "none",
                border: `1px solid ${COLORS.green}`,
                color: COLORS.green,
                borderRadius: 6,
                padding: "5px 14px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Exportar
            </button>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#564FFF,#01AD6E)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Sora', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              S
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* CANVAS */}
          <div style={{ flex: "0 0 70%", position: "relative", background: COLORS.ink2, cursor: "crosshair" }}>

            {/* Canvas controls */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 40,
                background: "rgba(17,21,29,0.85)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 12,
                zIndex: 10,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* version selector */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green }} />
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: COLORS.gray2,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    borderRadius: 5,
                    padding: "2px 6px",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {["Versão 01", "Versão 02", "Versão 03"].map((v) => (
                    <option key={v} value={v} style={{ background: COLORS.inkCard }}>{v}</option>
                  ))}
                </select>
              </div>

              {/* zoom */}
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
                <button onClick={() => setZoom((z) => Math.max(50, z - 10))} style={iconBtnStyle}>
                  <ZoomOut size={12} />
                </button>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gray, minWidth: 36, textAlign: "center" }}>
                  {zoom}%
                </span>
                <button onClick={() => setZoom((z) => Math.min(200, z + 10))} style={iconBtnStyle}>
                  <ZoomIn size={12} />
                </button>
              </div>

              {/* view toggle + compare */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }}>
                  {["2D", "3D"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      style={{
                        background: view === v ? COLORS.green : "transparent",
                        border: "none",
                        color: view === v ? "#fff" : COLORS.gray,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "3px 10px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <button
                  style={{
                    background: "none",
                    border: `1px solid ${COLORS.purple}`,
                    color: COLORS.purple,
                    borderRadius: 6,
                    padding: "3px 10px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Comparar versões
                </button>
              </div>
            </div>

            {/* SVG Canvas */}
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox="0 0 640 440"
              style={{ position: "absolute", top: 0, left: 0, userSelect: "none" }}
              onMouseMove={onSvgMouseMove}
              onMouseUp={onSvgMouseUp}
              onMouseLeave={onSvgMouseUp}
              onClick={() => { if (!dragging.current) setSelected(null); }}
            >
              {/* grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="640" height="440" fill="url(#grid)" />

              {/* terrain */}
              <polygon
                points={TERRAIN_POINTS}
                fill="rgba(1,173,110,0.06)"
                stroke="rgba(1,173,110,0.4)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
              <text x="310" y="230" textAnchor="middle" fill={COLORS.gray} fontSize="11" fontFamily="'Inter', sans-serif">
                847 m²
              </text>

              {/* north indicator */}
              <text x="600" y="68" textAnchor="middle" fill={COLORS.gray} fontSize="11" fontFamily="'Inter', sans-serif">
                N ↑
              </text>

              {/* towers */}
              {towers.map((t, i) => {
                const state = getTowerState(t);
                const isSelected = selected === t.id;
                const isShaking = shakeId === t.id;

                const fillColor =
                  state === "conflict" ? "rgba(253,72,72,0.2)"
                  : state === "overlap" ? "rgba(255,188,0,0.15)"
                  : isSelected ? "rgba(1,173,110,0.35)"
                  : "#344357";

                const strokeColor =
                  state === "conflict" ? COLORS.red
                  : state === "overlap" ? COLORS.yellow
                  : isSelected ? COLORS.green2
                  : "#526171";

                const strokeWidth = isSelected || state !== "normal" ? 2 : 1.5;

                return (
                  <g
                    key={t.id}
                    className={isShaking ? "tower-shake" : isSelected ? "tower-selected" : ""}
                    style={{
                      cursor: dragging.current?.id === t.id ? "grabbing" : "grab",
                      transition: isShaking ? "none" : "all 0.15s ease",
                    }}
                    onMouseDown={(e) => onTowerMouseDown(e, t.id)}
                    onClick={(e) => { e.stopPropagation(); setSelected(t.id); }}
                  >
                    <rect
                      x={t.x}
                      y={t.y}
                      width={t.w}
                      height={t.h}
                      rx={4}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      style={{ filter: isSelected ? `drop-shadow(0 0 6px rgba(51,224,161,0.4))` : "none" }}
                    />
                    <text
                      x={t.x + t.w / 2}
                      y={t.y + t.h / 2 + 5}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={14}
                      fontWeight="bold"
                      fontFamily="'Sora', sans-serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {t.id}
                    </text>

                    {/* overlap badge */}
                    {state === "overlap" && (
                      <g>
                        <rect x={t.x + t.w / 2 - 26} y={t.y - 18} width={52} height={16} rx={4} fill={COLORS.yellow} />
                        <text x={t.x + t.w / 2} y={t.y - 7} textAnchor="middle" fill="#000" fontSize={9} fontWeight="bold" fontFamily="'Inter', sans-serif">
                          Conflito
                        </text>
                      </g>
                    )}

                    {/* resize handles */}
                    {isSelected && [
                      ["nw", t.x - 4, t.y - 4],
                      ["ne", t.x + t.w - 4, t.y - 4],
                      ["sw", t.x - 4, t.y + t.h - 4],
                      ["se", t.x + t.w - 4, t.y + t.h - 4],
                    ].map(([corner, hx, hy]) => (
                      <rect
                        key={corner}
                        x={hx}
                        y={hy}
                        width={8}
                        height={8}
                        fill="#fff"
                        stroke={COLORS.green2}
                        strokeWidth={1}
                        rx={1}
                        style={{ cursor: `${corner}-resize`, opacity: 1, transition: "opacity 0.15s ease" }}
                        onMouseDown={(e) => { e.stopPropagation(); onHandleMouseDown(e, t.id, corner); }}
                      />
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* floating prop panel */}
            {selected && (() => {
              const t = towers.find((t) => t.id === selected);
              if (!t) return null;
              const svgEl = svgRef.current;
              if (!svgEl) return null;
              const rect = svgEl.getBoundingClientRect();
              const scaleX = rect.width / 640;
              const scaleY = rect.height / 440;
              const px = t.x * scaleX + rect.left;
              const py = t.y * scaleY + rect.top - 10;
              const panelLeft = px + t.w * scaleX + 10;
              const panelTop = py;
              return (
                <PropPanel
                  tower={t}
                  onClose={() => setSelected(null)}
                  style={{ left: Math.min(panelLeft - rect.left, rect.width - 200), top: Math.max(panelTop - rect.top, 50) }}
                />
              );
            })()}
          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              flex: "0 0 30%",
              background: COLORS.ink,
              display: "flex",
              flexDirection: "column",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* metrics */}
            <div style={{ padding: 16, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div
                style={{
                  background: COLORS.inkCard,
                  borderRadius: 10,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: COLORS.green2,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Métricas do estudo
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 10px" }}>
                  <MetricItem label="Unidades totais" value={<FlipNumber value={metrics.totalUnits} />} bar={<MetricBar value={metrics.totalUnits} max={null} />} />
                  <MetricItem label="Área construída" value={<FlipNumber value={metrics.totalArea} suffix=" m²" />} bar={<MetricBar value={metrics.totalArea} max={null} />} />
                  <MetricItem label="Taxa de ocupação" value={<FlipNumber value={metrics.occupancy} suffix="%" />} bar={<MetricBar value={metrics.occupancy} max={50} warn={45} danger={50} />} />
                  <MetricItem label="CA utilizado" value={<FlipNumber value={metrics.ca} />} bar={<MetricBar value={metrics.ca} max={12} warn={11.5} danger={12} />} />
                </div>
              </div>
            </div>

            {/* chat */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div
                ref={chatRef}
                style={{
                  flex: 1,
                  background: COLORS.ink2,
                  overflowY: "auto",
                  padding: "14px 14px 0",
                }}
              >
                {messages.map((msg, i) => (
                  <ChatBubble key={i} msg={msg} />
                ))}
                {typing && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ background: "rgba(1,173,110,0.1)", border: "1px solid rgba(51,224,161,0.15)", borderRadius: "2px 12px 12px 12px", display: "inline-block" }}>
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>

              {/* input */}
              <div style={{ padding: 12, background: COLORS.inkCard, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <textarea
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Descreva o que quer ajustar..."
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      color: COLORS.gray2,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      padding: "8px 10px",
                      resize: "none",
                      outline: "none",
                      maxHeight: 100,
                      transition: "border-color 0.15s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.green)}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: COLORS.green,
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "opacity 0.15s ease",
                    }}
                  >
                    <Send size={14} color="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── small helpers ──────────────────────────────────────────────────────────────

const iconBtnStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 5,
  color: COLORS.gray2,
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

function MetricItem({ label, value, bar }) {
  return (
    <div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: COLORS.gray, marginBottom: 3 }}>{label}</div>
      {value}
      {bar}
    </div>
  );
}
