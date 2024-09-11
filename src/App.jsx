import './App.css'
import Listagem from './Components/Listagem'
import Cadastro from './Components/Cadastro'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



function App(){

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Listagem  />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    </Router>
  
    </div>

  )
}




export default App
