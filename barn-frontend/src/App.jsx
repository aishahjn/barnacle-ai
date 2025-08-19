import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Statistics, Model, About } from './pages'
import NavBar from './components/shared/NavBar';

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/model' element={<Model />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
