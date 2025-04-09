import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`position-absolute top-50 start-50 translate-middle ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      } w-100`}
      style={{
        maxWidth: "400px",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Login</h2>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={toggleTheme}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="e.g. yashraj@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="e.g. ********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Login
        </button>

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/signup" className="fw-bold text-decoration-none">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
