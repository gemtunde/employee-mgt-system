import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [sumSalary, setSumSalary] = useState();

  useEffect(() => {
    // fetch adminCount
    axios
      .get("http://localhost:8081/adminCount")
      .then((res) => {
        // console.log(res.data[0].adminCount);
        setAdminCount(res.data[0].adminCount);
      })
      .catch((err) => console.log(err));

    // call employeeCount
    axios
      .get("http://localhost:8081/employeeCount")
      .then((res) => {
        // console.log(res.data[0].adminCount);
        setEmployeeCount(res.data[0].employeeCount);
      })
      .catch((err) => console.log(err));

    // call sum of all salary in employee table
    axios
      .get("http://localhost:8081/employeeSalary")
      .then((res) => {
        // console.log(res.data[0].adminCount);
        setSumSalary(res.data[0].sumSalary);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="d-flex justify-content-around mt-5 p-2">
        <div className="px-2 pt-2 pb-3 w-25 border shadow-sm ">
          <div className="text-center pb-1">
            <p>Admin</p>
            <hr />
            <p>Total : {adminCount} </p>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 w-25 border shadow-sm ">
          <div className="text-center pb-1">
            <p>Employee</p>
            <hr />
            <p>Total : {employeeCount} </p>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 w-25 border shadow-sm ">
          <div className="text-center pb-1">
            <p>Salary</p>
            <hr />
            <p>Total : N{sumSalary}.00 </p>
          </div>
        </div>
      </div>

      {/* List of Admins */}
      <div className="px-5 mt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
