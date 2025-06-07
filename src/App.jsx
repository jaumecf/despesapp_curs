import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inici from './pages/Inici';
import Login from './pages/Login';
import Navbar from './components/navbar/Navbar';
import DespesesDetall from './components/despesesDetall/DespesesDetall';
import Register from './pages/Register';
import AuthProvider from './context/authProvider';
import ProtectedRoute from './context/protectedRoute';
import ProjectPage from './pages/ProjectPage';
import HomePage from './pages/HomePage';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';



function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
            <Routes>
              <Route path='/' element={<Inici />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/projects" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/newproject" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
              <Route path='/project/:id' element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
              <Route path='/edit-project/:id' element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
              <Route path='/despesa/:id' element={<ProtectedRoute><DespesesDetall /></ProtectedRoute>} />
              <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
