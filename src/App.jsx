import React, { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   判頭 App — 深藍 + 金色專業風格
   功能：登入、工程列表、進度回報、收款確認、文件上傳
───────────────────────────────────────────── */

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #D4A843;
    --gold-d: #B8922E;
    --gold-glow: rgba(212,168,67,0.15);
    --bg: #0D1117;
    --surface: #161B22;
    --surface2: #1C2128;
    --border: rgba(255,255,255,0.08);
    --text: #E6EDF3;
    --muted: #7D8590;
    --green: #3FB950;
    --red: #F85149;
    --blue: #58A6FF;
    --orange: #FF8C00;
    --r: 16px;
    --font: 'Nunito', sans-serif;
  }
  body, #root {
    background: var(--bg);
    font-family: var(--font);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }
  .phone-wrap {
    width: 100%;
    max-width: 420px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }
  .statusbar {
    background: var(--surface);
    padding: 10px 20px 8px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .statusbar-time { color: var(--text); font-size: 14px; }
  .topbar {
    background: var(--surface);
    padding: 14px 20px;
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
    font-size: 18px; cursor: pointer; color: var(--text);
    -webkit-tap-highlight-color: transparent;
  }
  .page-label {
    font-size: 17px; font-weight: 800;
    color: var(--text); text-align: center; flex: 1;
  }
  .greet-bar {
    background: linear-gradient(135deg, #161B22, #1C2128);
    padding: 14px 20px;
    display: flex; align-items: center; gap: 14px;
    border-bottom: 1px solid var(--border);
    margin-top: 14px;
  }
  .avatar-lg {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-d));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 900; color: #fff; flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(212,168,67,0.35);
  }
  .greet-badge {
    margin-left: auto;
    background: var(--gold-glow);
    border: 1px solid var(--gold);
    border-radius: 20px; padding: 5px 12px;
    font-size: 12px; font-weight: 700; color: var(--gold);
  }
  .content {
    flex: 1; overflow-y: auto;
    padding: 20px 16px 100px;
    -webkit-overflow-scrolling: touch;
  }
  .content::-webkit-scrollbar { display: none; }

  /* Cards */
  .card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--r);
    margin-bottom: 12px;
    overflow: hidden;
  }
  .card-body { padding: 16px; }
  .section-label {
    font-size: 11px; font-weight: 800;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 12px;
  }

  /* Project card */
  .project-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--r);
    padding: 16px; margin-bottom: 12px;
    cursor: pointer;
    transition: border-color 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .project-card:active { transform: scale(0.98); }
  .project-card.active-border { border-color: rgba(212,168,67,0.4); }
  .project-name { font-size: 15px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
  .project-meta { font-size: 12px; color: var(--muted); margin-bottom: 12px; }
  .project-value {
    font-family: var(--font); font-size: 20px; font-weight: 900;
    color: var(--gold);
  }
  .progress-bar-bg { background: var(--surface2); border-radius: 6px; height: 8px; overflow: hidden; }
  .progress-bar-fill { height: 100%; border-radius: 6px; background: linear-gradient(90deg, var(--gold), var(--gold-d)); transition: width 0.5s; }

  /* Pill / Badge */
  .pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 12px; border-radius: 30px;
    font-size: 12px; font-weight: 700;
  }
  .pill-dot { width: 7px; height: 7px; border-radius: 50%; }
  .pill.green { background: rgba(63,185,80,0.12); color: var(--green); }
  .pill.green .pill-dot { background: var(--green); }
  .pill.gold { background: var(--gold-glow); color: var(--gold); }
  .pill.gold .pill-dot { background: var(--gold); }
  .pill.red { background: rgba(248,81,73,0.12); color: var(--red); }
  .pill.red .pill-dot { background: var(--red); }
  .pill.blue { background: rgba(88,166,255,0.12); color: var(--blue); }
  .pill.blue .pill-dot { background: var(--blue); }

  /* Info rows */
  .info-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0; border-bottom: 1px solid var(--border);
  }
  .info-row:last-child { border-bottom: none; }
  .info-key { font-size: 13px; color: var(--muted); font-weight: 600; }
  .info-val { font-size: 14px; font-weight: 800; color: var(--text); text-align: right; }
  .info-val.gold { color: var(--gold); }
  .info-val.green { color: var(--green); }
  .info-val.red { color: var(--red); }

  /* Big buttons */
  .big-btn {
    width: 100%; border: none; border-radius: var(--r);
    padding: 18px; font-family: var(--font); font-size: 16px; font-weight: 900;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    cursor: pointer; margin-bottom: 12px; transition: transform 0.1s;
    -webkit-tap-highlight-color: transparent; letter-spacing: 0.3px;
  }
  .big-btn:active { transform: scale(0.98); }
  .big-btn.primary { background: linear-gradient(135deg, var(--gold), var(--gold-d)); color: #fff; box-shadow: 0 8px 24px rgba(212,168,67,0.3); }
  .big-btn.success { background: linear-gradient(135deg, var(--green), #2EA043); color: #fff; box-shadow: 0 8px 24px rgba(63,185,80,0.25); }
  .big-btn.secondary { background: var(--surface2); color: var(--text); border: 1.5px solid var(--border); box-shadow: none; }
  .big-btn.disabled { background: var(--surface2); color: var(--muted); cursor: default; }
  .big-btn-icon { font-size: 20px; }

  /* Stage nodes */
  .stage-node {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 14px; border-radius: 12px; margin-bottom: 8px;
    cursor: pointer; transition: all 0.15s;
    border: 1.5px solid var(--border);
    background: var(--surface2);
    -webkit-tap-highlight-color: transparent;
  }
  .stage-node.selected {
    background: var(--gold-glow);
    border-color: rgba(212,168,67,0.5);
  }
  .stage-pct {
    font-family: var(--font); font-size: 20px; font-weight: 900;
    min-width: 44px; flex-shrink: 0; line-height: 1.4;
  }
  .stage-desc { font-size: 12px; line-height: 1.65; }

  /* File upload */
  .file-upload {
    background: var(--surface2);
    border: 2px dashed rgba(212,168,67,0.3);
    border-radius: var(--r); padding: 20px;
    text-align: center; cursor: pointer;
    margin-bottom: 12px; transition: border-color 0.15s;
  }
  .file-upload.has-file { border-color: var(--green); border-style: solid; background: rgba(63,185,80,0.04); }
  .file-upload-icon { font-size: 36px; margin-bottom: 8px; }
  .file-upload-label { font-size: 14px; font-weight: 700; color: var(--muted); }
  .file-upload-sub { font-size: 11px; color: var(--muted); opacity: 0.6; margin-top: 4px; }

  /* Note input */
  .note-input {
    width: 100%; background: var(--surface2);
    border: 1.5px solid var(--border); border-radius: 12px;
    padding: 12px 14px; font-family: var(--font); font-size: 14px;
    font-weight: 600; color: var(--text); outline: none;
    resize: none; margin-bottom: 12px; min-height: 80px;
    transition: border-color 0.15s;
  }
  .note-input:focus { border-color: rgba(212,168,67,0.4); }
  .note-input::placeholder { color: var(--muted); }

  /* Payment card */
  .payment-hero {
    background: linear-gradient(135deg, #1A2420, #162216);
    border: 1.5px solid rgba(63,185,80,0.2);
    border-radius: var(--r); padding: 22px; text-align: center;
    margin-bottom: 14px; position: relative; overflow: hidden;
  }
  .payment-hero::before {
    content: '💰'; position: absolute;
    top: -10px; right: -10px;
    font-size: 80px; opacity: 0.06;
  }
  .payment-label { font-size: 12px; color: rgba(63,185,80,0.7); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .payment-amount { font-size: 40px; font-weight: 900; color: var(--green); line-height: 1; margin-bottom: 6px; }
  .payment-sub { font-size: 13px; color: var(--muted); }

  /* Confirm receipt */
  .confirm-box {
    background: rgba(212,168,67,0.06);
    border: 1.5px solid rgba(212,168,67,0.2);
    border-radius: var(--r); padding: 16px; margin-bottom: 12px;
  }

  /* Bottom nav */
  .bottom-nav {
    position: fixed; bottom: 0;
    width: 100%; max-width: 420px;
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 8px 4px 16px;
    display: flex; z-index: 100;
  }
  .nav-tab {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 3px; padding: 6px 4px;
    cursor: pointer; -webkit-tap-highlight-color: transparent;
    border-radius: 10px; transition: background 0.15s;
  }
  .nav-tab:active { background: var(--surface2); }
  .nav-tab-icon { font-size: 22px; line-height: 1; }
  .nav-tab-label { font-size: 10px; font-weight: 700; color: var(--muted); }
  .nav-tab.active .nav-tab-label { color: var(--gold); }
  .nav-indicator {
    width: 20px; height: 3px; border-radius: 2px;
    background: var(--gold); margin-bottom: -2px; opacity: 0;
  }
  .nav-tab.active .nav-indicator { opacity: 1; }

  /* Toast */
  .toast {
    position: fixed; bottom: 80px; left: 50%;
    transform: translateX(-50%);
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.1);
    border-left: 3px solid var(--gold);
    border-radius: 50px; padding: 12px 20px;
    font-size: 14px; font-weight: 700; color: var(--text);
    white-space: nowrap; z-index: 999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: toastIn 0.25s ease;
  }
  .toast.success { border-left-color: var(--green); color: var(--green); }
  .toast.error { border-left-color: var(--red); color: var(--red); }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* Login */
  .login-wrap { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 20px; background: var(--bg); }
  .pin-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--border); background: transparent; transition: all 0.15s; }
  .pin-dot.filled { background: var(--gold); border-color: var(--gold); transform: scale(1.15); }
  .numpad-btn {
    height: 62px; border-radius: 14px;
    border: 1.5px solid var(--border); background: var(--surface);
    font-size: 24px; font-weight: 900; color: var(--text);
    cursor: pointer; font-family: var(--font);
    transition: transform 0.1s, background 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .numpad-btn:active { transform: scale(0.94); background: var(--surface2); }

  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .success-big { font-size: 56px; text-align: center; margin: 24px 0; animation: popIn 0.4s ease; }
  @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

// ── Contractor Database ───────────────────────────────────────────────────────
// 👇 老闆可以修改：判頭帳號、負責工程、收款記錄
const CONTRACTOR_DB = [
  {
    id: 1, name: "王大明", company: "大明機電工程", phone: "96111111", pin: "1111",
    color: "#D4A843",
    projects: [
      {
        id: "P001", cfNum: "CF00207", name: "EC-474 啟德SOGO A座", client: "啟德發展有限公司",
        contractValue: 137250, progress: 50, phase: "active",
        payments: [
          { stage: "20% 進場開工", amount: 27450, status: "paid", paidDate: "2025-05-10" },
          { stage: "50% 路軌完成", amount: 68625, status: "pending", paidDate: null },
          { stage: "80% 全面安裝", amount: 27450, status: "pending", paidDate: null },
          { stage: "95% EMSD驗機", amount: 6863, status: "pending", paidDate: null },
          { stage: "100% 客戶交機", amount: 6862, status: "pending", paidDate: null },
        ]
      },
      {
        id: "P002", cfNum: "CF00281", name: "EC-550 荃灣天橋𨋢 NF343 L1", client: "香港政府",
        contractValue: 43000, progress: 20, phase: "active",
        payments: [
          { stage: "20% 進場開工", amount: 8600, status: "paid", paidDate: "2025-06-01" },
          { stage: "50% 路軌完成", amount: 21500, status: "pending", paidDate: null },
          { stage: "80% 全面安裝", amount: 8600, status: "pending", paidDate: null },
          { stage: "95% EMSD驗機", amount: 2150, status: "pending", paidDate: null },
          { stage: "100% 客戶交機", amount: 2150, status: "pending", paidDate: null },
        ]
      },
    ],
    documents: { safety: null, license: null }
  },
  {
    id: 2, name: "李工頭", company: "工頭機電", phone: "96222222", pin: "2222",
    color: "#58A6FF",
    projects: [
      {
        id: "P003", cfNum: "CF00459", name: "EC-459 瑪麗醫院 L3號機", client: "瑪麗醫院",
        contractValue: 180000, progress: 80, phase: "active",
        payments: [
          { stage: "20% 進場開工", amount: 36000, status: "paid", paidDate: "2025-03-15" },
          { stage: "50% 路軌完成", amount: 90000, status: "paid", paidDate: "2025-05-20" },
          { stage: "80% 全面安裝", amount: 36000, status: "pending", paidDate: null },
          { stage: "95% EMSD驗機", amount: 9000, status: "pending", paidDate: null },
          { stage: "100% 客戶交機", amount: 9000, status: "pending", paidDate: null },
        ]
      },
    ],
    documents: { safety: "安全協議_李工頭_2025.pdf", license: "牌照_李工頭.pdf" }
  },
];

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState("phone");
  const [foundContractor, setFoundContractor] = useState(null);
  const [error, setError] = useState("");

  const handlePhoneNext = () => {
    const c = CONTRACTOR_DB.find(c => c.phone === phone.replace(/\s/g, ""));
    if (!c) { setError("找不到此手機號碼，請聯絡老闆"); return; }
    setFoundContractor(c); setError(""); setStep("pin");
  };

  const handlePinKey = (key) => {
    if (key === "DEL") { setPin(p => p.slice(0, -1)); return; }
    if (pin.length >= 4) return;
    const newPin = pin + key;
    setPin(newPin);
    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === foundContractor.pin) { onLogin(foundContractor); }
        else { setError("PIN 碼錯誤，請重試"); setPin(""); }
      }, 200);
    }
  };

  return (
    <div className="login-wrap">
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, var(--gold), var(--gold-d))", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 14px", boxShadow: "0 8px 32px rgba(212,168,67,0.35)" }}>🔧</div>
        <div style={{ fontFamily: "var(--font)", fontWeight: 900, fontSize: 22, color: "var(--text)", marginBottom: 4 }}>電梯工程</div>
        <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>判頭工程平台</div>
      </div>

      <div style={{ width: "100%", maxWidth: 360 }}>
        {step === "phone" ? (
          <>
            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)", marginBottom: 6, textAlign: "center" }}>輸入手機號碼</div>
            <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", marginBottom: 24 }}>用登記的香港號碼</div>
            <div style={{ background: "var(--surface)", border: `1.5px solid ${error ? "var(--red)" : "var(--border)"}`, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>📱</span>
              <input type="tel" placeholder="例如：96111111" value={phone}
                onChange={e => { setPhone(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handlePhoneNext()}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 18, fontFamily: "var(--font)", fontWeight: 700, color: "var(--text)", letterSpacing: 2 }}
                autoFocus />
            </div>
            {error && <div style={{ fontSize: 13, color: "var(--red)", textAlign: "center", marginBottom: 12 }}>⚠️ {error}</div>}
            <button onClick={handlePhoneNext} style={{ width: "100%", background: "linear-gradient(135deg, var(--gold), var(--gold-d))", border: "none", borderRadius: 14, padding: "18px", fontSize: 17, fontWeight: 900, color: "#fff", cursor: "pointer", fontFamily: "var(--font)", boxShadow: "0 8px 24px rgba(212,168,67,0.3)" }}>
              下一步 →
            </button>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ width: 58, height: 58, borderRadius: "50%", background: foundContractor.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 auto 12px", boxShadow: `0 6px 20px ${foundContractor.color}55` }}>
                {foundContractor.name[0]}
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)" }}>你好，{foundContractor.name} 👋</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{foundContractor.company}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 12 }}>
              {[0,1,2,3].map(i => (
                <div key={i} className={`pin-dot ${i < pin.length ? "filled" : ""}`} />
              ))}
            </div>
            {error && <div style={{ fontSize: 13, color: "var(--red)", textAlign: "center", marginBottom: 8 }}>⚠️ {error}</div>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 20 }}>
              {["1","2","3","4","5","6","7","8","9","","0","DEL"].map((k, i) => (
                <button key={i} className="numpad-btn"
                  onClick={() => k && handlePinKey(k)}
                  style={{ visibility: k === "" ? "hidden" : "visible", color: k === "DEL" ? "var(--red)" : "var(--text)", fontSize: k === "DEL" ? 18 : 24 }}>
                  {k === "DEL" ? "⌫" : k}
                </button>
              ))}
            </div>
            <button onClick={() => { setStep("phone"); setPin(""); setError(""); }} style={{ width: "100%", background: "transparent", border: "none", color: "var(--muted)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 16, padding: 10, fontFamily: "var(--font)" }}>
              ← 返回更改號碼
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <><style>{S}</style><LoginScreen onLogin={setUser} /></>;
  return <MainApp user={user} onLogout={() => setUser(null)} />;
}

function MainApp({ user, onLogout }) {
  const [screen, setScreen] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [contractorData, setContractorData] = useState(user);
  const [clockTick, setClockTick] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setClockTick(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const NAV = [
    { id: "home", icon: "🏠", label: "主頁" },
    { id: "projects", icon: "🏗️", label: "我的工程" },
    { id: "payments", icon: "💰", label: "收款" },
    { id: "docs", icon: "📄", label: "文件" },
  ];

  const SCREEN_LABELS = {
    home: "主頁", projects: "我的工程",
    payments: "收款記錄", docs: "文件上傳",
    project_detail: "工程詳情", progress_submit: "提交進度",
  };

  // ── Home Screen ──
  const HomeScreen = () => {
    const totalValue = contractorData.projects.reduce((a, p) => a + p.contractValue, 0);
    const pendingPayments = contractorData.projects.reduce((a, p) =>
      a + p.payments.filter(pay => pay.status === "pending").reduce((b, pay) => b + pay.amount, 0), 0);
    const today = clockTick.toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric" });

    return (
      <>
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-d))", borderRadius: 16, padding: 20, marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 4, fontWeight: 700 }}>📅 {today}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{contractorData.company}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{contractorData.name} · {contractorData.projects.length} 個工程</div>
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { label: "工程合約總額", value: `HK$${(totalValue/10000).toFixed(0)}萬`, icon: "💼", color: "var(--gold)" },
            { label: "待收款項", value: `HK$${Math.round(pendingPayments/1000)}K`, icon: "⏳", color: "var(--orange)" },
            { label: "進行中工程", value: `${contractorData.projects.filter(p => p.phase === "active").length} 個`, icon: "🏗️", color: "var(--blue)" },
            { label: "文件狀態", value: contractorData.documents.safety ? "✅ 齊全" : "⚠️ 待上傳", icon: "📄", color: contractorData.documents.safety ? "var(--green)" : "var(--red)" },
          ].map((k, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{k.icon}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{k.label}</div>
              <div style={{ fontFamily: "var(--font)", fontSize: 18, fontWeight: 900, color: k.color }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="section-label">快速操作</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { icon: "📊", label: "提交進度", sub: "上傳今日工程", action: () => setScreen("projects") },
            { icon: "💰", label: "確認收款", sub: "查看待收款項", action: () => setScreen("payments") },
            { icon: "📄", label: "上傳文件", sub: "安全協議 / 牌照", action: () => setScreen("docs") },
            { icon: "🏗️", label: "我的工程", sub: `${contractorData.projects.length} 個進行中`, action: () => setScreen("projects") },
          ].map((btn, i) => (
            <div key={i} onClick={btn.action} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "18px 14px", cursor: "pointer", textAlign: "center", transition: "transform 0.1s" }}
              onTouchStart={e => e.currentTarget.style.transform = "scale(0.96)"}
              onTouchEnd={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{btn.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>{btn.label}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{btn.sub}</div>
            </div>
          ))}
        </div>

        {/* Pending payments alert */}
        {pendingPayments > 0 && (
          <div style={{ background: "rgba(212,168,67,0.06)", border: "1.5px solid rgba(212,168,67,0.2)", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 24 }}>💰</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--gold)" }}>待收款項提醒</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>你有 HK${Math.round(pendingPayments).toLocaleString()} 待確認收款</div>
            </div>
            <div onClick={() => setScreen("payments")} style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", cursor: "pointer" }}>查看 →</div>
          </div>
        )}
      </>
    );
  };

  // ── Projects Screen ──
  const ProjectsScreen = () => (
    <>
      <div className="section-label">我負責的工程（{contractorData.projects.length} 個）</div>
      {contractorData.projects.map(p => (
        <div key={p.id} className="project-card active-border" onClick={() => { setSelectedProject(p); setScreen("project_detail"); }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700, marginBottom: 3 }}>{p.cfNum}</div>
              <div className="project-name">{p.name}</div>
              <div className="project-meta">👤 {p.client}</div>
            </div>
            <span className={`pill ${p.phase === "active" ? "gold" : "green"}`}>
              <span className="pill-dot" />{p.phase === "active" ? "進行中" : "已完成"}
            </span>
          </div>
          <div className="project-value" style={{ marginBottom: 10 }}>HK${p.contractValue.toLocaleString()}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "var(--muted)" }}>
            <span>進度 {p.progress}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="big-btn primary" style={{ marginBottom: 0, flex: 1, padding: "10px" }}
              onClick={e => { e.stopPropagation(); setSelectedProject(p); setScreen("progress_submit"); }}>
              📊 提交進度
            </button>
          </div>
        </div>
      ))}
    </>
  );

  // ── Project Detail Screen ──
  const ProjectDetailScreen = () => {
    if (!selectedProject) return null;
    const p = selectedProject;
    const paidTotal = p.payments.filter(pay => pay.status === "paid").reduce((a, pay) => a + pay.amount, 0);
    const pendingTotal = p.payments.filter(pay => pay.status === "pending").reduce((a, pay) => a + pay.amount, 0);

    return (
      <>
        <div style={{ background: "var(--surface)", border: "1.5px solid rgba(212,168,67,0.2)", borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700, marginBottom: 4 }}>{p.cfNum}</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "var(--text)", marginBottom: 4 }}>{p.name}</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>👤 {p.client}</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>合約金額</div>
              <div style={{ fontFamily: "var(--font)", fontSize: 20, fontWeight: 900, color: "var(--gold)" }}>HK${p.contractValue.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>已收款</div>
              <div style={{ fontFamily: "var(--font)", fontSize: 20, fontWeight: 900, color: "var(--green)" }}>HK${paidTotal.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>待收款</div>
              <div style={{ fontFamily: "var(--font)", fontSize: 20, fontWeight: 900, color: "var(--orange)" }}>HK${pendingTotal.toLocaleString()}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "var(--muted)" }}>
            <span>施工進度 {p.progress}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
          </div>
        </div>

        <div className="section-label">請款節點明細</div>
        {p.payments.map((pay, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{pay.stage}</div>
              {pay.paidDate && <div style={{ fontSize: 11, color: "var(--muted)" }}>收款日期：{pay.paidDate}</div>}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font)", fontSize: 16, fontWeight: 900, color: pay.status === "paid" ? "var(--green)" : "var(--gold)", marginBottom: 4 }}>
                HK${pay.amount.toLocaleString()}
              </div>
              <span className={`pill ${pay.status === "paid" ? "green" : "gold"}`}>
                <span className="pill-dot" />{pay.status === "paid" ? "已收" : "待收"}
              </span>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 16 }}>
          <button className="big-btn primary" onClick={() => setScreen("progress_submit")}>
            <span className="big-btn-icon">📊</span>提交進度回報
          </button>
        </div>
      </>
    );
  };

  // ── Progress Submit Screen ──
  const ProgressSubmitScreen = () => {
    const [selectedPct, setSelectedPct] = useState(null);
    const [note, setNote] = useState("");
    const [stageDesc, setStageDesc] = useState("");
    const [photos, setPhotos] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const p = selectedProject || contractorData.projects[0];

    const selectStage = (pct, desc) => {
      setSelectedPct(pct);
      setStageDesc(desc);
      setNote(desc);
    };

    const STAGES = [
      { p: 20, desc: "已進場開工及提交秤線表" },
      { p: 50, desc: "已完成外門框、門頭、地砵，已完成主副路軌安裝及調校" },
      { p: 80, desc: "已完成機房及井道全面安裝，已拆棚交較車行慢車" },
      { p: 95, desc: "已完成 EMSD 驗機，已完成保養部驗收手尾" },
      { p: 100, desc: "已完成客戶交機時安裝手尾" },
    ];

    if (submitted) return (
      <div style={{ padding: "20px 0", textAlign: "center" }}>
        <div className="success-big">✅</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "var(--green)", marginBottom: 8 }}>進度回報成功！</div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>{selectedPct}% · {clockTick.toLocaleDateString("zh-HK")}</div>
        <button className="big-btn secondary" onClick={() => { setSubmitted(false); setSelectedPct(null); setNote(""); setPhotos([]); }}>提交另一個回報</button>
      </div>
    );

    return (
      <>
        {p && (
          <div style={{ background: "var(--surface)", border: "1.5px solid rgba(212,168,67,0.2)", borderRadius: 14, padding: "12px 14px", marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700 }}>{p.cfNum}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>{p.name}</div>
          </div>
        )}

        <div className="section-label">拍攝現場照片</div>
        <div className={`file-upload ${photos.length > 0 ? "has-file" : ""}`}
          onClick={() => { if (photos.length < 5) setPhotos([...photos, ["🏗️","🔧","⚙️","🔩","🪛"][photos.length % 5]]); showToast("📷 照片已加入"); }}>
          {photos.length === 0 ? (
            <><div className="file-upload-icon">📷</div><div className="file-upload-label">點擊拍照 / 上傳</div><div className="file-upload-sub">最多 5 張</div></>
          ) : (
            <><div className="file-upload-icon">➕</div><div className="file-upload-label">加入更多 ({photos.length}/5)</div></>
          )}
        </div>
        {photos.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {photos.map((ph, i) => (
              <div key={i} style={{ width: 64, height: 64, borderRadius: 10, background: "var(--surface2)", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, position: "relative" }}>
                {ph}
                <div onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                  style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, background: "var(--red)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", cursor: "pointer" }}>✕</div>
              </div>
            ))}
          </div>
        )}

        <div className="section-label">選擇完成節點</div>
        {STAGES.map(({ p: pct, desc }) => (
          <div key={pct} className={`stage-node ${selectedPct === pct ? "selected" : ""}`} onClick={() => selectStage(pct, desc)}>
            <div className="stage-pct" style={{ color: selectedPct === pct ? "var(--gold)" : "var(--muted)" }}>{pct}%</div>
            <div className="stage-desc" style={{ color: selectedPct === pct ? "var(--text)" : "var(--muted)" }}>{desc}</div>
          </div>
        ))}

        {selectedPct && (
          <>
            <div className="section-label" style={{ marginTop: 4 }}>備注（可修改）</div>
            <textarea className="note-input" value={note} onChange={e => setNote(e.target.value)} placeholder="節點內容已自動填入，可補充現場情況..." />
            {note === stageDesc && <div style={{ fontSize: 11, color: "var(--green)", marginTop: -8, marginBottom: 12 }}>✅ 已自動帶入節點內容</div>}
          </>
        )}

        <button className={`big-btn ${selectedPct ? "primary" : "disabled"}`}
          onClick={() => { if (selectedPct) setSubmitted(true); }}>
          <span className="big-btn-icon">📤</span>提交進度回報
        </button>
      </>
    );
  };

  // ── Payments Screen ──
  const PaymentsScreen = () => {
    const [confirmed, setConfirmed] = useState({});

    const handleConfirm = (projId, payIdx) => {
      const key = `${projId}-${payIdx}`;
      setConfirmed(prev => ({ ...prev, [key]: true }));
      showToast("✅ 收款已確認並記錄！");
    };

    return (
      <>
        {contractorData.projects.map(proj => {
          const pendingPays = proj.payments.filter(pay => pay.status === "pending");
          if (pendingPays.length === 0) return null;
          return (
            <div key={proj.id} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{proj.cfNum} · {proj.name}</div>
              {proj.payments.map((pay, i) => {
                const key = `${proj.id}-${i}`;
                const isConfirmed = confirmed[key];
                return (
                  <div key={i} style={{ background: "var(--surface)", border: `1.5px solid ${pay.status === "paid" || isConfirmed ? "rgba(63,185,80,0.2)" : "var(--border)"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: pay.status === "pending" && !isConfirmed ? 12 : 0 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{pay.stage}</div>
                        {pay.paidDate && <div style={{ fontSize: 11, color: "var(--muted)" }}>收款日期：{pay.paidDate}</div>}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--font)", fontSize: 18, fontWeight: 900, color: pay.status === "paid" || isConfirmed ? "var(--green)" : "var(--gold)", marginBottom: 4 }}>
                          HK${pay.amount.toLocaleString()}
                        </div>
                        <span className={`pill ${pay.status === "paid" || isConfirmed ? "green" : "gold"}`}>
                          <span className="pill-dot" />{pay.status === "paid" || isConfirmed ? "✅ 已收" : "⏳ 待收"}
                        </span>
                      </div>
                    </div>
                    {pay.status === "pending" && !isConfirmed && (
                      <button className="big-btn success" style={{ marginBottom: 0, padding: "12px" }}
                        onClick={() => handleConfirm(proj.id, i)}>
                        <span className="big-btn-icon">✅</span>確認已收款
                      </button>
                    )}
                    {isConfirmed && (
                      <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 700, marginTop: 8 }}>
                        ✅ 已於 {new Date().toLocaleDateString("zh-HK")} 確認收款
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className="section-label">已收款記錄</div>
        {contractorData.projects.map(proj =>
          proj.payments.filter(pay => pay.status === "paid").map((pay, i) => (
            <div key={`${proj.id}-paid-${i}`} style={{ background: "var(--surface)", border: "1.5px solid rgba(63,185,80,0.15)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{proj.cfNum}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{pay.stage}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>收款：{pay.paidDate}</div>
              </div>
              <div style={{ fontFamily: "var(--font)", fontSize: 16, fontWeight: 900, color: "var(--green)" }}>
                HK${pay.amount.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </>
    );
  };

  // ── Documents Screen ──
  const DocsScreen = () => {
    const [docs, setDocs] = useState(contractorData.documents);

    const handleUpload = (type) => {
      const fileName = type === "safety"
        ? `安全協議_${contractorData.name}_${new Date().getFullYear()}.pdf`
        : `牌照_${contractorData.name}.pdf`;
      setDocs(prev => ({ ...prev, [type]: fileName }));
      showToast(`📄 ${type === "safety" ? "安全協議" : "牌照"}已上傳！`);
    };

    return (
      <>
        <div style={{ background: "rgba(88,166,255,0.06)", border: "1px solid rgba(88,166,255,0.2)", borderRadius: 12, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
          💡 <span style={{ color: "var(--blue)", fontWeight: 700 }}>機電署要求：</span>
          電梯工程必須提供已簽署的安全協議及有效牌照副本，作為法律合規文件。
        </div>

        <div className="section-label">安全協議（已簽署 PDF）</div>
        {docs.safety ? (
          <div style={{ background: "rgba(63,185,80,0.06)", border: "1.5px solid rgba(63,185,80,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>📄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)" }}>✅ 已上傳</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{docs.safety}</div>
              </div>
              <button onClick={() => setDocs(d => ({ ...d, safety: null }))}
                style={{ fontSize: 12, color: "var(--red)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font)", fontWeight: 700 }}>重新上傳</button>
            </div>
          </div>
        ) : (
          <div className="file-upload" onClick={() => handleUpload("safety")}>
            <div className="file-upload-icon">📋</div>
            <div className="file-upload-label">點擊上傳已簽安全協議 PDF</div>
            <div className="file-upload-sub">支援 PDF 格式，需有實體簽名</div>
          </div>
        )}

        <div className="section-label">判頭牌照副本</div>
        {docs.license ? (
          <div style={{ background: "rgba(63,185,80,0.06)", border: "1.5px solid rgba(63,185,80,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>🪪</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)" }}>✅ 已上傳</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{docs.license}</div>
              </div>
              <button onClick={() => setDocs(d => ({ ...d, license: null }))}
                style={{ fontSize: 12, color: "var(--red)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font)", fontWeight: 700 }}>重新上傳</button>
            </div>
          </div>
        ) : (
          <div className="file-upload" onClick={() => handleUpload("license")}>
            <div className="file-upload-icon">🪪</div>
            <div className="file-upload-label">點擊上傳判頭牌照副本</div>
            <div className="file-upload-sub">支援 PDF / JPG / PNG</div>
          </div>
        )}

        <div className="section-label">文件狀態總覽</div>
        <div className="card">
          <div className="card-body">
            {[
              { label: "安全協議", status: docs.safety ? "已上傳" : "待上傳", ok: !!docs.safety },
              { label: "判頭牌照", status: docs.license ? "已上傳" : "待上傳", ok: !!docs.license },
            ].map((item, i) => (
              <div key={i} className="info-row">
                <span className="info-key">{item.label}</span>
                <span className={`pill ${item.ok ? "green" : "red"}`}>
                  <span className="pill-dot" />{item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "rgba(248,81,73,0.06)", border: "1px solid rgba(248,81,73,0.2)", borderRadius: 12, padding: "12px 14px", marginTop: 8, fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
          ⚠️ <span style={{ color: "var(--red)", fontWeight: 700 }}>重要提醒：</span>
          文件不齊全可能影響工程進行及請款。請在開工前確保所有文件已上傳。
        </div>
      </>
    );
  };

  const screens = {
    home: HomeScreen, projects: ProjectsScreen,
    project_detail: ProjectDetailScreen, progress_submit: ProgressSubmitScreen,
    payments: PaymentsScreen, docs: DocsScreen,
  };
  const ActiveScreen = screens[screen] || HomeScreen;

  const handleBack = () => {
    if (screen === "progress_submit" || screen === "project_detail") setScreen("projects");
    else setScreen("home");
  };

  return (
    <>
      <style>{S}</style>
      <div className="phone-wrap">
        {/* Status bar */}
        <div className="statusbar">
          <div className="statusbar-time">{clockTick.toLocaleTimeString("zh-HK", { hour: "2-digit", minute: "2-digit" })}</div>
          <div style={{ display: "flex", gap: 6 }}><span>📶</span><span>🔋</span></div>
        </div>

        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-inner">
            {screen !== "home" ? (
              <div className="back-btn" onClick={handleBack}>←</div>
            ) : <div style={{ width: 40 }} />}
            <div className="page-label">{SCREEN_LABELS[screen]}</div>
            <div onClick={onLogout} style={{ width: 40, height: 40, borderRadius: 12, background: "var(--surface2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>🚪</div>
          </div>
          {screen === "home" && (
            <div className="greet-bar" style={{ margin: "14px -20px -14px" }}>
              <div className="avatar-lg" style={{ background: user.color }}>{user.name[0]}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "var(--text)" }}>你好，{user.name} 👋</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{user.company}</div>
              </div>
              <div className="greet-badge">判頭</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="content"><ActiveScreen /></div>

        {/* Bottom Nav — only for main screens */}
        {!["project_detail", "progress_submit"].includes(screen) && (
          <div className="bottom-nav">
            {NAV.map(n => (
              <div key={n.id} className={`nav-tab ${screen === n.id ? "active" : ""}`} onClick={() => setScreen(n.id)}>
                <div className="nav-indicator" />
                <div className="nav-tab-icon">{n.icon}</div>
                <div className="nav-tab-label">{n.label}</div>
              </div>
            ))}
          </div>
        )}

        {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      </div>
    </>
  );
}
