import React, { useMemo, useState, useEffect } from "react";
import "../style/TeameCodeGameStyle.css";

const TEAMS = [
  { id: "ALP01", name: "Team Alpha", code: "1234" },
  { id: "BRV02", name: "Team Bravo", code: "7890" },
  { id: "CHL03", name: "Team Charlie", code: "2468" },
  { id: "DLT04", name: "Team Delta", code: "1357" },
  { id: "ECO05", name: "Team Echo", code: "4321" },
  { id: "FST06", name: "Team Foxtrot", code: "8765" },
  { id: "GLF07", name: "Team Golf", code: "1122" },
  { id: "HTR08", name: "Team Hotel", code: "2211" },
  { id: "IND09", name: "Team India", code: "5566" },
  { id: "JUL10", name: "Team Juliet", code: "6655" },
  { id: "KIL11", name: "Team Kilo", code: "7788" },
  { id: "LIM12", name: "Team Lima", code: "8877" },
  { id: "MIC13", name: "Team Mike", code: "9900" },
  { id: "NOV14", name: "Team November", code: "0099" },
  { id: "OSC15", name: "Team Oscar", code: "3141" },
  { id: "PAP16", name: "Team Papa", code: "1413" },
  { id: "QUE17", name: "Team Quebec", code: "2718" },
  { id: "ROM18", name: "Team Romeo", code: "1827" },
  { id: "SIE19", name: "Team Sierra", code: "1230" },
  { id: "TAN20", name: "Team Tango", code: "3210" },
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
