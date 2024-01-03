import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import { useState } from 'react';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import EditTask from './pages/EditTask';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return <Navigate to="/home"/>
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    return <Navigate to="/login"/>
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to={'/home'} /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={'/home'} /> : <Login onLogin={handleLogin}/>}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={'/home'} /> : <SignUp />}
        />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={user ? <EditTask /> : <Navigate to="/login" />}
          />
      </Routes>
    </Router>
  );
}

export default App;
