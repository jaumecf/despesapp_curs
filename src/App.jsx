import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inici from './pages/inici/Inici';
import Login from './pages/login/Login';
import Navbar from './components/navbar/Navbar';
import DespesesDetall from './components/despesesDetall/DespesesDetall';
import Register from './pages/register/Register';
import AuthProvider from './context/authProvider';
import ProtectedRoute from './context/protectedRoute';


function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
            <Routes>
              <Route path='/' element={<ProtectedRoute><Inici /></ProtectedRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/despesa/:id' element={<DespesesDetall />} />
            </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
