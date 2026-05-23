import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ToDo from './ToDo/ToDo.js';
import Register from "./Auth/register.js";
import Login from "./Auth/login.js";
import ProtectedRoute from "./middleware/protectedRoute.js"

function App() {
  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/todos" element={
                  <ProtectedRoute>
                    <ToDo />
                  </ProtectedRoute>
                  } />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}


export default App;

