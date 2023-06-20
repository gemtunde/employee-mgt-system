import { Outlet } from "react-router-dom";

const Mainbar = () => {
  return (
    <div className="col p-0 m-0">
      <div className="p-2 d-flex justify-content-center border shadow">
        <h4>Employee Management System</h4>
      </div>
      <Outlet />
    </div>
  );
};

export default Mainbar;
