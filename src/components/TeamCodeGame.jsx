import React, { useMemo, useState, useEffect } from "react";
import "../style/TeameCodeGameStyle.css";

const TEAMS = [
const TEAMS = [
  { id: "SM102", name: "SMART MINDS", code: "9349" },
  { id: "CW203", name: "CODE WARRIORS", code: "1235" },
  { id: "LB305", name: "TEAM LADY BUG", code: "2146"}, 
  { id: "CG407", name: "CONGRUENT", code: "8141" },
  { id: "EC511", name: "EXIT CODE 2", code: "5228" },
  { id: "CC113", name: "THE CODE CREW", code: "9349"}, 
  { id: "TV217", name: "TRIOVOLT", code: "1235" },
  { id: "DC319", name: "TEAM DECODER", code: "2146" },
  { id: "RT423", name: "RISKY TEAM", code: "8141" },
  { id: "TS529", name: "TRIPLE SPARK", code: "5228" },
  { id: "CD131", name: "CODE DXD", code: "9349" },
  { id: "EA233", name: "ESCAPE ARTISTS", code: "1235"},
  { id: "BV339", name: "BOLD VISIONS", code: "2146" },
  { id: "SS439", name: "STARSHIP", code: "8141" },
  { id: "BW541", name: "BLUEWAVE CODERS", code: "5228"},
  { id: "ST143", name: "SAMURAI", code: "9349" },
  { id: "DB247", name: "DEBUGGING SQUAD", code: "1235"},
  { id: "DT351", name: "DECODE TRIO", code: "2146" },
  { id: "AE453", name: "AMC ENGINEERING", code: "8141"},
  { id: "VX557", name: "TEAM VISIONX", code: "5228" },
  { id: "GT159", name: "GOLDEN TRASH", code: "9349" },
  { id: "TT261", name: "TECH TRIO", code: "1235" },
  { id: "DS367", name: "DECODERS", code: "2146" },
  { id: "NR469", name: "NIRVANA", code: "8141" },
  { id: "HT571", name: "HUSTLERS", code: "5228" },
  { id: "SV173", name: "SAMPREETH S V", code: "9349"},
  { id: "CB279", name: "COOKIE BYTES", code: "1235" },
  { id: "OC383", name: "ONE CODE", code: "2146"},
  { id: "CB489", name: "QUANTUM MINDS", code: "8141" },
  { id: "ST102", name: "SUMITRA", code: "4510" },
  { id: "AN203", name: "ANAMIKA NANDAN", code: "8730" },
  { id: "RR305", name: "RAGUNATH REDDY", code: "9408" },
  { id: "TT107", name: "TAILA TUBA", code: "4510" },
  { id: "AR211", name: "AMUTHA R", code: "8730" },
  { id: "VK313", name: "VEENA K", code: "9408" },
  { id: "SG117", name: "SNIGDHA", code: "4510" },
  { id: "MT219", name: "MITHUNA H N", code: "8730" },
  { id: "KR323", name: "N. KAVITA REDDY", code: "9408" },
  { id: "AM129", name: "ANANDA M R", code: "4510" },
  { id: "JR231", name: "JAYAREKHA M C", code: "8730" },
  { id: "FF307", name: "FARHEEN FATHIMA", code: "9408" },
  { id: "CD141", name: "CHANDANA M C", code: "4510" },
  { id: "DY243", name: "DIVYASHREE", code: "8730" },
  { id: "PY347", name: "PRIYANKA K", code: "9408" },
  { id: "SK149", name: "SONAM KUMAR", code: "4510" },
];

];

const MAX_ATTEMPTS = 5;
const STORAGE_KEY = "teamCodeGameAttempts";
const VERIFIED_KEY = "teamCodeGameVerified";

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const show = (message, type = "info", ttl = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, ttl);
  };
  const Toasts = () => (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
  return { show, Toasts };
}

