import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProjectPage from "./pages/ProjectPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App