import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //console.log(values);
      const res = await axios.post("http://localhost:8081/login", values);
      //console.log(res.data);
      if (res.data.Status === "Success") {
        navigate("/");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 loginForm">
        <div className="text-danger">
          <h2>{error && error}</h2>
        </div>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="enter email"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Email</strong>
            </label>
            <input
              type="password"
              placeholder="enter password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Login
          </button>
          <p>You agree to out terms and conditions</p>
          <Link
            to="/landing-page"
            className="btn btn-danger w-100 text-decoration-none rounded-0"
          >
            Employee Login{" "}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
