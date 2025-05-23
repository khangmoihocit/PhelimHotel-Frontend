import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRoom from './components/room/AddRoom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AddRoom />
  )
}

export default App
