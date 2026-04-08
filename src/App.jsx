import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   DESIGN: Industrial Safety Orange + Near-Black
   Ultra-minimal, oversized tap targets, icon-first
   Built for gloved hands on a 6" phone screen
───────────────────────────────────────────── */

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --orange: #FF6B1A;
    --orange-dark: #E05510;
    --orange-glow: rgba(255,107,26,0.18);
    --bg: #111214;
    --surface: #18191D;
    --surface2: #1F2127;
    --border: rgba(255,255,255,0.07);
    --text: #F2F3F5;
    --muted: #6B7180;
    --green: #22C55E;
    --red: #EF4444;
    --yellow: #FACC15;
    --blue: #60A5FA;
    --radius: 18px;
    --font: 'Nunito', sans-serif;
  }

  body, #root {
    background: var(--bg);
    font-family: var(--font);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  /* Phone shell */
  .phone-wrap {
    width: 100%;
    max-width: 420px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    background: var(--bg);
    overflow: hidden;
  }

  /* Status bar */
  .statusbar {
    background: var(--surface);
    padding: 10px 20px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .statusbar-time { color: var(--text); font-size: 14px; }
  .statusbar-icons { display: flex; gap: 6px; }

  /* Top header */
  .topbar {
    background: var(--surface);
    padding: 14px 20px 16px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .topbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .back-btn {
    width: 40px; height: 40px;
    border-radius: 12px;
    background: var(--surface2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    cursor: pointer;
    color: var(--text);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .page-label {
    font-size: 17px;
    font-weight: 800;
    color: var(--text);
    text-align: center;
    flex: 1;
  }
  .topbar-right-space { width: 40px; }

  /* User greeting bar */
  .greet-bar {
    background: linear-gradient(135deg, #1A1B20 0%, #1E1F25 100%);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    border-bottom: 1px solid var(--border);
  }
  .avatar-lg {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--orange), var(--orange-dark));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 900;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(255,107,26,0.35);
  }
  .greet-text {}
  .greet-name { font-size: 17px; font-weight: 800; color: var(--text); }
  .greet-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }
  .greet-badge {
    margin-left: auto;
    background: var(--orange-glow);
    border: 1px solid var(--orange);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 700;
    color: var(--orange);
  }

  /* Scroll content */
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 20px 16px 100px;
    -webkit-overflow-scrolling: touch;
  }
  .content::-webkit-scrollbar { display: none; }

  /* Section label */
  .section-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
    padding-left: 2px;
  }

  /* ── HOME SCREEN ── */
  .today-card {
    background: linear-gradient(135deg, var(--orange) 0%, var(--orange-dark) 100%);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  .today-card::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
  .today-card::after {
    content: '';
    position: absolute;
    bottom: -20px; right: 30px;
    width: 80px; height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  .today-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.7); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
  .today-site { font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 12px; line-height: 1.2; }
  .today-chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .today-chip {
    background: rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
  }

  /* Big action buttons */
  .action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }
  .action-btn {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 14px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-align: center;
    transition: transform 0.1s, background 0.15s;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
  }
  .action-btn:active { transform: scale(0.97); }
  .action-btn.orange-accent { border-color: rgba(255,107,26,0.3); background: rgba(255,107,26,0.05); }
  .action-btn.green-accent { border-color: rgba(34,197,94,0.3); background: rgba(34,197,94,0.05); }
  .action-btn.blue-accent { border-color: rgba(96,165,250,0.3); background: rgba(96,165,250,0.05); }
  .action-btn.yellow-accent { border-color: rgba(250,204,21,0.3); background: rgba(250,204,21,0.05); }
  .action-icon {
    font-size: 36px;
    line-height: 1;
  }
  .action-label {
    font-size: 14px;
    font-weight: 800;
    color: var(--text);
    line-height: 1.2;
  }
  .action-sub {
    font-size: 11px;
    color: var(--muted);
    font-weight: 600;
  }
  .action-status {
    position: absolute;
    top: 10px; right: 10px;
    width: 10px; height: 10px;
    border-radius: 50%;
  }
  .action-status.done { background: var(--green); box-shadow: 0 0 6px var(--green); }
  .action-status.pending { background: var(--orange); box-shadow: 0 0 6px var(--orange); }
  .action-status.none { background: var(--surface2); }

  /* Wide single button */
  .big-btn {
    width: 100%;
    border: none;
    border-radius: var(--radius);
    padding: 20px;
    font-family: var(--font);
    font-size: 17px;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    margin-bottom: 12px;
    transition: transform 0.1s, opacity 0.15s;
    -webkit-tap-highlight-color: transparent;
    letter-spacing: 0.3px;
  }
  .big-btn:active { transform: scale(0.98); }
  .big-btn.primary { background: linear-gradient(135deg, var(--orange), var(--orange-dark)); color: #fff; box-shadow: 0 8px 24px rgba(255,107,26,0.3); }
  .big-btn.success { background: linear-gradient(135deg, var(--green), #16A34A); color: #fff; box-shadow: 0 8px 24px rgba(34,197,94,0.25); }
  .big-btn.danger { background: linear-gradient(135deg, var(--red), #DC2626); color: #fff; box-shadow: 0 8px 24px rgba(239,68,68,0.25); }
  .big-btn.secondary { background: var(--surface2); color: var(--text); border: 1.5px solid var(--border); box-shadow: none; }
  .big-btn.disabled { background: var(--surface2); color: var(--muted); cursor: default; box-shadow: none; }
  .big-btn-icon { font-size: 22px; }

  /* Status pill */
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 800;
  }
  .pill-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .pill.green { background: rgba(34,197,94,0.12); color: var(--green); }
  .pill.green .pill-dot { background: var(--green); }
  .pill.orange { background: var(--orange-glow); color: var(--orange); }
  .pill.orange .pill-dot { background: var(--orange); }
  .pill.red { background: rgba(239,68,68,0.12); color: var(--red); }
  .pill.red .pill-dot { background: var(--red); }
  .pill.muted { background: var(--surface2); color: var(--muted); }
  .pill.muted .pill-dot { background: var(--muted); }

  /* Info card */
  .info-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 18px;
    margin-bottom: 12px;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }
  .info-row:last-child { border-bottom: none; }
  .info-key { font-size: 13px; color: var(--muted); font-weight: 600; }
  .info-val { font-size: 14px; color: var(--text); font-weight: 800; text-align: right; }
  .info-val.orange { color: var(--orange); }
  .info-val.green { color: var(--green); }
  .info-val.red { color: var(--red); }

  /* ── SAFETY SCREEN ── */
  .safety-scroll {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    max-height: 220px;
    overflow-y: auto;
    margin-bottom: 16px;
    font-size: 13px;
    color: #B0B5C4;
    line-height: 1.75;
  }
  .safety-scroll::-webkit-scrollbar { width: 3px; }
  .safety-scroll::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 4px; }
  .safety-scroll strong { color: var(--text); display: block; margin-bottom: 2px; margin-top: 10px; font-size: 14px; }
  .safety-scroll strong:first-child { margin-top: 0; }

  .check-row {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .check-row.checked { border-color: var(--green); background: rgba(34,197,94,0.06); }
  .check-box {
    width: 28px; height: 28px;
    border-radius: 8px;
    border: 2.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    transition: all 0.15s;
    background: var(--surface2);
  }
  .check-box.checked { background: var(--green); border-color: var(--green); }
  .check-text { font-size: 14px; font-weight: 700; color: var(--text); line-height: 1.3; }
  .check-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* Sign pad mock */
  .sign-area {
    background: var(--surface2);
    border: 2px dashed var(--border);
    border-radius: 14px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    font-size: 13px;
    color: var(--muted);
    font-weight: 600;
    flex-direction: column;
    gap: 6px;
  }
  .sign-area.signed { border-color: var(--green); border-style: solid; background: rgba(34,197,94,0.05); }

  /* ── GPS SCREEN ── */
  .map-mock {
    background: #0D1117;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    height: 200px;
    position: relative;
    overflow: hidden;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .map-grid-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,107,26,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,26,0.06) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .map-pulse-ring {
    width: 100px; height: 100px;
    border-radius: 50%;
    border: 2px solid rgba(255,107,26,0.25);
    position: absolute;
    animation: mapPulse 2s infinite;
  }
  .map-pulse-ring2 {
    width: 60px; height: 60px;
    border-radius: 50%;
    border: 2px solid rgba(255,107,26,0.15);
    position: absolute;
    animation: mapPulse 2s infinite 0.5s;
  }
  @keyframes mapPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.5; }
  }
  .map-pin {
    width: 20px; height: 20px;
    background: var(--orange);
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 0 0 6px rgba(255,107,26,0.25);
    z-index: 2;
    position: relative;
    animation: pinPulse 2s infinite;
  }
  @keyframes pinPulse {
    0%, 100% { box-shadow: 0 0 0 4px rgba(255,107,26,0.25); }
    50% { box-shadow: 0 0 0 10px rgba(255,107,26,0.05); }
  }
  .map-badge {
    position: absolute;
    top: 10px; left: 10px;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 11px;
    font-weight: 700;
    color: var(--orange);
  }
  .map-coords {
    position: absolute;
    bottom: 10px; right: 10px;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    border-radius: 8px;
    padding: 4px 8px;
    font-size: 10px;
    color: var(--muted);
    font-family: monospace;
  }
  .inside-badge {
    position: absolute;
    top: 10px; right: 10px;
    background: rgba(34,197,94,0.15);
    border: 1px solid var(--green);
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 700;
    color: var(--green);
  }

  /* Clock display */
  .clock-display {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    text-align: center;
    margin-bottom: 14px;
  }
  .clock-time {
    font-size: 48px;
    font-weight: 900;
    color: var(--text);
    letter-spacing: -1px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .clock-date { font-size: 13px; color: var(--muted); font-weight: 600; }

  /* ── PROGRESS SCREEN ── */
  .photo-upload {
    background: var(--surface);
    border: 2px dashed rgba(255,107,26,0.3);
    border-radius: var(--radius);
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    margin-bottom: 14px;
    transition: border-color 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .photo-upload.has-photo { border-color: var(--green); border-style: solid; background: rgba(34,197,94,0.04); }
  .photo-upload-icon { font-size: 40px; }
  .photo-upload-label { font-size: 14px; font-weight: 700; color: var(--muted); }
  .photo-upload-sub { font-size: 12px; color: var(--muted); opacity: 0.6; }
  .photo-thumbs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
  .photo-thumb {
    width: 68px; height: 68px;
    border-radius: 10px;
    background: var(--surface2);
    border: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    position: relative;
    overflow: hidden;
  }
  .photo-thumb .remove {
    position: absolute; top: 2px; right: 2px;
    width: 18px; height: 18px;
    background: var(--red);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px;
    color: #fff;
    cursor: pointer;
  }

  .pct-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 14px;
  }
  .pct-btn {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 14px 6px;
    text-align: center;
    cursor: pointer;
    font-family: var(--font);
    font-size: 16px;
    font-weight: 900;
    color: var(--muted);
    transition: all 0.15s;
    -webkit-tap-highlight-color: transparent;
  }
  .pct-btn:active { transform: scale(0.95); }
  .pct-btn.selected { background: var(--orange-glow); border-color: var(--orange); color: var(--orange); }
  .pct-sub { font-size: 10px; font-weight: 600; margin-top: 2px; opacity: 0.6; }

  .note-input {
    width: 100%;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 14px 16px;
    font-family: var(--font);
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    outline: none;
    resize: none;
    margin-bottom: 14px;
    min-height: 80px;
    transition: border-color 0.15s;
  }
  .note-input::placeholder { color: var(--muted); }
  .note-input:focus { border-color: rgba(255,107,26,0.4); }

  /* ── ATTENDANCE SCREEN ── */
  .month-strip {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 16px;
    -webkit-overflow-scrolling: touch;
  }
  .month-strip::-webkit-scrollbar { display: none; }
  .day-chip {
    flex-shrink: 0;
    width: 44px;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 8px 4px;
    text-align: center;
    cursor: pointer;
  }
  .day-chip.present { border-color: rgba(34,197,94,0.4); background: rgba(34,197,94,0.07); }
  .day-chip.absent { border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.05); }
  .day-chip.today { border-color: var(--orange); background: var(--orange-glow); }
  .day-num { font-size: 16px; font-weight: 900; color: var(--text); }
  .day-label { font-size: 10px; font-weight: 700; color: var(--muted); margin-top: 1px; }
  .day-dot { width: 6px; height: 6px; border-radius: 50%; margin: 4px auto 0; }
  .day-dot.green { background: var(--green); }
  .day-dot.red { background: var(--red); }
  .day-dot.orange { background: var(--orange); }
  .day-dot.none { background: transparent; }

  .att-stat-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .att-stat {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 14px 10px;
    text-align: center;
  }
  .att-stat-num { font-size: 28px; font-weight: 900; line-height: 1; margin-bottom: 4px; }
  .att-stat-label { font-size: 11px; color: var(--muted); font-weight: 700; }

  /* ── SALARY SCREEN ── */
  .salary-hero {
    background: linear-gradient(135deg, #1A2A1A, #162216);
    border: 1.5px solid rgba(34,197,94,0.2);
    border-radius: var(--radius);
    padding: 24px 20px;
    text-align: center;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  .salary-hero::before {
    content: '💰';
    position: absolute;
    top: -10px; right: -10px;
    font-size: 80px;
    opacity: 0.06;
  }
  .salary-month { font-size: 12px; color: rgba(34,197,94,0.7); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .salary-amount { font-size: 44px; font-weight: 900; color: var(--green); line-height: 1; margin-bottom: 6px; }
  .salary-sub { font-size: 13px; color: var(--muted); font-weight: 600; }

  .salary-row {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    margin-bottom: 10px;
  }
  .salary-row-inner {
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .salary-row-label { font-size: 14px; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 8px; }
  .salary-row-val { font-size: 16px; font-weight: 900; color: var(--green); }
  .salary-row-val.deduct { color: var(--red); }
  .salary-row-val.muted { color: var(--muted); }
  .salary-divider { height: 1px; background: var(--border); margin: 0 16px; }

  /* ── BOTTOM NAV ── */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 420px;
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 8px 4px 16px;
    display: flex;
    z-index: 100;
  }
  .nav-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 6px 4px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    border-radius: 10px;
    transition: background 0.15s;
  }
  .nav-tab:active { background: var(--surface2); }
  .nav-tab-icon { font-size: 22px; line-height: 1; }
  .nav-tab-label { font-size: 10px; font-weight: 700; color: var(--muted); }
  .nav-tab.active .nav-tab-label { color: var(--orange); }
  .nav-tab.active .nav-tab-icon { filter: brightness(1.2); }
  .nav-indicator {
    width: 20px; height: 3px;
    border-radius: 2px;
    background: var(--orange);
    margin-bottom: -2px;
    opacity: 0;
  }
  .nav-tab.active .nav-indicator { opacity: 1; }

  /* Toasty */
  .toast {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #1F2127;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    white-space: nowrap;
    z-index: 999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: toastIn 0.25s ease;
  }
  .toast.success { border-color: rgba(34,197,94,0.3); color: var(--green); }
  .toast.error { border-color: rgba(239,68,68,0.3); color: var(--red); }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* Misc */
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .text-center { text-align: center; }
  .success-lottie { font-size: 64px; text-align: center; margin: 20px 0; animation: popIn 0.4s ease; }
  @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .big-success-msg { font-size: 22px; font-weight: 900; color: var(--green); text-align: center; margin-bottom: 8px; }
  .big-success-sub { font-size: 14px; color: var(--muted); text-align: center; }
`;

// ── Data ──────────────────────────────────────────

// 👇 員工帳號資料庫 — 老闆可以自行修改姓名、號碼、PIN、日薪
const EMPLOYEE_DB = [
  { id: 1, name: "陳偉明", role: "技術主管", phone: "91234567", pin: "1234", site: "觀塘工業大廈 A座", rate: 1200, color: "#FF6B1A", presentDays: 22, salaryHistory: [
    { month: "2025年7月", amount: 26400, days: 22, status: "pending" },
    { month: "2025年6月", amount: 24000, days: 20, status: "paid" },
    { month: "2025年5月", amount: 25200, days: 21, status: "paid" },
  ]},
  { id: 2, name: "李志強", role: "電梯技工", phone: "92345678", pin: "2345", site: "觀塘工業大廈 A座", rate: 850, color: "#22C55E", presentDays: 20, salaryHistory: [
    { month: "2025年7月", amount: 17000, days: 20, status: "pending" },
    { month: "2025年6月", amount: 15300, days: 18, status: "paid" },
    { month: "2025年5月", amount: 16150, days: 19, status: "paid" },
  ]},
  { id: 3, name: "黃國輝", role: "電梯技工", phone: "93456789", pin: "3456", site: "旺角商業中心", rate: 850, color: "#60A5FA", presentDays: 18, salaryHistory: [
    { month: "2025年7月", amount: 15300, days: 18, status: "pending" },
    { month: "2025年6月", amount: 14450, days: 17, status: "paid" },
    { month: "2025年5月", amount: 15300, days: 18, status: "paid" },
  ]},
  { id: 4, name: "張建文", role: "助理技工", phone: "94567890", pin: "4567", site: "荃灣住宅項目 B棟", rate: 650, color: "#A78BFA", presentDays: 21, salaryHistory: [
    { month: "2025年7月", amount: 13650, days: 21, status: "pending" },
    { month: "2025年6月", amount: 13000, days: 20, status: "paid" },
    { month: "2025年5月", amount: 12350, days: 19, status: "paid" },
  ]},
  { id: 5, name: "吳志偉", role: "助理技工", phone: "95678901", pin: "5678", site: "沙田新城市廣場", rate: 650, color: "#FB923C", presentDays: 19, salaryHistory: [
    { month: "2025年7月", amount: 12350, days: 19, status: "pending" },
    { month: "2025年6月", amount: 13000, days: 20, status: "paid" },
    { month: "2025年5月", amount: 12350, days: 19, status: "paid" },
  ]},
];

const genAttendance = (presentDays) => {
  const days = [];
  let present = 0;
  for (let i = 1; i <= 31; i++) {
    let status;
    if (i > 15) status = "future";
    else if (i === 15) { status = "today"; present++; }
    else { status = present < presentDays - 1 && Math.random() > 0.15 ? "present" : "absent"; if (status === "present") present++; }
    days.push({ day: i, label: ["日","一","二","三","四","五","六"][(i + 2) % 7], status });
  }
  return days;
};

// ── Login Screen ───────────────────────────────────
function LoginScreen({ onLogin, error, setError }) {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [step, setStep] = useState("phone"); // "phone" | "pin"
  const [foundEmp, setFoundEmp] = useState(null);

  const handlePhoneNext = () => {
    const emp = EMPLOYEE_DB.find(e => e.phone === phone.replace(/\s/g, ""));
    if (!emp) { setError("找不到此手機號碼，請聯絡老闆"); return; }
    setFoundEmp(emp);
    setError("");
    setStep("pin");
  };

  const handlePinLogin = () => {
    if (pin === foundEmp.pin) {
      setError("");
      onLogin(foundEmp);
    } else {
      setError("PIN 碼錯誤，請重試");
      setPin("");
    }
  };

  const handlePinKey = (key) => {
    if (key === "DEL") { setPin(p => p.slice(0, -1)); return; }
    if (pin.length >= 4) return;
    const newPin = pin + key;
    setPin(newPin);
    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === foundEmp.pin) { setError(""); onLogin(foundEmp); }
        else { setError("PIN 碼錯誤，請重試"); setPin(""); }
      }, 200);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
      {/* Logo */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, var(--orange), var(--orange-d))", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 14px", boxShadow: "0 8px 32px rgba(255,107,26,0.35)" }}>🏗️</div>
        <div style={{ fontFamily: "var(--font)", fontWeight: 900, fontSize: 22, color: "var(--text)", marginBottom: 4 }}>電梯工程</div>
        <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>員工工作平台</div>
      </div>

      <div style={{ width: "100%", maxWidth: 360 }}>
        {step === "phone" ? (
          <>
            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", marginBottom: 6, textAlign: "center" }}>輸入你的手機號碼</div>
            <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", marginBottom: 28 }}>用返登記的香港號碼</div>

            <div style={{ background: "var(--surface)", border: `1.5px solid ${error ? "var(--red)" : "var(--border)"}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>📱</span>
              <input
                type="tel"
                placeholder="例如：91234567"
                value={phone}
                onChange={e => { setPhone(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handlePhoneNext()}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 18, fontFamily: "var(--font)", fontWeight: 700, color: "var(--text)", letterSpacing: 2 }}
                autoFocus
              />
            </div>

            {error && <div style={{ fontSize: 13, color: "var(--red)", textAlign: "center", marginBottom: 12 }}>⚠️ {error}</div>}

            <button onClick={handlePhoneNext} style={{ width: "100%", background: "linear-gradient(135deg, var(--orange), var(--orange-d))", border: "none", borderRadius: 14, padding: "18px", fontSize: 17, fontWeight: 900, color: "#fff", cursor: "pointer", fontFamily: "var(--font)", boxShadow: "0 8px 24px rgba(255,107,26,0.3)" }}>
              下一步 →
            </button>

            {/* Demo hint */}
            <div style={{ marginTop: 28, background: "rgba(255,107,26,0.06)", border: "1px solid rgba(255,107,26,0.15)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--orange)", marginBottom: 8 }}>👷 測試帳號（Demo）</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {EMPLOYEE_DB.map(e => (
                  <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
                    <span style={{ cursor: "pointer", color: "var(--sub)" }} onClick={() => setPhone(e.phone)}>{e.name} — {e.phone}</span>
                    <span style={{ color: "var(--muted)" }}>PIN: {e.pin}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Found employee */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: foundEmp.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 auto 12px", boxShadow: `0 6px 20px ${foundEmp.color}55` }}>
                {foundEmp.name[0]}
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)" }}>你好，{foundEmp.name} 👋</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{foundEmp.role} · 輸入 4 位 PIN 碼</div>
            </div>

            {/* PIN dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 8 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: i < pin.length ? "var(--orange)" : "var(--surface2)", border: `2px solid ${i < pin.length ? "var(--orange)" : "var(--border)"}`, transition: "all 0.15s", transform: i < pin.length ? "scale(1.2)" : "scale(1)" }} />
              ))}
            </div>
            {error && <div style={{ fontSize: 13, color: "var(--red)", textAlign: "center", marginBottom: 8 }}>⚠️ {error}</div>}

            {/* Number pad */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 20 }}>
              {["1","2","3","4","5","6","7","8","9","","0","DEL"].map((k, i) => (
                <button key={i} onClick={() => k && handlePinKey(k)}
                  style={{ height: 64, borderRadius: 14, border: "1.5px solid var(--border)", background: k === "DEL" ? "rgba(239,68,68,0.1)" : k === "" ? "transparent" : "var(--surface)", fontSize: k === "DEL" ? 18 : 24, fontWeight: 900, color: k === "DEL" ? "var(--red)" : "var(--text)", cursor: k ? "pointer" : "default", fontFamily: "var(--font)", transition: "transform 0.1s, background 0.1s", visibility: k === "" ? "hidden" : "visible" }}
                  onMouseDown={e => e.currentTarget.style.transform = "scale(0.94)"}
                  onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {k === "DEL" ? "⌫" : k}
                </button>
              ))}
            </div>

            <button onClick={() => { setStep("phone"); setPin(""); setError(""); setFoundEmp(null); }}
              style={{ width: "100%", background: "transparent", border: "none", color: "var(--muted)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 16, padding: "10px", fontFamily: "var(--font)" }}>
              ← 返回更改號碼
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const handleLogin = (emp) => setCurrentUser(emp);
  const handleLogout = () => { setCurrentUser(null); setLoginError(""); };

  if (!currentUser) {
    return (
      <>
        <style>{S}</style>
        <LoginScreen onLogin={handleLogin} error={loginError} setError={setLoginError} />
      </>
    );
  }

  return <MainApp user={currentUser} onLogout={handleLogout} />;
}

function MainApp({ user, onLogout }) {
  const EMPLOYEE = user;
  const ATTENDANCE_DATA = genAttendance(user.presentDays);
  const SALARY_HISTORY = user.salaryHistory;

  const [screen, setScreen] = useState("home");
  const [toast, setToast] = useState(null);

  // Safety state
  const [safetyChecks, setSafetyChecks] = useState([false, false, false]);
  const [signed, setSigned] = useState(false);
  const [signedTime, setSignedTime] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");

  // Attendance state
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [clockTick, setClockTick] = useState(new Date());
  const [isInZone, setIsInZone] = useState(true); // GPS zone status
  const [gpsWatching, setGpsWatching] = useState(false);
  const [autoCheckoutTime] = useState("19:00"); // auto checkout at 7pm
  const AUTO_CHECKOUT_HOUR = 19;
  const AUTO_CHECKOUT_MIN = 0;
  const SITE_LAT = 22.3193;
  const SITE_LNG = 114.1694;
  const ZONE_RADIUS = 150; // metres

  // Progress state
  const [selectedPct, setSelectedPct] = useState(null);
  const [note, setNote] = useState("");
  const [photos, setPhotos] = useState([]);
  const [progressSubmitted, setProgressSubmitted] = useState(false);

  // Salary view
  const [salaryMonth, setSalaryMonth] = useState(0);

  // Haversine distance formula (metres)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  useEffect(() => {
    const t = setInterval(() => setClockTick(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Auto-checkout at set time if not signed out
  useEffect(() => {
    if (!checkedIn || checkedOut) return;
    const now = clockTick;
    const h = now.getHours();
    const m = now.getMinutes();
    if (h === AUTO_CHECKOUT_HOUR && m === AUTO_CHECKOUT_MIN) {
      const t = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
      setCheckedOut(true);
      setCheckOutTime(t + " （系統自動）");
      showToast("🕖 已自動簽退（" + t + "）");
    }
  }, [clockTick, checkedIn, checkedOut]);

  // Real-time GPS zone detection when app is open
  useEffect(() => {
    if (!checkedIn || checkedOut) return;
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const dist = getDistance(pos.coords.latitude, pos.coords.longitude, SITE_LAT, SITE_LNG);
        const inZone = dist <= ZONE_RADIUS;
        setIsInZone(inZone);
        setGpsWatching(true);

        // Auto sign out when leaving zone
        if (!inZone && checkedIn && !checkedOut) {
          const now = new Date();
          const t = now.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
          setCheckedOut(true);
          setCheckOutTime(t + " （GPS 自動）");
          showToast("📍 已離開工地範圍，系統自動簽退");
        }
      },
      (err) => { setGpsWatching(false); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [checkedIn, checkedOut]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const timeStr = clockTick.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = clockTick.toLocaleDateString("zh-HK", { month: "long", day: "numeric", weekday: "short" });

  const presentDays = ATTENDANCE_DATA.filter(d => d.status === "present" || d.status === "today").length;
  const absentDays = ATTENDANCE_DATA.filter(d => d.status === "absent").length;

  const NAV = [
    { id: "home", icon: "🏠", label: "主頁" },
    { id: "safety", icon: "🛡️", label: "安全" },
    { id: "gps", icon: "📍", label: "簽到" },
    { id: "progress", icon: "📷", label: "進度" },
    { id: "salary", icon: "💰", label: "薪酬" },
  ];

  // ── Screens ────────────────────────────────────

  const HomeScreen = () => (
    <>
      <div className="today-card">
        <div className="today-label">今日工地</div>
        <div className="today-site">{EMPLOYEE.site}</div>
        <div className="today-chips">
          <span className="today-chip">📅 {new Date().toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="today-chip">☀️ 晴，31°C</span>
        </div>
      </div>

      <div className="section-label">今日任務</div>
      <div className="action-grid">
        <div className="action-btn orange-accent" onClick={() => setScreen("safety")}>
          <div className="action-status" style={{ background: signed ? "#22C55E" : "#FF6B1A", boxShadow: signed ? "0 0 6px #22C55E" : "0 0 6px #FF6B1A" }} />
          <div className="action-icon">🛡️</div>
          <div className="action-label">安全條款簽署</div>
          <div className="action-sub">{signed ? "✓ 已完成" : "待簽署"}</div>
        </div>
        <div className="action-btn green-accent" onClick={() => setScreen("gps")}>
          <div className="action-status" style={{ background: checkedIn ? "#22C55E" : "#FF6B1A", boxShadow: checkedIn ? "0 0 6px #22C55E" : "0 0 6px #FF6B1A" }} />
          <div className="action-icon">📍</div>
          <div className="action-label">GPS 簽到</div>
          <div className="action-sub">{checkedIn ? `✓ ${checkInTime}` : "未簽到"}</div>
        </div>
        <div className="action-btn blue-accent" onClick={() => setScreen("progress")}>
          <div className="action-status" style={{ background: progressSubmitted ? "#22C55E" : "#6B7180", boxShadow: progressSubmitted ? "0 0 6px #22C55E" : "none" }} />
          <div className="action-icon">📷</div>
          <div className="action-label">上傳進度</div>
          <div className="action-sub">{progressSubmitted ? `✓ ${selectedPct}% 已提交` : "未提交"}</div>
        </div>
        <div className="action-btn yellow-accent" onClick={() => setScreen("salary")}>
          <div className="action-status none" />
          <div className="action-icon">💰</div>
          <div className="action-label">我的薪酬</div>
          <div className="action-sub">本月 HK$26,400</div>
        </div>
      </div>

      <div className="section-label">今日狀態</div>
      <div className="info-card">
        <div className="info-row">
          <span className="info-key">安全條款</span>
          <span className={`info-val ${signed ? "green" : "orange"}`}>{signed ? "✅ 已簽署" : "⏳ 待完成"}</span>
        </div>
        <div className="info-row">
          <span className="info-key">簽到時間</span>
          <span className={`info-val ${checkedIn ? "green" : "orange"}`}>{checkedIn ? checkInTime : "未簽到"}</span>
        </div>
        <div className="info-row">
          <span className="info-key">簽退時間</span>
          <span className={`info-val ${checkedOut ? "green" : "muted"}`}>{checkedOut ? checkOutTime : "–"}</span>
        </div>
        <div className="info-row">
          <span className="info-key">今日進度回報</span>
          <span className={`info-val ${progressSubmitted ? "green" : "muted"}`}>{progressSubmitted ? `${selectedPct}%` : "未提交"}</span>
        </div>
        <div className="info-row">
          <span className="info-key">本月出勤</span>
          <span className="info-val orange">{presentDays} 天</span>
        </div>
      </div>
    </>
  );

  const SafetyScreen = () => {
    const allChecked = safetyChecks.every(Boolean);
    const canSign = allChecked && selectedProject !== "";

    const handleSign = () => {
      if (!canSign) return;
      const t = clockTick.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
      setSigned(true);
      setSignedTime(t);
      showToast("✅ 安全守則簽署完成！");
    };

    const PROJECTS_LIST = [
      "觀塘工業大廈 - A座",
      "旺角商業中心 - 電梯升級",
      "荃灣住宅項目 - B棟",
      "沙田新城市廣場",
      "屯門商場翻新",
    ];

    return (
      <>
        {/* Step 1: Select Project */}
        <div className="section-label">第一步 — 選擇今日工程</div>
        {!signed ? (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PROJECTS_LIST.map((p, i) => (
                <div key={i}
                  onClick={() => setSelectedProject(p)}
                  style={{
                    background: selectedProject === p ? "var(--orange-glow)" : "var(--surface)",
                    border: `1.5px solid ${selectedProject === p ? "var(--orange)" : "var(--border)"}`,
                    borderRadius: 14, padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 12,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    border: `2.5px solid ${selectedProject === p ? "var(--orange)" : "var(--border)"}`,
                    background: selectedProject === p ? "var(--orange)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.15s",
                  }}>
                    {selectedProject === p && <span style={{ fontSize: 12, color: "#fff", fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: selectedProject === p ? "var(--orange)" : "var(--text)" }}>
                    🏗️ {p}
                  </span>
                </div>
              ))}
            </div>
            {selectedProject === "" && (
              <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 8 }}>
                ⚠️ 請先選擇今日工程先可簽署
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: "var(--orange-glow)", border: "1.5px solid var(--orange)", borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🏗️</span>
            <div>
              <div style={{ fontSize: 11, color: "var(--orange)", fontWeight: 700, marginBottom: 2 }}>今日工程</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>{selectedProject}</div>
            </div>
          </div>
        )}

        {/* Step 2: Read & Sign */}
        <div className="section-label">第二步 — 閱讀並簽署安全守則</div>
        <div className="safety-scroll">
          <strong>第一條 — 個人防護裝備</strong>
          所有進入施工現場人員必須全程佩戴安全帽、安全鞋及反光背心。電梯槽內作業必須配備安全繩及防墜落裝置。
          <strong>第二條 — 電源管制</strong>
          進行任何電氣工程前，必須確認主電源已切斷並上鎖（LOTO程序），並在配電箱貼上警告標示。
          <strong>第三條 — 高空作業</strong>
          超過2米高度作業必須使用獲認可之升降台或搭棚架，不得單人作業，必須保持通話聯絡。
          <strong>第四條 — 危險品存放</strong>
          潤滑油、清潔劑等危險品須存放於指定區域，遠離熱源，確保通風良好。
          <strong>第五條 — 緊急應變</strong>
          熟悉緊急撤離路線及急救箱位置。發生意外須即時通報主管並填寫事故報告表。
        </div>

        {[
          { label: "我已閱讀並明白所有安全守則", sub: "需閱讀完整內容" },
          { label: "我確認今日佩戴所有個人防護裝備", sub: "安全帽、安全鞋、反光背心" },
          { label: "我明白違規後果及緊急撤離程序", sub: "如有疑問請聯絡主管" },
        ].map((item, i) => (
          <div key={i}
            className={`check-row ${safetyChecks[i] ? "checked" : ""}`}
            onClick={() => {
              if (signed) return;
              const n = [...safetyChecks]; n[i] = !n[i]; setSafetyChecks(n);
            }}>
            <div className={`check-box ${safetyChecks[i] ? "checked" : ""}`}>{safetyChecks[i] ? "✓" : ""}</div>
            <div>
              <div className="check-text">{item.label}</div>
              <div className="check-sub">{item.sub}</div>
            </div>
          </div>
        ))}

        {signed ? (
          <div className="sign-area signed">
            <div style={{ fontSize: 28 }}>✅</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>已於 {signedTime} 完成簽署</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>工程：{selectedProject}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>時間戳記已記錄至系統</div>
          </div>
        ) : (
          <>
            <div className="sign-area" style={{ opacity: canSign ? 1 : 0.5 }}>
              <div style={{ fontSize: 28 }}>✍️</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                {!selectedProject ? "請先選擇工程" : !allChecked ? "請勾選所有確認項目" : "點擊下方按鈕確認簽署"}
              </div>
            </div>
            <button
              className={`big-btn ${canSign ? "success" : "disabled"}`}
              onClick={handleSign}
            >
              <span className="big-btn-icon">✍️</span>
              確認簽署安全守則
            </button>
          </>
        )}
      </>
    );
  };

  const GpsScreen = () => {
    const handleCheckIn = () => {
      const t = clockTick.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
      setCheckedIn(true);
      setCheckInTime(t);
      showToast("📍 簽到成功！");
    };
    const handleCheckOut = () => {
      const t = clockTick.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" });
      setCheckedOut(true);
      setCheckOutTime(t);
      showToast("👋 簽退完成！");
    };

    return (
      <>
        <div className="clock-display">
          <div className="clock-time">{timeStr}</div>
          <div className="clock-date">{dateStr}</div>
        </div>

        <div className="map-mock">
          <div className="map-grid-lines" />
          <div className="map-pulse-ring" />
          <div className="map-pulse-ring2" />
          <div className="map-pin" style={{ background: isInZone ? "var(--orange)" : "var(--red)" }} />
          <div className="map-badge">📍 {EMPLOYEE.site}</div>
          <div className="map-coords">22.3193°N 114.1694°E</div>
          <div className="inside-badge" style={{ background: isInZone ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", borderColor: isInZone ? "var(--green)" : "var(--red)", color: isInZone ? "var(--green)" : "var(--red)" }}>
            {isInZone ? "✓ 範圍內" : "✗ 範圍外"}
          </div>
        </div>

        {/* GPS zone warning */}
        {checkedIn && !checkedOut && !isInZone && gpsWatching && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.3)", borderRadius: 14, padding: "12px 16px", marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "var(--red)" }}>已離開工地範圍！</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>系統將自動記錄簽退時間</div>
            </div>
          </div>
        )}

        <div className="info-card" style={{ marginBottom: 14 }}>
          <div className="info-row">
            <span className="info-key">定位狀態</span>
            <span className={`pill ${gpsWatching ? "green" : "orange"}`}>
              <span className="pill-dot" />{gpsWatching ? "GPS 監測中" : "模擬定位"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-key">工地範圍</span>
            <span className={`info-val ${isInZone ? "green" : "red"}`}>
              {isInZone ? "✅ 範圍內（150米）" : "❌ 已離開範圍"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-key">今日簽到</span>
            <span className={`info-val ${checkedIn ? "green" : "orange"}`}>{checkedIn ? checkInTime : "未簽到"}</span>
          </div>
          <div className="info-row">
            <span className="info-key">今日簽退</span>
            <span className={`info-val ${checkedOut ? "green" : "muted"}`}>{checkedOut ? checkOutTime : "–"}</span>
          </div>
          <div className="info-row" style={{ borderBottom: "none" }}>
            <span className="info-key">🕖 自動簽退時間</span>
            <span className="info-val" style={{ color: "var(--blue)" }}>{autoCheckoutTime}</span>
          </div>
        </div>

        {/* Auto-checkout notice */}
        {checkedIn && !checkedOut && (
          <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "var(--muted)", display: "flex", gap: 8 }}>
            <span>💡</span>
            <span>App 開住時，離開工地 150 米範圍會自動簽退。如 App 關閉，系統將於 {autoCheckoutTime} 自動記錄簽退。</span>
          </div>
        )}

        {!checkedIn ? (
          <button className="big-btn primary" onClick={handleCheckIn}>
            <span className="big-btn-icon">📍</span>
            立即簽到
          </button>
        ) : !checkedOut ? (
          <>
            <div className="info-card" style={{ marginBottom: 12, textAlign: "center", background: "rgba(34,197,94,0.06)", borderColor: "rgba(34,197,94,0.2)" }}>
              <div style={{ fontSize: 14, color: "var(--green)", fontWeight: 700, padding: "4px 0" }}>✅ 已於 {checkInTime} 成功簽到</div>
            </div>
            <button className="big-btn danger" onClick={handleCheckOut}>
              <span className="big-btn-icon">👋</span>
              下班簽退
            </button>
          </>
        ) : (
          <div className="info-card" style={{ textAlign: "center", background: "rgba(34,197,94,0.06)", borderColor: "rgba(34,197,94,0.2)" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--green)", marginBottom: 4 }}>今日考勤完成</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>簽到 {checkInTime}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>簽退 {checkOutTime}</div>
          </div>
        )}
      </>
    );
  };

  const ProgressScreen = () => {
    const [stageDesc, setStageDesc] = useState("");

    const selectStage = (p, desc) => {
      setSelectedPct(p);
      setStageDesc(desc);
      setNote(desc);
    };

    const handleAddPhoto = () => {
      if (photos.length >= 5) return;
      const emojis = ["🏗️","🔧","⚙️","🔩","🪛"];
      setPhotos([...photos, emojis[photos.length % emojis.length]]);
      showToast("📷 照片已加入");
    };

    const handleSubmit = () => {
      if (!selectedPct) return;
      setProgressSubmitted(true);
      showToast(`📊 進度 ${selectedPct}% 已提交！`);
    };

    if (progressSubmitted) {
      return (
        <div style={{ padding: "20px 0" }}>
          <div className="success-lottie">✅</div>
          <div className="big-success-msg">進度回報成功！</div>
          <div className="big-success-sub">已提交：{selectedPct}% 完成</div>
          <div className="big-success-sub" style={{ marginTop: 4, marginBottom: 24 }}>{clockTick.toLocaleString("zh-HK")}</div>
          <button className="big-btn secondary" onClick={() => { setProgressSubmitted(false); setSelectedPct(null); setNote(""); setPhotos([]); }}>
            提交另一個回報
          </button>
        </div>
      );
    }

    const STAGE_GROUPS = [
      {
        label: "🆕 新裝",
        color: "var(--orange)",
        stages: [
          { p: 20, desc: "已進場開工及提交秤線表" },
          { p: 50, desc: "已完成外門框、門頭、地砵，已完成主副路軌安裝及調校" },
          { p: 80, desc: "已完成機房及井道全面安裝，已拆棚交較車行慢車" },
          { p: 95, desc: "已完成 EMSD 驗機，已完成保養部驗收手尾" },
          { p: 100, desc: "已完成客戶交機時安裝手尾" },
        ]
      },
      {
        label: "🔄 舊裝翻新",
        color: "var(--blue)",
        stages: [
          { p: 30, desc: "已完成拆除機房物料，已完成拆除井道物料（不包括外門、外門框及外門地砵），已提供升降機/自動梯工作日誌，已提供廢料回收紙回條" },
          { p: 65, desc: "已提交秤線表，已完成機房及井道全面安裝，已完成外門框、門頭、地砵、外門，已完成主副路軌安裝及調校，已交較車行快車，已提供升降機/自動梯工作日誌，已提供廢料回收紙回條" },
          { p: 100, desc: "已完成 EMSD 驗機，已完成保養部驗收手尾，已完成客戶交機時安裝手尾，EMSD 發出准用証六個月內" },
        ]
      },
      {
        label: "🏥 特殊工程（多期）",
        color: "var(--purple, #a78bfa)",
        stages: [
          { p: 20, desc: "進場開工，提交秤線表，完成初期外門框、門頭、地砵，完成初期主副路軌安裝及調校" },
          { p: 45, desc: "完成機房及井道全面安裝，協助快車慢車調試，完成 EMSD 驗機" },
          { p: 70, desc: "完成第二期安裝及升機，協助快車慢車調試，完成 EMSD 驗機" },
          { p: 95, desc: "完成第三期安裝及升機，協助快車慢車調試，完成 EMSD 驗機" },
          { p: 100, desc: "完成拆卸及清理" },
        ]
      },
    ];

    return (
      <>
        <div className="section-label">拍攝現場照片</div>
        <div className={`photo-upload ${photos.length > 0 ? "has-photo" : ""}`} onClick={handleAddPhoto}>
          {photos.length === 0 ? (
            <>
              <div className="photo-upload-icon">📷</div>
              <div className="photo-upload-label">點擊拍照 / 上傳</div>
              <div className="photo-upload-sub">最多 5 張</div>
            </>
          ) : (
            <>
              <div className="photo-upload-icon">➕</div>
              <div className="photo-upload-label">加入更多照片 ({photos.length}/5)</div>
            </>
          )}
        </div>
        {photos.length > 0 && (
          <div className="photo-thumbs" style={{ marginBottom: 16 }}>
            {photos.map((p, i) => (
              <div key={i} className="photo-thumb">
                {p}
                <div className="remove" onClick={(e) => { e.stopPropagation(); setPhotos(photos.filter((_, idx) => idx !== i)); }}>✕</div>
              </div>
            ))}
          </div>
        )}

        <div className="section-label">選擇完工節點</div>
        {STAGE_GROUPS.map((grp, gi) => (
          <div key={gi} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: grp.color, letterSpacing: 1, marginBottom: 8 }}>{grp.label}</div>
            {grp.stages.map(({ p, desc }) => (
              <div key={p}
                onClick={() => selectStage(p, desc)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "12px 14px", marginBottom: 8, borderRadius: 12,
                  background: selectedPct === p ? "rgba(255,107,26,0.08)" : "var(--surface)",
                  border: `1.5px solid ${selectedPct === p ? "var(--orange)" : "var(--border)"}`,
                  cursor: "pointer", transition: "all 0.15s",
                }}>
                <div style={{
                  fontFamily: "var(--font)", fontSize: 20, fontWeight: 900,
                  color: selectedPct === p ? "var(--orange)" : "var(--muted)",
                  minWidth: 44, flexShrink: 0, lineHeight: 1.4
                }}>{p}%</div>
                <div style={{ fontSize: 12, color: selectedPct === p ? "var(--text)" : "var(--muted)", lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        ))}

        {selectedPct && (
          <>
            <div className="section-label">備注（可修改）</div>
            <textarea
              className="note-input"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="節點內容已自動填入，可補充現場情況..."
            />
            {note === stageDesc && (
              <div style={{ fontSize: 11, color: "var(--green)", marginTop: -10, marginBottom: 12 }}>✅ 已自動帶入節點內容</div>
            )}
          </>
        )}

        <button
          className={`big-btn ${selectedPct ? "primary" : "disabled"}`}
          onClick={handleSubmit}
        >
          <span className="big-btn-icon">📤</span>
          提交今日進度回報
        </button>
      </>
    );
  };

  const AttendanceScreen = () => (
    <>
      <div className="att-stat-row">
        <div className="att-stat">
          <div className="att-stat-num" style={{ color: "var(--green)" }}>{presentDays}</div>
          <div className="att-stat-label">出勤天數</div>
        </div>
        <div className="att-stat">
          <div className="att-stat-num" style={{ color: "var(--red)" }}>{absentDays}</div>
          <div className="att-stat-label">缺勤天數</div>
        </div>
        <div className="att-stat">
          <div className="att-stat-num" style={{ color: "var(--orange)" }}>
            {Math.round((presentDays / 15) * 100)}%
          </div>
          <div className="att-stat-label">出勤率</div>
        </div>
      </div>

      <div className="section-label">7月出勤記錄</div>
      <div className="month-strip">
        {ATTENDANCE_DATA.filter(d => d.status !== "future").map((d, i) => (
          <div key={i} className={`day-chip ${d.status}`}>
            <div className="day-label">{d.label}</div>
            <div className="day-num">{d.day}</div>
            <div className={`day-dot ${d.status === "present" || d.status === "today" ? "green" : d.status === "absent" ? "red" : "none"}`} />
          </div>
        ))}
      </div>

      <div className="section-label">最近出勤記錄</div>
      <div className="info-card">
        {[
          { date: `${new Date().toLocaleDateString("zh-HK", { month: "long", day: "numeric" })}（今日）`, in: checkedIn ? checkInTime : "–", out: checkedOut ? checkOutTime : "–", status: checkedIn ? "present" : "pending" },
          { date: "7月14日（昨日）", in: "07:58", out: "17:45", status: "present" },
          { date: "7月13日（週日）", in: "–", out: "–", status: "absent" },
          { date: "7月12日（週六）", in: "08:10", out: "17:30", status: "present" },
          { date: "7月11日（週五）", in: "08:05", out: "17:50", status: "present" },
        ].map((r, i) => (
          <div key={i} className="info-row">
            <div>
              <div className="info-key" style={{ color: i === 0 ? "var(--text)" : "var(--muted)", fontWeight: i === 0 ? 700 : 600 }}>{r.date}</div>
              {r.status !== "absent" && r.in !== "–" && (
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                  簽到 {r.in} · 簽退 {r.out !== "–" ? r.out : "未簽退"}
                </div>
              )}
            </div>
            <span className={`pill ${r.status === "present" ? "green" : r.status === "pending" ? "orange" : "red"}`}>
              <span className="pill-dot" />
              {r.status === "present" ? "出勤" : r.status === "pending" ? "進行中" : "缺勤"}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  const SalaryScreen = () => {
    const cur = SALARY_HISTORY[salaryMonth];
    const grossSalary = cur.days * EMPLOYEE.rate;

    // MPF calculation (Hong Kong)
    // Employee contribution: 5% of relevant income, capped at HK$1,500/month
    // Relevant income: monthly equivalent (days * rate), capped at HK$30,000
    // Exempt if monthly equivalent < HK$7,100
    const monthlyEquiv = EMPLOYEE.rate * 26; // approximate monthly based on daily rate
    const isExempt = monthlyEquiv < 7100;
    const relevantIncome = Math.min(monthlyEquiv, 30000);
    const empMpfMonthly = isExempt ? 0 : Math.min(relevantIncome * 0.05, 1500);
    const empMpfAmount = Math.round(empMpfMonthly); // employee's own MPF contribution
    const erMpfAmount = empMpfAmount; // employer contributes same amount
    const netTakeHome = cur.amount - empMpfAmount;

    return (
      <>
        <div className="salary-hero">
          <div className="salary-month">{cur.month} 薪酬</div>
          <div className="salary-amount">HK${netTakeHome.toLocaleString()}</div>
          <div className="salary-sub">
            {cur.status === "paid" ? "✅ 已發放（扣除 MPF 後到手）" : "⏳ 待發放（月底結算）"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {SALARY_HISTORY.map((s, i) => (
            <button key={i}
              className={`big-btn ${salaryMonth === i ? "primary" : "secondary"}`}
              style={{ flex: 1, padding: "10px 6px", fontSize: 12, marginBottom: 0 }}
              onClick={() => setSalaryMonth(i)}>
              {s.month.replace("2025年","")}
            </button>
          ))}
        </div>

        <div className="section-label">薪酬明細</div>
        <div className="salary-row">
          <div className="salary-row-inner">
            <span className="salary-row-label">👷 職位</span>
            <span className="salary-row-val muted">{EMPLOYEE.role}</span>
          </div>
          <div className="salary-divider" />
          <div className="salary-row-inner">
            <span className="salary-row-label">📅 出勤天數</span>
            <span className="salary-row-val">{cur.days} 天</span>
          </div>
          <div className="salary-divider" />
          <div className="salary-row-inner">
            <span className="salary-row-label">💵 日薪</span>
            <span className="salary-row-val">HK${EMPLOYEE.rate}</span>
          </div>
          <div className="salary-divider" />
          <div className="salary-row-inner">
            <span className="salary-row-label">🧮 基本薪酬</span>
            <span className="salary-row-val">HK${cur.amount.toLocaleString()}</span>
          </div>
          <div className="salary-divider" />
          <div className="salary-row-inner">
            <span className="salary-row-label">🏦 MPF 員工供款</span>
            <span className="salary-row-val deduct">
              {isExempt ? "豁免（月薪低於$7,100）" : `-HK$${empMpfAmount.toLocaleString()}`}
            </span>
          </div>
        </div>

        <div className="salary-row" style={{ background: "rgba(34,197,94,0.05)", borderColor: "rgba(34,197,94,0.2)" }}>
          <div className="salary-row-inner">
            <span className="salary-row-label" style={{ fontSize: 16 }}>💰 實際到手</span>
            <span className="salary-row-val" style={{ fontSize: 22 }}>HK${netTakeHome.toLocaleString()}</span>
          </div>
        </div>

        {/* MPF Info Box */}
        <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 14, padding: "14px 16px", marginTop: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--blue)", marginBottom: 10 }}>🏦 MPF 供款詳情</div>
          <div className="info-row" style={{ padding: "6px 0" }}>
            <span className="info-key">你的供款（員工）</span>
            <span style={{ fontFamily: "var(--font)", fontWeight: 700, color: "var(--red)", fontSize: 14 }}>
              {isExempt ? "豁免" : `-HK$${empMpfAmount.toLocaleString()}/月`}
            </span>
          </div>
          <div className="info-row" style={{ padding: "6px 0" }}>
            <span className="info-key">僱主供款</span>
            <span style={{ fontFamily: "var(--font)", fontWeight: 700, color: "var(--green)", fontSize: 14 }}>
              {isExempt ? "豁免" : `+HK$${erMpfAmount.toLocaleString()}/月`}
            </span>
          </div>
          <div className="info-row" style={{ padding: "6px 0", borderBottom: "none" }}>
            <span className="info-key">MPF 戶口每月增加</span>
            <span style={{ fontFamily: "var(--font)", fontWeight: 700, color: "var(--blue)", fontSize: 14 }}>
              {isExempt ? "豁免" : `HK$${(empMpfAmount + erMpfAmount).toLocaleString()}/月`}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8, lineHeight: 1.6 }}>
            💡 MPF 係你的退休儲蓄，僱主供款部分係額外福利，唔係從你薪酬扣除。
          </div>
        </div>

        <div className="divider" />
        <div className="section-label">發薪記錄</div>
        {SALARY_HISTORY.map((s, i) => {
          const mpf = isExempt ? 0 : empMpfAmount;
          const takeHome = s.amount - mpf;
          return (
            <div key={i} className="info-card" style={{ marginBottom: 10 }}>
              <div className="info-row" style={{ padding: "8px 0" }}>
                <div>
                  <div className="info-val" style={{ fontSize: 14, textAlign: "left" }}>{s.month}</div>
                  <div className="info-key" style={{ marginTop: 2 }}>
                    {s.days} 天 × HK${EMPLOYEE.rate} — MPF HK${mpf}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="info-val green" style={{ marginBottom: 4 }}>HK${takeHome.toLocaleString()}</div>
                  <span className={`pill ${s.status === "paid" ? "green" : "orange"}`} style={{ fontSize: 11 }}>
                    <span className="pill-dot" />
                    {s.status === "paid" ? "已發放" : "待發放"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const screens = { home: HomeScreen, safety: SafetyScreen, gps: GpsScreen, progress: ProgressScreen, salary: SalaryScreen };
  const SCREEN_LABELS = { home: "主頁", safety: "安全守則簽署", gps: "GPS 考勤", progress: "施工進度回報", salary: "我的薪酬" };
  const ActiveScreen = screens[screen];

  return (
    <>
      <style>{S}</style>
      <div className="phone-wrap">
        {/* Status bar */}        <div className="statusbar">
          <div className="statusbar-time">{clockTick.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" })}</div>
          <div className="statusbar-icons">
            <span>📶</span><span>🔋</span>
          </div>
        </div>

        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-inner">
            {screen !== "home" ? (
              <div className="back-btn" onClick={() => setScreen("home")}>←</div>
            ) : (
              <div style={{ width: 40 }} />
            )}
            <div className="page-label">{SCREEN_LABELS[screen]}</div>
            {/* Logout button */}
            <div onClick={onLogout}
              style={{ width: 40, height: 40, borderRadius: 12, background: "var(--surface2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}
              title="登出">
              🚪
            </div>
          </div>
          {screen === "home" && (
            <div className="greet-bar" style={{ margin: "14px -20px -16px", padding: "14px 20px 16px" }}>
              <div className="avatar-lg" style={{ background: EMPLOYEE.color }}>{EMPLOYEE.name[0]}</div>
              <div className="greet-text">
                <div className="greet-name">早晨，{EMPLOYEE.name} 👋</div>
                <div className="greet-sub">{EMPLOYEE.role} · 電梯工程</div>
              </div>
              <div className="greet-badge">7月</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="content">
          <ActiveScreen />
        </div>

        {/* Bottom Nav */}
        <div className="bottom-nav">
          {NAV.map(n => (
            <div key={n.id} className={`nav-tab ${screen === n.id ? "active" : ""}`} onClick={() => setScreen(n.id)}>
              <div className="nav-indicator" />
              <div className="nav-tab-icon">{n.icon}</div>
              <div className="nav-tab-label">{n.label}</div>
            </div>
          ))}
        </div>

        {/* Toast */}
        {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      </div>
    </>
  );
}
