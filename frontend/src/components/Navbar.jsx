import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, MessageCircle, LogOut, User, Menu, X } from "lucide-react";
import Chatbot from "./Chatbot.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(false);
  const [dark, setDark] = useState(
    localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const links = [
    ["Home", "/"],
    ["Features", "/features"],
    ["Pricing", "/price"],
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-slate-900 dark:text-white"
          >
            Stride <span className="text-indigo-600"> AI</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4">
            {links.map(([name, path]) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md font-medium text-sm ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
                  } transition`
                }
              >
                {name}
              </NavLink>
            ))}

            <Link
              to="/builder"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
            >
              Build Resume
            </Link>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setChat(!chat)}
              className="flex items-center gap-1 px-3 py-1 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">Chat</span>
            </button>

            {token ? (
              <button
                onClick={logout}
                className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900 transition"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-1 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
              >
                <User size={16} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 bg-white dark:bg-slate-950 border-t dark:border-slate-800 flex flex-col gap-3 pt-4">
            {links.map(([name, path]) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {name}
              </NavLink>
            ))}

            <Link
              to="/builder"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-center hover:bg-indigo-500 transition"
            >
              Build Resume
            </Link>

            <button
              onClick={() => setDark(!dark)}
              className="flex items-center justify-center gap-2 px-4 py-2 border rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={() => setChat(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
            >
              <MessageCircle size={16} />
              Chat
            </button>

            {token ? (
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
              >
                <User size={16} />
                Login
              </Link>
            )}
          </div>
        )}
      </header>

      <Chatbot isOpen={chat} onClose={() => setChat(false)} />
    </>
  );
}
