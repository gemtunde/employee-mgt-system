import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import Employee from "./Component/Employee";
import Profile from "./Component/Profile";
import Home from "./Component/Home";
import AddEmployee from "./Component/AddEmployee";
import EditEmployee from "./Component/EditEmployee";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Component/Landing/LandingPage";
import EmployeeDetail from "./Component/Employee/EmployeeDetail";
import EmployeeLogin from "./Component/Employee/EmployeeLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<AddEmployee />} />
          <Route path="/employeeEdit/:id" element={<EditEmployee />} />
        </Route>
        <Route path="/login" element={<Login />}>
          {" "}
        </Route>
        <Route path="/landing-page" element={<LandingPage />}>
          {" "}
        </Route>
        <Route path="/employee-detail/:id" element={<EmployeeDetail />}>
          {" "}
        </Route>
        <Route path="/employee-login" element={<EmployeeLogin />}>
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
