import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/Input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='main'>
      <p className='heading'>Fyn Mobility Assignment</p>
      <Input />
    </main>
  )
}

export default App
