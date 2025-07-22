import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UpdatePage from './pages/UpdatePage.jsx';
import ManagersPage from './pages/ManagersPage.jsx';

function App() {
    const [employees, setEmployees] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage employees={employees} />} />
                <Route path="/register" element={<RegisterPage employees={employees} setEmployees={setEmployees} />} />
                <Route path="/update/:id" element={<UpdatePage employees={employees} setEmployees={setEmployees} />} />
                <Route path="/managers" element={<ManagersPage employees={employees} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
