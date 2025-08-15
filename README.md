
    # 🕹️ DecodeX – TeamCodeGame (Round 4)</h1>
    
    <h2>📜 Overview</h2>
    <p>
      DecodeX is a multi-round competitive coding and puzzle-solving game designed to challenge participants across different skill sets.
      This repository contains the Round 4 implementation — the <strong>TeamCodeGame</strong> — where teams must enter their final 4-digit code to complete the game.
    </p>
    <ul>
      <li>Prevent teams from tampering with other teams’ code entries</li>
      <li>Keep a secure and private attempt log</li>
      <li>Allow only verified teams to enter their codes</li>
      <li>Limit the number of attempts (maximum 5)</li>
      <li>Store all attempts locally for persistence</li>
      <li>Indicate teams that have already completed the challenge</li>
    </ul>

    <h2>🏆 Competition Structure</h2>
    <ol>
      <li>
        <strong>Round 1 — Debugging Python</strong><br/>
        Players debug broken Python code to get a specific output.
      </li>
      <li>
        <strong>Round 2 — Binary to Digits</strong><br/>
        Convert binary output from Round 1 to decimal digits.
      </li>
      <li>
        <strong>Round 3 — Logic Puzzle</strong><br/>
        Solve a puzzle using Round 2 result to get the final clue.
      </li>
      <li>
        <strong>Round 4 — TeamCodeGame</strong><br/>
        Combine all results into a 4-digit code, verify team ID, and enter it.
      </li>
    </ol>

    <h2>🔐 Security Features in Round 4</h2>
    <ul>
      <li><strong>Team Verification:</strong> Unique secret ID required before entering code.</li>
      <li><strong>Private Attempt Logs:</strong> Only your team’s history is visible.</li>
      <li><strong>Persistence:</strong> Attempts stored in <code>localStorage</code>.</li>
      <li><strong>Solved Team Lock:</strong> Solved teams marked 🏆 and blocked from submitting.</li>
      <li><strong>Attempt Limit:</strong> Max 5 tries, after which team is locked out.</li>
    </ul>

    <h2>🖥️ Tech Stack</h2>
    <ul>
      <li>React.js (Frontend)</li>
      <li>Vite (Build tool)</li>
      <li>CSS (Custom styles in <code>TeameCodeGameStyle.css</code>)</li>
      <li>localStorage (Persistence)</li>
    </ul>

    <h2>📂 Project Structure</h2>
    <pre>
DecodeX/
├── src/
│   ├── components/
│   │   └── TeamCodeGame.jsx
│   ├── style/
│   │   └── TeameCodeGameStyle.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
    </pre>

    <h2>⚙️ Setup & Installation</h2>
    <pre>
# 1️⃣ Clone the repo
git clone https://github.com/your-username/DecodeX.git
cd DecodeX

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run in development
npm run dev

# 4️⃣ Build for production
npm run build
    </pre>

    <h2>🎯 How to Play Round 4</h2>
    <ol>
      <li>Select your team from the dropdown.</li>
      <li>Enter your secret Team ID.</li>
      <li>Enter the 4-digit code (after verification).</li>
      <li>Submit and check result.</li>
    </ol>
    <p><strong>Win Condition:</strong> Correct code → 🏆 next to your name.</p>

    <h2>🛠 Clearing Local Storage (Admin Only)</h2>
    <pre>
localStorage.removeItem("teamCodeGameAttempts");
    </pre>

    <h2>📸 UI Features</h2>
    <ul>
      <li>Responsive design</li>
      <li>Toast notifications</li>
      <li>Status badges for teams</li>
      <li>Logs with exact timestamps</li>
    </ul>

    <h2>📌 Example Scenario</h2>
    <p>
      Team Alpha enters ALP01, tries <code>4321</code> → wrong (Attempts left: 4).  
      On third try, enters <code>1234</code> → correct 🏆.  
      They can still view logs but cannot submit again.
    </p>

    <h2>📄 License</h2>
    <p>
      MIT License — free to use with attribution.
    </p>
</body>
</html>