export default function TeamCodeGame() {
  const { show, Toasts } = useToasts();

  // Load attempts from localStorage
  const [attemptsByTeam, setAttemptsByTeam] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && typeof stored === "object") {
        return stored;
      }
    } catch (e) {}
    return Object.fromEntries(TEAMS.map((t) => [t.id, []]));
  });

  // Load verified teams from localStorage
  const [verifiedTeams, setVerifiedTeams] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(VERIFIED_KEY));
      return new Set(stored || []);
    } catch {
      return new Set();
    }
  });

  const [selectedTeamId, setSelectedTeamId] = useState(TEAMS[0].id);
  const [enteredTeamId, setEnteredTeamId] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const selectedTeam = useMemo(
    () => TEAMS.find((t) => t.id === selectedTeamId),
    [selectedTeamId]
  );

  const isVerified = verifiedTeams.has(selectedTeamId);
  const attemptsForTeam = attemptsByTeam[selectedTeamId] || [];
  const wrongCount = attemptsForTeam.filter((a) => !a.correct).length;
  const solved = attemptsForTeam.some((a) => a.correct);
  const remaining = Math.max(0, MAX_ATTEMPTS - wrongCount);

  const isDisabled = !isVerified || solved || remaining === 0;

  // Save attempts and verified teams to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attemptsByTeam));
  }, [attemptsByTeam]);

  useEffect(() => {
    localStorage.setItem(VERIFIED_KEY, JSON.stringify([...verifiedTeams]));
  }, [verifiedTeams]);

  const verifyTeamId = () => {
    if (enteredTeamId.trim().toUpperCase() === selectedTeam.id) {
      setVerifiedTeams((prev) => new Set([...prev, selectedTeamId]));
      show("✅ Team ID verified. You may enter the code now.", "success");
    } else {
      show("❌ Invalid team ID.", "error");
    }
  };

  const onChangeCode = (e) => {
    const raw = e.target.value || "";
    const cleaned = raw.replace(/[^0-9]/g, "").slice(0, 4);
    setCodeInput(cleaned);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    if (codeInput.length !== 4) {
      show("Code must be exactly 4 digits.", "warn");
      return;
    }

    const correct = codeInput === selectedTeam.code;

    setAttemptsByTeam((prev) => {
      const updated = {
        ...prev,
        [selectedTeamId]: [
          ...(prev[selectedTeamId] || []),
          { value: codeInput, correct, ts: Date.now() },
        ],
      };
      return updated;
    });

    if (correct) {
      show("🏆 Correct! You have completed the game!", "success");
    } else {
      const nextRemaining = remaining - 1;
      if (nextRemaining <= 0) {
        show("❌ Wrong code. No attempts left.", "error");
      } else {
        show("❌ Wrong code, try again.", "error");
      }
      setCodeInput("");
    }
  };

  useEffect(() => {
    setEnteredTeamId("");
    setCodeInput("");
  }, [selectedTeamId]);

  return (
    <div className="game-wrap">
      <h1 className="title"> InnovISE presents DecodeX 💻 </h1>
      <h4>Round-4</h4>
      <form onSubmit={onSubmit} className="panel">
        {/* Team selection */}
        <label className="label">
          Team
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
          >
            {TEAMS.map((t) => {
              const teamSolved = (attemptsByTeam[t.id] || []).some(
                (a) => a.correct
              );
              return (
                <option key={t.id} value={t.id}>
                  {t.name}
                  {teamSolved ? " 🏆" : ""}
                </option>
              );
            })}
          </select>
        </label>

        {/* Enter team ID */}
        {!isVerified && (
          <label className="label">
            Enter Team ID
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Enter 5-char ID"
                maxLength={5}
                value={enteredTeamId}
                onChange={(e) => setEnteredTeamId(e.target.value.toUpperCase())}
              />
              <button
                type="button"
                className="primary"
                onClick={verifyTeamId}
                disabled={enteredTeamId.length !== 5}
              >
                Verify
              </button>
            </div>
          </label>
        )}

        {/* Code entry after verification */}
        {isVerified && (
          <label className="label">
            Enter 4-digit code
            <input
              type="text"
              inputMode="numeric"
              placeholder="____"
              maxLength={4}
              value={codeInput}
              onChange={onChangeCode}
              disabled={isDisabled}
            />
          </label>
        )}

        <button
          type="submit"
          className="primary"
          disabled={isDisabled || codeInput.length !== 4}
        >
          Submit
        </button>

        <div className="meta">
          <span>
            Attempts left for <strong>{selectedTeam.name}</strong>:{" "}
            <strong>{remaining}</strong> / {MAX_ATTEMPTS}
          </span>
          {solved && <span className="badge success">Solved 🏆</span>}
        </div>
      </form>

      {/* Private Attempts log */}
      {isVerified && (
        <section className="logs">
          <div className="log-card">
            <header>
              <h3>{selectedTeam.name}</h3>
              <div className="status">
                <span>Left: {remaining}</span>
                {solved ? (
                  <span className="badge success">Solved 🏆</span>
                ) : (
                  <span className="badge pending">Pending</span>
                )}
              </div>
            </header>
            {attemptsForTeam.length === 0 ? (
              <p className="muted">No attempts yet.</p>
            ) : (
              <ul className="attempts">
                {attemptsForTeam
                  .slice()
                  .reverse()
                  .map((a, idx) => (
                    <li key={idx} className={a.correct ? "ok" : "nope"}>
                      <span className="code">{a.value}</span>
                      <span className="dot" />
                      <span className="result">
                        {a.correct ? "Correct" : "Wrong"}
                      </span>
                      <time>
                        {new Date(a.ts).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                        .
                        {String(new Date(a.ts).getMilliseconds()).padStart(
                          3,
                          "0"
                        )}
                      </time>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <Toasts />
    </div>
  );
}
