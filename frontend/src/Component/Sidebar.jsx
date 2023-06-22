import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate("");

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <Link
          to="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Admin Dashboard</span>
        </Link>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <Link to="/" className="nav-link align-middle px-0 text-white">
              <i className="fs-4 bi-house"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/employee"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle text-white"
            >
              <i className="fs-4 bi-speedometer2"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Employees</span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="nav-link px-0 align-middle text-white"
            >
              <i className="fs-4 bi-table"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/setting"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle text-white "
            >
              <i className="fs-4 bi-bootstrap"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle text-white"
            >
              <i className="fs-4 bi-grid"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Inventory</span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="nav-link px-0 align-middle text-white"
              onClick={handleLogout}
            >
              <i className="fs-4 bi-people"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Logout</span>{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
