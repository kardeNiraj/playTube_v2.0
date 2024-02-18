import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VideoContent from './pages/VideoContent'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/video/:id' element={<VideoContent />} />
      </Route>
    </Routes>
  )
}

export default App
