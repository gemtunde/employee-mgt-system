import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="d-flex justify-content-center p-3 align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 loginForm">
        <h2>Login As</h2>

        <div className="d-flex mt-3 p-2 justify-content-around">
          <Link to="/login" className="btn btn-success w-40 rounded-0">
            {" "}
            Admin
          </Link>
          <Link to="/employee-login" className="btn btn-primary w-40 rounded-0">
            Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
