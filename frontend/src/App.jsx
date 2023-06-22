import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import Employee from "./Component/Employee";
import Profile from "./Component/Profile";
import Home from "./Component/Home";
import AddEmployee from "./Component/AddEmployee";
import EditEmployee from "./Component/EditEmployee";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
