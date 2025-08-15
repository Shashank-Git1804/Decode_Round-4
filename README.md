DecodeX – TeamCodeGame (Round 4)
📜 Overview

DecodeX is a multi-round competitive coding and puzzle-solving game designed to challenge participants across different skill sets.
This repository contains the Round 4 implementation — the TeamCodeGame — where teams must enter their final 4-digit code to complete the game.

The game is designed to:

Prevent teams from tampering with other teams’ code entries

Keep a secure and private attempt log

Allow only verified teams to enter their codes

Limit the number of attempts (maximum 5)

Store all attempts locally for persistence

Indicate teams that have already completed the challenge

🏆 Competition Structure

The competition has 4 rounds:

Round 1 — Debugging Python

Players are given broken Python code.

They must debug it to get a specific output.

Round 2 — Binary to Digits

Using the output from Round 1, players receive a binary code.

They must convert it to decimal digits.

Round 3 — Logic Puzzle

Using the result from Round 2, players must solve a logical puzzle provided to them.

This yields a key element for the final round.

Round 4 — TeamCodeGame (This Repo)

Teams combine all results from previous rounds to get a final 4-digit code.

They have 5 attempts to enter it correctly.

Teams must verify their identity with a secret team ID before entering the code.

Correctly solving the round marks the team as 🏆 completed.

🔐 Security Features in Round 4

Team Verification

Each team has a unique secret ID.

Without entering the correct ID, the team cannot enter the 4-digit code.

Private Attempt Logs

Only verified teams can see their own attempt history.

Teams cannot view other teams’ logs.

Persistence with Local Storage

Every attempt (correct or wrong) is stored in localStorage.

Even after refreshing, attempts remain recorded.

Solved Team Lock

Teams that have already solved the challenge cannot enter another code.

Their dropdown option shows a 🏆 emoji.

Attempt Limit

Each team gets 5 attempts.

Wrong attempts decrement the counter.

At 0 attempts, the team can no longer enter codes.

🖥️ Tech Stack

React.js (Frontend)

Vite (Build tool & dev server)

CSS (Custom styles in TeameCodeGameStyle.css)

localStorage (Persistent attempt tracking)

📂 Project Structure
DecodeX/
│
├── src/
│   ├── components/
│   │   └── TeamCodeGame.jsx   # Main game logic
│   ├── style/
│   │   └── TeameCodeGameStyle.css # Styles for the game
│   ├── App.jsx
│   └── main.jsx
│
├── public/                    # Public assets (logos, etc.)
│
├── package.json
└── README.md

⚙️ Setup & Installation
1️⃣ Clone the repo
git clone https://github.com/your-username/DecodeX.git
cd DecodeX

2️⃣ Install dependencies
npm install

3️⃣ Run in development mode
npm run dev


Then open the shown localhost URL in your browser.

4️⃣ Build for production
npm run build

🎯 How to Play Round 4

Select Your Team from the dropdown.

Enter Your Secret Team ID to verify.

Example: ALP01 for Team Alpha.

Enter the 4-digit code (only after verification).

Submit — The system will:

Check if your code matches your team’s final code.

Record the attempt with timestamp (HH:MM:SS:ms).

Update your remaining attempts.

Win Condition:

Correct code → 🏆 appears next to your team name.

Restrictions:

Solved teams can be selected for viewing logs but cannot enter codes.

Attempts are stored permanently in localStorage unless manually cleared.

🛠 Clearing Local Storage (Admin Only)

If you need to reset attempts for testing:

Open browser console (F12 → Console).

Run:

localStorage.removeItem("teamCodeGameAttempts");


Refresh the page.

📸 UI Features

Responsive design for all screen sizes

Toast notifications for feedback (success, error, warning)

Dynamic status badges (Solved 🏆 / Pending)

Private log view showing:

Attempted code

Result (Correct / Wrong)

Exact time (HH:MM:SS.ms)

📌 Example Scenario

Team Alpha selects their name from the dropdown.

They enter ALP01 as secret ID.

They try entering 4321 — wrong → Attempts left: 4.

On the third try, they enter 1234 — correct → 🏆 appears.

They can still view their logs but can’t enter new codes.

🔮 Future Enhancements

Server-based attempt logging (instead of localStorage)

Real-time leaderboard

Admin dashboard for attempt monitoring

Team login authentication

📄 License

This project is licensed under the MIT License — free to use and modify with attribution.
