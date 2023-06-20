import Sidebar from "./Sidebar";
import Mainbar from "./Mainbar";

const Dashboard = () => {
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
