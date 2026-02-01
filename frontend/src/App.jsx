import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import Price from "./pages/Price.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Login from "./pages/Login.jsx";
import Register from "./components/Register.jsx";
import Resume from "./pages/Resume.jsx";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/price" element={<Price />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/builder" element={<Resume />} />
      </Routes>
    </div>
  );
}

export default App;
