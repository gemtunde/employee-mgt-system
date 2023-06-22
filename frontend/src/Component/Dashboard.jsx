import Sidebar from "./Sidebar";
import Mainbar from "./Mainbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8081/dashboard").then((res) => {
      if (res.data.Status === "Success") {
        if (res.data.role === "admin") {
          navigate("/");
        } else {
          const id = res.data.id;
          navigate(`/employee-detail/${id}`);
        }
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <Mainbar />
      </div>
    </div>
  );
};

export default Dashboard;
