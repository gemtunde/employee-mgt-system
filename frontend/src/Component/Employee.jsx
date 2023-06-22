import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [data, setData] = useState([]);
  // const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployee")
      .then((res) => setData(res.data.Result))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          //window.location.reload("true")
          const d = data.filter((x) => x.id !== id);
          setData(d);
        } else {
          alert("error");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center">
        <h3>Employess List</h3>
      </div>
      <Link to="/create" className="btn btn-success">
        Add Employee
      </Link>
      {/* <div className="text-danger"> {error && error}</div> */}
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>
                    {
                      <img
                        src={`http://localhost:8081/images/${employee.image}`}
                        alt=""
                        className="employee_image"
                      />
                    }
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link
                      to={`/employeeEdit/${employee.id}`}
                      className="btn btn-warning mx-1"
                    >
                      edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="btn btn-danger mx-1"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
