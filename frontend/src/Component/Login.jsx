import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //console.log(values);
      const res = await axios.post("", values);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 loginForm">
        <h2>Login</h2>
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
          <button
            type="submit"
            className="btn btn-default border w-100 bg-light text-decoration-none rounded-0"
          >
            create account{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
