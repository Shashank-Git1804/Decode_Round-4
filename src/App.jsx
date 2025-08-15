import { useState } from 'react'
import TeamCodeGame from './components/TeamCodeGame.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TeamCodeGame/>
    </>
  )
}

export default App
